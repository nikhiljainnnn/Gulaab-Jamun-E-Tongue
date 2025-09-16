from fastapi import APIRouter
from src.models.schema import TestResult

router = APIRouter()
results_db = []  # temporary list

@router.post("/test_results")
def add_result(result: TestResult):
    results_db.append(result)
    return {"message": "Result added", "result": result}

@router.get("/test_results")
def list_results():
    return results_db
