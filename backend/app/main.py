from fastapi import FastAPI
from sqlalchemy import text
from .database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .routers import router as leads_router
from .artigos_router import router as artigos_router

# Create tables on startup — if DB unavailable, app still starts
@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
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
