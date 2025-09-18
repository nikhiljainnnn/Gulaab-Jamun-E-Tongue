from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# Base schema for TestResult
class TestResultBase(BaseModel):
    batch_id: str
    raw_data: str

#for new test results
class TestResultCreate(TestResultBase):
    herb_id: int
#for reading test results
class TestResultRead(TestResultBase):
    id: int
    herb_id: int
    timestamp: datetime

    class Config:
        orm_mode = True

