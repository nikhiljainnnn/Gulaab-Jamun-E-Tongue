from pydantic import BaseModel
from typing import Optional, List
from src.schema.test_results import TestResultRead  # import for nested results to herbs


#this is the base model for the hebs
class HerbBase(BaseModel):
    name: str
    scientific_name: Optional[str] = None
    taste_signature: Optional[str] = None
    uses: Optional[str] = None
    references: Optional[str] = None


    #schema for creating a new herb

class HerbCreate(HerbBase):
    pass     #pass means that the class is empty

class HerbRead(HerbBase):
    id: int
    test_results: List[TestResultRead] = []   # link test results to herbs

    class Config:
        orm_mode = True

