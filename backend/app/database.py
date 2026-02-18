from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
from dotenv import load_dotenv

load_dotenv()

# Database URL from environment or default to local
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql+asyncpg://postgres:your_password@localhost:5432/lsf_intelligence"
)

# asyncpg does not support 'sslmode' in the URL query string.
# Strip it and pass as connect_args instead.
parsed = urlparse(DATABASE_URL)
query_params = parse_qs(parsed.query)
ssl_mode = query_params.pop("sslmode", [None])[0]
clean_query = urlencode({k: v[0] for k, v in query_params.items()})
CLEAN_URL = urlunparse(parsed._replace(query=clean_query))

connect_args = {}
if ssl_mode == "disable":
    connect_args["ssl"] = False

# SQLAlchemy Async Engine
engine = create_async_engine(
    CLEAN_URL,
    echo=True,  # Set to False in production
    future=True,
    connect_args=connect_args
)

# Engineering DB (n8n-evo) — optional second database for metrics
ENGINEERING_DB_URL = os.getenv("ENGINEERING_DB_URL", "")


def _make_eng_engine():
    if not ENGINEERING_DB_URL:
        return None
    p = urlparse(ENGINEERING_DB_URL)
    qp = parse_qs(p.query)
    sm = qp.pop("sslmode", [None])[0]
    cq = urlencode({k: v[0] for k, v in qp.items()})
    url = urlunparse(p._replace(query=cq))
    ca = {}
    if sm == "disable":
        ca["ssl"] = False
    return create_async_engine(url, echo=False, future=True, connect_args=ca)


engineering_engine = _make_eng_engine()

# Session Factory
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

Base = declarative_base()

# Dependency for FastAPI routes
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
