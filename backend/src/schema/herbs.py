from pydantic import BaseModel
from typing import Optional, List
from src.schema.test_results import TestResultRead  # import for nested results to herbs

class HerbBase(BaseModel):
    name: str
    scientific_name: Optional[str] = None
    taste_signature: Optional[str] = None
    uses: Optional[str] = None
    references: Optional[str] = None

class HerbCreate(HerbBase):
    pass

class HerbRead(HerbBase):
    id: int
    test_results: List[TestResultRead] = []   # link test results to herbs

    class Config:
        orm_mode = True

