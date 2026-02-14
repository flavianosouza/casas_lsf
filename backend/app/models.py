from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
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
    interesse_tipo = Column(String, nullable=True) # T1, T2, etc.
    mensagem = Column(Text, nullable=True)
    metadata_info = Column(JSON, nullable=True) # Store extra form data here
