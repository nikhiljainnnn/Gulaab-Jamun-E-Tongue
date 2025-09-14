from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
import sys
import os

# Add backend folder to sys.path so database.py can be imported
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))


from database import get_session              # backend/database.py
from src.models.models import Herb            # SQLModel Herb
from src.schema.herbs import HerbCreate, HerbRead  # Pydantic schemas

router = APIRouter(
    prefix="/herbs",
    tags=["herbs"]
)

# GET all herbs
@router.get("/", response_model=list[HerbRead])
def get_herbs(session: Session = Depends(get_session)):
    herbs = session.exec(select(Herb)).all()
    return herbs

# GET a single herb by ID
@router.get("/{herb_id}", response_model=HerbRead)
def get_herb(herb_id: int, session: Session = Depends(get_session)):
    herb = session.get(Herb, herb_id)
    if not herb:
        raise HTTPException(status_code=404, detail="Herb not found")
    return herb

# POST a new herb
@router.post("/", response_model=HerbRead)
def create_herb(herb: HerbCreate, session: Session = Depends(get_session)):
    new_herb = Herb(**herb.dict())
    session.add(new_herb)
    session.commit()
    session.refresh(new_herb)
    return new_herb

# baad me update karna hai

# @router.put("/{herb_id}", response_model=HerbRead)
# def update_herb(herb_id: int, herb_data: HerbUpdate, session: Session = Depends(get_session)):
#     herb = session.get(Herb, herb_id)
#     if not herb:
#         raise HTTPException(status_code=404, detail="Herb not found")
#     for key, value in herb_data.dict(exclude_unset=True).items():
#         setattr(herb, key, value)
#     session.add(herb)
#     session.commit()
#     session.refresh(herb)
#     return herb

# DELETE a herb
@router.delete("/{herb_id}")
def delete_herb(herb_id: int, session: Session = Depends(get_session)):
    herb = session.get(Herb, herb_id)
    if not herb:
        raise HTTPException(status_code=404, detail="Herb not found")
    session.delete(herb)
    session.commit()
    return {"message": "Herb deleted successfully"}
