from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, Field
from typing import Optional
import httpx
import logging
from .database import engine, engineering_engine, Base, get_db
from .models import Lead
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .routers import router as leads_router
from .artigos_router import router as artigos_router
from .analise_planta_router import router as analise_planta_router

logger = logging.getLogger(__name__)

N8N_WEBHOOK = "https://n8n.lsfbuilderpro.com/webhook/gerar-estudo"
N8N_WHATSAPP_WEBHOOK = "https://n8n.lsfbuilderpro.com/webhook/whatsapp-lead"

# Create tables on startup — if DB unavailable, app still starts
@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
            # Add columns that create_all won't add to existing tables
            migrations = [
                "ALTER TABLE artigos ADD COLUMN IF NOT EXISTS imagem_alt_text VARCHAR(255)",
            ]
            for stmt in migrations:
                try:
                    await conn.execute(text(stmt))
                except Exception:
                    pass
        print("✅ Database connected and tables created.")
    except Exception as e:
        print(f"⚠️ Database not available on startup: {e}")
        print("   Tables will be created on first successful request.")
    yield

app = FastAPI(
    title="LSF Intelligence API",
    description="Backend API for Casas LSF Portal and Intelligence System",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "https://casaslsf.com",
    "https://n8n.lsfbuilderpro.com",
    "https://casas-lsf-frontend.dy3pb5.easypanel.host"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leads_router)
app.include_router(artigos_router)
app.include_router(analise_planta_router)

