from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from ..database import get_db
from ..models import Lead
from ..schemas import LeadCreate, LeadResponse

router = APIRouter(
    prefix="/api/leads",
    tags=["leads"]
)

@router.post("/", response_model=LeadResponse)
async def create_lead(lead: LeadCreate, db: AsyncSession = Depends(get_db)):
    db_lead = Lead(**lead.dict())
    db.add(db_lead)
    await db.commit()
    await db.refresh(db_lead)
    return db_lead

@router.get("/", response_model=list[LeadResponse])
async def read_leads(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Lead).offset(skip).limit(limit))
    leads = result.scalars().all()
    return leads
