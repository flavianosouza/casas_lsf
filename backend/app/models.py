from sqlalchemy import Column, String, Text, DateTime, JSON, ARRAY
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .database import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    nome = Column(String, nullable=False)
    email = Column(String, nullable=True)
    telefone = Column(String, nullable=False)
    origem = Column(String, default="portal_organico")
    status = Column(String, default="novo")
    interesse_tipo = Column(String, nullable=True)
    mensagem = Column(Text, nullable=True)
    metadata_info = Column(JSON, nullable=True)


class Artigo(Base):
    __tablename__ = "artigos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    published_at = Column(DateTime(timezone=True), nullable=True)
    titulo = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    conteudo_html = Column(Text, nullable=False)
    resumo = Column(Text, nullable=True)
    categoria = Column(String(50), nullable=True)
    autor = Column(String(100), default="Equipa Casas LSF")
    tags = Column(ARRAY(String), nullable=True)
    imagem_destaque_url = Column(Text, nullable=True)
    meta_title = Column(String(255), nullable=True)
    meta_description = Column(String(320), nullable=True)
    status = Column(String(50), default="rascunho")
