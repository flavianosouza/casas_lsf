from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func, desc
from datetime import datetime, timezone
from uuid import UUID
from .database import get_db
from .models import Artigo
from .schemas import (
    ArtigoCreate,
    ArtigoUpdate,
    ArtigoResponse,
    ArtigoListItem,
    ArtigosPaginados,
)

router = APIRouter(
    prefix="/api/artigos",
    tags=["artigos"],
)


@router.get("/", response_model=ArtigosPaginados)
async def listar_artigos(
    pagina: int = Query(1, ge=1),
    por_pagina: int = Query(12, ge=1, le=50),
    categoria: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
):
    """Lista artigos publicados com paginacao e filtro por categoria."""
    query = select(Artigo).where(Artigo.status == "publicado")

    if categoria:
        query = query.where(Artigo.categoria == categoria)

    # Total
    count_q = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(count_q)
    total = total_result.scalar() or 0

    # Paginacao
    query = query.order_by(desc(Artigo.published_at))
    query = query.offset((pagina - 1) * por_pagina).limit(por_pagina)
    result = await db.execute(query)
    artigos = result.scalars().all()

    return ArtigosPaginados(
        artigos=[ArtigoListItem.model_validate(a) for a in artigos],
        total=total,
        pagina=pagina,
        por_pagina=por_pagina,
    )


@router.get("/categorias")
async def listar_categorias(db: AsyncSession = Depends(get_db)):
    """Lista todas as categorias com artigos publicados."""
    result = await db.execute(
        select(Artigo.categoria, func.count(Artigo.id))
        .where(Artigo.status == "publicado")
        .where(Artigo.categoria.isnot(None))
        .group_by(Artigo.categoria)
        .order_by(Artigo.categoria)
    )
    return [{"categoria": row[0], "total": row[1]} for row in result.all()]


@router.get("/slugs")
async def listar_slugs(db: AsyncSession = Depends(get_db)):
    """Lista todos os slugs de artigos publicados (para sitemap)."""
    result = await db.execute(
        select(Artigo.slug, Artigo.published_at)
        .where(Artigo.status == "publicado")
        .order_by(desc(Artigo.published_at))
    )
    return [{"slug": row[0], "published_at": row[1]} for row in result.all()]


@router.get("/{slug}", response_model=ArtigoResponse)
async def obter_artigo(slug: str, db: AsyncSession = Depends(get_db)):
    """Obtem um artigo pelo slug."""
    result = await db.execute(
        select(Artigo).where(Artigo.slug == slug, Artigo.status == "publicado")
    )
    artigo = result.scalar_one_or_none()
    if not artigo:
        raise HTTPException(status_code=404, detail="Artigo nao encontrado")
    return artigo


@router.post("/", response_model=ArtigoResponse, status_code=201)
async def criar_artigo(artigo: ArtigoCreate, db: AsyncSession = Depends(get_db)):
    """Cria um novo artigo."""
    # Verificar slug unico
    existing = await db.execute(
        select(Artigo).where(Artigo.slug == artigo.slug)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Slug ja existe")

    db_artigo = Artigo(**artigo.model_dump())

    # Se status for publicado, definir published_at
    if artigo.status == "publicado":
        db_artigo.published_at = datetime.now(timezone.utc)

    db.add(db_artigo)
    await db.commit()
    await db.refresh(db_artigo)
    return db_artigo


@router.post("/seed")
async def seed_artigos(db: AsyncSession = Depends(get_db)):
    """Popula os artigos iniciais. Ignora duplicados por slug."""
    import importlib
    import sys
    import os

    # Import seed data
    seed_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "seed_artigos.py")
    spec = importlib.util.spec_from_file_location("seed_artigos", seed_path)
    seed_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(seed_module)

    inseridos = 0
    existentes = 0
    for artigo_data in seed_module.ARTIGOS:
        result = await db.execute(
            select(Artigo).where(Artigo.slug == artigo_data["slug"])
        )
        if result.scalar_one_or_none():
            existentes += 1
            continue

        artigo = Artigo(
            **artigo_data,
            status="publicado",
            published_at=datetime.now(timezone.utc),
        )
        db.add(artigo)
        inseridos += 1

    await db.commit()
    return {
        "message": f"Seed concluido: {inseridos} artigos inseridos, {existentes} ja existiam",
        "inseridos": inseridos,
        "existentes": existentes,
    }


@router.put("/{artigo_id}", response_model=ArtigoResponse)
async def actualizar_artigo(
    artigo_id: UUID,
    dados: ArtigoUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Actualiza um artigo existente."""
    result = await db.execute(select(Artigo).where(Artigo.id == artigo_id))
    artigo = result.scalar_one_or_none()
    if not artigo:
        raise HTTPException(status_code=404, detail="Artigo nao encontrado")

    update_data = dados.model_dump(exclude_unset=True)

    # Se esta a publicar agora, definir published_at
    if update_data.get("status") == "publicado" and artigo.published_at is None:
        artigo.published_at = datetime.now(timezone.utc)

    for key, value in update_data.items():
        setattr(artigo, key, value)

    await db.commit()
    await db.refresh(artigo)
    return artigo
