from pydantic import BaseModel, EmailStr
from typing import Optional, Any
from datetime import datetime
from uuid import UUID


class LeadBase(BaseModel):
    nome: str
    email: Optional[EmailStr] = None
    telefone: str
    interesse_tipo: Optional[str] = None
    mensagem: Optional[str] = None
    metadata_info: Optional[dict[str, Any]] = None


class LeadCreate(LeadBase):
    pass


class LeadResponse(LeadBase):
    id: UUID
    created_at: datetime
    status: str
    origem: str

    class Config:
        from_attributes = True


# --- Artigos ---

class ArtigoBase(BaseModel):
    titulo: str
    slug: str
    conteudo_html: str
    resumo: Optional[str] = None
    categoria: Optional[str] = None
    autor: Optional[str] = "Equipa Casas LSF"
    tags: Optional[list[str]] = None
    imagem_destaque_url: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None


class ArtigoCreate(ArtigoBase):
    status: Optional[str] = "rascunho"


class ArtigoUpdate(BaseModel):
    titulo: Optional[str] = None
    slug: Optional[str] = None
    conteudo_html: Optional[str] = None
    resumo: Optional[str] = None
    categoria: Optional[str] = None
    autor: Optional[str] = None
    tags: Optional[list[str]] = None
    imagem_destaque_url: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    status: Optional[str] = None


class ArtigoResponse(ArtigoBase):
    id: UUID
    created_at: datetime
    published_at: Optional[datetime] = None
    status: str

    class Config:
        from_attributes = True


class ArtigoListItem(BaseModel):
    id: UUID
    titulo: str
    slug: str
    resumo: Optional[str] = None
    categoria: Optional[str] = None
    autor: str
    tags: Optional[list[str]] = None
    imagem_destaque_url: Optional[str] = None
    published_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True


class ArtigosPaginados(BaseModel):
    artigos: list[ArtigoListItem]
    total: int
    pagina: int
    por_pagina: int
