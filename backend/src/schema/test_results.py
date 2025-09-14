from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TestResultBase(BaseModel):
    batch_id: str
    raw_data: str

class TestResultCreate(TestResultBase):
    herb_id: int

class TestResultRead(TestResultBase):
    id: int
    herb_id: int
    timestamp: datetime

    class Config:
        orm_mode = True

