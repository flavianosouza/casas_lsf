from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, Field
from typing import Optional
import httpx
import logging
from .database import engine, Base, get_db
from .models import Lead
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .routers import router as leads_router
from .artigos_router import router as artigos_router

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
