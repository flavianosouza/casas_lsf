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
