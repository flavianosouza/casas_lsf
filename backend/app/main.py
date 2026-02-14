from fastapi import FastAPI
from .database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .routers import router as leads_router

# Dependency to create tables on startup (simplification for dev)
@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
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
