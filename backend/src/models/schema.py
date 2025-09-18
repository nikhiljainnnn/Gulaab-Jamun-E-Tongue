from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Herb(BaseModel):
    id: int
    name: str
    scientific_name: str
    taste_signature: dict
    uses: str
    references: str

class TestResult(BaseModel):
    id: int
    herb_id: int
    batch_id: str
    timestamp: datetime
    raw_data: dict
    prediction: Optional[str] = None