@app.get("/")
async def root():
    return {
        "message": "LSF Intelligence API is running",
        "status": "active",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.get("/api/portfolio/{projeto_id}")
async def portfolio_public(projeto_id: int):
    """Public portfolio endpoint. Returns whitelist only — no PII exposed.

    Used by /portfolio/[slug] pages on the frontend.
    """
    from fastapi.responses import JSONResponse
    from .database import engineering_engine
    if not engineering_engine:
        raise HTTPException(503, "Engineering DB unavailable")
    try:
        async with engineering_engine.connect() as conn:
            row = (
                await conn.execute(
                    text(
                        """
                        SELECT
                            p.id AS projeto_id,
                            p.tipologia,
                            p.area_m2,
                            p.num_pisos,
                            p.tem_cave,
                            p.tem_sotao,
                            (SELECT pg.google_drive_file_id
                               FROM plantas_geradas pg
                              WHERE pg.projeto_id = p.id
                                AND pg.google_drive_file_id IS NOT NULL
                              ORDER BY pg.versao DESC, pg.created_at DESC
                              LIMIT 1) AS drive_file_id,
                            (SELECT MAX(o.valor_total)
                               FROM orcamentos o
                              WHERE o.projeto_id = p.id) AS valor_total,
                            (SELECT o.padrao_acabamento
                               FROM orcamentos o
                              WHERE o.projeto_id = p.id
                              ORDER BY o.valor_total DESC
                              LIMIT 1) AS padrao_acabamento
                        FROM projetos p
                        WHERE p.id = :pid
                          AND p.ativo = true
                          AND p.deleted_at IS NULL
                        """
                    ),
                    {"pid": projeto_id},
                )
            ).fetchone()

            if not row:
                raise HTTPException(404, "Projeto not found")

            d = dict(row._mapping)
            if d.get("drive_file_id"):
                d["drive_url"] = f"https://lh3.googleusercontent.com/d/{d['drive_file_id']}"
            else:
                d["drive_url"] = None

            # Coerce types for JSON
            if d.get("area_m2") is not None:
                d["area_m2"] = float(d["area_m2"])
            if d.get("valor_total") is not None:
                d["valor_total"] = float(d["valor_total"])

            return JSONResponse(
                content=d,
                headers={
                    "Cache-Control": "public, max-age=3600, s-maxage=86400",
                },
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, f"Internal error: {str(e)[:120]}")


@app.get("/api/debug-planta-details/{projeto_id}")
async def debug_planta_details(projeto_id: int):
    """Get full details of a project's plant (prompt, drive link) for manual review."""
    from .database import engineering_engine
    if not engineering_engine:
        return {"error": "No engineering engine"}
    try:
        async with engineering_engine.connect() as conn:
            result = await conn.execute(text("""
                SELECT
                    pg.id AS planta_id,
                    pg.versao,
                    pg.prompt_original,
                    pg.prompt_atual,
                    pg.google_drive_link,
                    pg.google_drive_file_id,
                    pg.created_at,
                    o.valor_total,
                    o.area_construcao,
                    o.padrao_acabamento,
                    o.titulo_projeto,
                    o.descricao_projeto
                FROM plantas_geradas pg
                LEFT JOIN orcamentos o ON o.projeto_id = pg.projeto_id
                WHERE pg.projeto_id = :pid
                  AND pg.google_drive_link IS NOT NULL
                ORDER BY pg.versao DESC, pg.created_at DESC
                LIMIT 5
            """), {"pid": projeto_id})
            rows = result.fetchall()
            items = []
            for r in rows:
                d = dict(r._mapping)
                for k, v in d.items():
                    if hasattr(v, "isoformat"):
                        d[k] = v.isoformat()
                    elif not isinstance(v, (str, int, float, bool, type(None))):
                        d[k] = str(v)
                items.append(d)
            return {"projeto_id": projeto_id, "plantas": items}
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/debug-top-plantas")
async def debug_top_plantas():
    """Show top projects with budget — candidates for public portfolio."""
    from .database import engineering_engine
    if not engineering_engine:
        return {"error": "No engineering engine"}
    try:
        async with engineering_engine.connect() as conn:
            # Projects that have at least 1 orçamento AND at least 1 planta gerada
            result = await conn.execute(text("""
                SELECT
                    p.id AS projeto_id,
                    p.tipologia,
                    p.area_m2,
                    p.num_pisos,
                    p.tem_cave,
                    p.tem_sotao,
                    p.nome_projeto,
                    p.created_at,
                    (SELECT COUNT(*) FROM plantas_geradas pg WHERE pg.projeto_id = p.id) AS num_plantas,
                    (SELECT MAX(versao) FROM plantas_geradas pg WHERE pg.projeto_id = p.id) AS max_versao_planta,
                    (SELECT COUNT(*) FROM plantas_geradas pg WHERE pg.projeto_id = p.id AND pg.google_drive_link IS NOT NULL) AS plantas_drive,
                    (SELECT COUNT(*) FROM orcamentos o WHERE o.projeto_id = p.id) AS num_orcamentos,
                    (SELECT MAX(valor_total) FROM orcamentos o WHERE o.projeto_id = p.id) AS max_valor_orcamento,
                    (SELECT MAX(padrao_acabamento) FROM orcamentos o WHERE o.projeto_id = p.id) AS padrao_acabamento
                FROM projetos p
                WHERE p.ativo = true
                  AND p.deleted_at IS NULL
                  AND p.tipo_obra = 'moradia'
                  AND p.tipologia IS NOT NULL
                  AND EXISTS (SELECT 1 FROM orcamentos o WHERE o.projeto_id = p.id)
                  AND EXISTS (SELECT 1 FROM plantas_geradas pg WHERE pg.projeto_id = p.id AND pg.google_drive_link IS NOT NULL)
                ORDER BY p.updated_at DESC NULLS LAST
                LIMIT 30
            """))
            rows = result.fetchall()
            items = []
            for r in rows:
                d = dict(r._mapping)
                for k, v in d.items():
                    if hasattr(v, "isoformat"):
                        d[k] = v.isoformat()
                    elif not isinstance(v, (str, int, float, bool, type(None))):
                        d[k] = str(v)
                items.append(d)
            return {"total": len(items), "items": items}
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/debug-schema/{table_name}")
async def debug_schema(table_name: str):
    """Return columns + sample row from a table in the engineering DB."""
    from .database import engineering_engine
    if not engineering_engine:
        return {"error": "No engineering engine"}
    allowed = {"projetos", "plantas_geradas", "orcamentos", "galeria_obras", "briefings_arquitetonicos"}
    if table_name not in allowed:
        return {"error": f"Table {table_name} not allowed"}
    try:
        async with engineering_engine.connect() as conn:
            cols = await conn.execute(text(
                "SELECT column_name, data_type FROM information_schema.columns "
                "WHERE table_name = :t ORDER BY ordinal_position"
            ), {"t": table_name})
            columns = [{"name": r[0], "type": r[1]} for r in cols.fetchall()]

            count = await conn.execute(text(f"SELECT COUNT(*) FROM {table_name}"))
            total = count.scalar()

            sample = await conn.execute(text(f"SELECT * FROM {table_name} LIMIT 1"))
            row = sample.fetchone()
            sample_data = dict(row._mapping) if row else None
            if sample_data:
                for k, v in sample_data.items():
                    if hasattr(v, "isoformat"):
                        sample_data[k] = v.isoformat()
                    elif not isinstance(v, (str, int, float, bool, type(None), list, dict)):
                        sample_data[k] = str(v)[:200]
        return {"table": table_name, "total_rows": total, "columns": columns, "sample": sample_data}
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/debug-db")
async def debug_db():
    """Diagnostic endpoint to check engineering DB connection."""
    import os
    from .database import ENGINEERING_DB_URL, engineering_engine

    env_raw = os.getenv("ENGINEERING_DB_URL", "<NOT SET>")
    info = {
        "env_var_set": env_raw != "<NOT SET>" and env_raw != "",
        "env_var_length": len(env_raw) if env_raw else 0,
        "engine_created": engineering_engine is not None,
    }

    if engineering_engine:
        try:
            async with engineering_engine.connect() as conn:
                await conn.execute(text("SELECT 1"))
                info["connection"] = "OK"
                # List tables
                tables = await conn.execute(text(
                    "SELECT table_name FROM information_schema.tables "
                    "WHERE table_schema = 'public' LIMIT 30"
                ))
                info["tables"] = [r[0] for r in tables.fetchall()]
                # List all databases on this server
                dbs = await conn.execute(text(
                    "SELECT datname FROM pg_database WHERE datistemplate = false"
                ))
                info["databases"] = [r[0] for r in dbs.fetchall()]
        except Exception as e:
            info["connection"] = f"FAILED: {e}"
    else:
        info["connection"] = "No engine (env var missing or empty)"

    return info


@app.get("/api/metricas")
async def get_metricas(db: AsyncSession = Depends(get_db)):
    """Return real-time metrics from database for the dashboard."""

    # Queries for the main casas_lsf database
    local_queries = {
        "total_leads": "SELECT COUNT(*) FROM leads",
        "artigos": "SELECT COUNT(*) FROM artigos",
        "artigos_publicados": "SELECT COUNT(*) FROM artigos WHERE status = 'publicado'",
        "categorias": "SELECT COUNT(DISTINCT categoria) FROM artigos WHERE categoria IS NOT NULL",
        "artigos_com_imagem": "SELECT COUNT(*) FROM artigos WHERE imagem_destaque_url LIKE '%media.casaslsf.com%'",
    }
    result = {}
    for key, sql in local_queries.items():
        try:
            row = await db.execute(text(sql))
            result[key] = row.scalar() or 0
        except Exception:
            await db.rollback()
            result[key] = 0

    # Queries for the engineering database (postgres on n8n-evo server)
    eng_queries = {
        "eng_leads": "SELECT COUNT(*) FROM leads",
        "plantas_geradas": "SELECT COUNT(*) FROM plantas_geradas",
        "terrenos": "SELECT COUNT(*) FROM terrenos",
        "terrenos_projeto_aprovado": "SELECT COUNT(*) FROM terrenos_projeto_aprovado",
        "orcamentos": "SELECT COUNT(*) FROM orcamentos",
        "composicoes": "SELECT COUNT(*) FROM composicoes",
        "composicao_itens": "SELECT COUNT(*) FROM composicao_itens",
        "precos_materiais": "SELECT COUNT(*) FROM precos_materiais",
    }
    if engineering_engine:
        async with engineering_engine.connect() as conn:
            for key, sql in eng_queries.items():
                try:
                    row = await conn.execute(text(sql))
                    result[key] = row.scalar() or 0
                except Exception:
                    result[key] = 0
    else:
        for key in eng_queries:
            result[key] = 0

    return {
        "total_leads": result.get("eng_leads", 0) or result["total_leads"],
        "plantas_geradas": result["plantas_geradas"],
        "terrenos": result["terrenos"] + result["terrenos_projeto_aprovado"],
        "orcamentos_gerados": result["orcamentos"],
        "composicoes_tecnicas": (
            result["composicoes"]
            + result["composicao_itens"]
            + result["precos_materiais"]
        ),
        "projetos_analise": result["terrenos_projeto_aprovado"],
        "artigos": result["artigos"],
        "artigos_publicados": result["artigos_publicados"],
        "categorias": result["categorias"],
        "artigos_com_imagem": result["artigos_com_imagem"],
    }


@app.post("/api/migrate-seo")
async def migrate_seo_fields():
    """One-time migration to add SEO columns to artigos table."""
    statements = [
        "ALTER TABLE artigos ADD COLUMN IF NOT EXISTS faq_json JSONB",
        "ALTER TABLE artigos ADD COLUMN IF NOT EXISTS search_intent VARCHAR(20)",
        "ALTER TABLE artigos ADD COLUMN IF NOT EXISTS internal_links_json JSONB",
        "ALTER TABLE artigos ADD COLUMN IF NOT EXISTS pillar_slug VARCHAR(255)",
        "ALTER TABLE artigos ADD COLUMN IF NOT EXISTS read_time_minutes INTEGER",
        "ALTER TABLE artigos ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ",
    ]
    results = []
    async with engine.begin() as conn:
        for stmt in statements:
            try:
                await conn.execute(text(stmt))
                results.append({"sql": stmt, "status": "ok"})
            except Exception as e:
                results.append({"sql": stmt, "status": f"error: {e}"})
    return {"message": "Migration completed", "results": results}


# === Gerar Estudo Técnico (N8N Integration) ===

class GerarEstudoRequest(BaseModel):
    tipologia: str = Field(..., min_length=1, max_length=10)
    area: int = Field(..., ge=40, le=1000)
    pisos: int = Field(..., ge=1, le=5)
    localizacao: str = Field(..., min_length=2, max_length=100)
    estilo: Optional[str] = Field(None, max_length=50)
    email: Optional[str] = Field(None, max_length=200)
    telefone: str = Field(..., min_length=9, max_length=20)
    nome: Optional[str] = Field(None, max_length=100)


class GerarEstudoResponse(BaseModel):
    status: str
    pdf: Optional[str] = None
    resumo: Optional[str] = None
    prazo: Optional[str] = None
    message: Optional[str] = None


@app.post("/api/gerar-estudo", response_model=GerarEstudoResponse)
async def gerar_estudo(dados: GerarEstudoRequest, db: AsyncSession = Depends(get_db)):
    """Receive study request, save lead, forward to N8N, return result."""

    # 1. Save lead in DB
    lead = Lead(
        nome=dados.nome or "Estudo Técnico",
        telefone=dados.telefone,
        email=dados.email,
        origem="blog_estudo",
        status="quente",
        interesse_tipo="estudo_tecnico",
        mensagem=f"Tipologia: {dados.tipologia}, Área: {dados.area}m², "
                 f"Pisos: {dados.pisos}, Local: {dados.localizacao}, "
                 f"Estilo: {dados.estilo or 'N/A'}",
        metadata_info={
            "tipologia": dados.tipologia,
            "area": dados.area,
            "pisos": dados.pisos,
            "localizacao": dados.localizacao,
            "estilo": dados.estilo,
        },
    )
    db.add(lead)
    await db.commit()
    await db.refresh(lead)

    # 2. Send to N8N webhook
    n8n_payload = {
        "tipologia": dados.tipologia,
        "area": dados.area,
        "pisos": dados.pisos,
        "localizacao": dados.localizacao,
        "estilo": dados.estilo,
        "email": dados.email,
        "telefone": dados.telefone,
        "nome": dados.nome,
        "origem": "blog_estudo",
        "lead_id": str(lead.id),
    }

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post(N8N_WEBHOOK, json=n8n_payload)

            if resp.status_code == 200:
                n8n_data = resp.json()

                # 3. If phone exists, trigger WhatsApp notification
                if dados.telefone:
                    try:
                        await client.post(N8N_WHATSAPP_WEBHOOK, json={
                            "telefone": dados.telefone,
                            "nome": dados.nome or "Cliente",
                            "tipo": "estudo_tecnico",
                            "lead_id": str(lead.id),
                        })
                    except Exception:
                        pass  # WhatsApp notification is best-effort

                return GerarEstudoResponse(
                    status="sucesso",
                    pdf=n8n_data.get("link_pdf"),
                    resumo=n8n_data.get("resumo_orcamento"),
                    prazo=n8n_data.get("prazo_execucao"),
                )
            else:
                logger.error(f"N8N returned {resp.status_code}: {resp.text[:200]}")
                # Still return success to user since lead was saved
                return GerarEstudoResponse(
                    status="sucesso",
                    message="O seu pedido foi recebido. Entraremos em contacto brevemente.",
                )

    except httpx.TimeoutException:
        logger.error("N8N webhook timeout (60s)")
        return GerarEstudoResponse(
            status="sucesso",
            message="O seu pedido foi recebido. O estudo está a ser processado.",
        )
    except Exception as e:
        logger.error(f"N8N webhook error: {e}")
        return GerarEstudoResponse(
            status="sucesso",
            message="O seu pedido foi recebido. Entraremos em contacto brevemente.",
        )
