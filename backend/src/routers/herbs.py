# backend/src/routers/herbs.py

from fastapi import APIRouter, Depends
from sqlmodel import Session, select
import sys
import os

# Add backend folder to sys.path so database.py can be imported
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))


from database import get_session              # backend/database.py
from src.models.models import Herb            # your SQLModel Herb
from src.schema.herbs import HerbCreate     # Pydantic schema

router = APIRouter(
    prefix="/herbs",
    tags=["herbs"]
)

# GET all herbs
@router.get("/")
def get_herbs(session: Session = Depends(get_session)):
    herbs = session.exec(select(Herb)).all()
    return herbs

# POST a new herb
@router.post("/")
def create_herb(herb: HerbCreate, session: Session = Depends(get_session)):
    new_herb = Herb(name=herb.name)
    session.add(new_herb)
    session.commit()
    session.refresh(new_herb)
    return new_herb
