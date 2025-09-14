from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from database import get_session
from src.models.models import TestResult
from src.schema.test_results import TestResultCreate, TestResultRead

router = APIRouter(prefix="/test_results", tags=["Test Results"])

# GET all test results
@router.get("/", response_model=list[TestResultRead])
def get_test_results(session: Session = Depends(get_session)):
    return session.exec(select(TestResult)).all()

# POST new test result
@router.post("/", response_model=TestResultRead)
def create_test_result(result: TestResultCreate, session: Session = Depends(get_session)):
    new_result = TestResult(**result.dict())
    session.add(new_result)
    session.commit()
    session.refresh(new_result)
    return new_result
