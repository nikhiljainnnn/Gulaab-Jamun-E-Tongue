from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from src.models.models import TestResult, Herb
from src.schema.test_results import TestResultCreate, TestResultRead

router = APIRouter()

# Get all test results
@router.get("/testresults/", response_model=list[TestResultRead])
def get_testresults(session: Session = Depends(get_session)):
    results = session.exec(select(TestResult)).all()
    return results

# Create new test result
@router.post("/testresults/", response_model=TestResultRead)
def create_testresult(testresult: TestResultCreate, session: Session = Depends(get_session)):
    # Ensure herb exists
    herb = session.get(Herb, testresult.herb_id)
    if not herb:
        raise HTTPException(status_code=404, detail="Herb not found")

    new_result = TestResult(
        batch_id=testresult.batch_id,
        raw_data=testresult.raw_data,
        herb_id=testresult.herb_id,
    )
    session.add(new_result)
    session.commit()
    session.refresh(new_result)
    return new_result
