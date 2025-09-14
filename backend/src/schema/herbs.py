from pydantic import BaseModel
from typing import Optional

class HerbCreate(BaseModel):
    name: str
    scientific_name: Optional[str] = None
    taste_signature: Optional[str] = None
    uses: Optional[str] = None
    references: Optional[str] = None

class HerbUpdate(BaseModel):
    name: Optional[str] = None
    scientific_name: Optional[str] = None
    taste_signature: Optional[str] = None
    uses: Optional[str] = None
    references: Optional[str] = None

class HerbRead(HerbCreate):
    id: int
