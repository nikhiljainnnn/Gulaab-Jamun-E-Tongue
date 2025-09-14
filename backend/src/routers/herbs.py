
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_herbs():
    """
    Placeholder endpoint — it will return an empty list.
    Later we will query the DB and return Herb rows.
    """
    return []
