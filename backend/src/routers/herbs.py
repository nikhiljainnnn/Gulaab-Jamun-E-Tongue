from fastapi import APIRouter
from src.models.schema import Herb

router = APIRouter()
herbs_db = []  # temporary list

@router.post("/herbs")
def add_herb(herb: Herb):
    herbs_db.append(herb)
    return {"message": "Herb added", "herb": herb}

@router.get("/herbs")
def list_herbs():
    return herbs_db
