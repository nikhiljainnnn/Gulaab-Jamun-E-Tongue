from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TestResultCreate(BaseModel):
    herb_id: int
    batch_id: str
    raw_data: str

class TestResultRead(TestResultCreate):
    id: int
    timestamp: datetime
