from sqlmodel import SQLModel, Field
from typing import Optional

class Herb(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    scientific_name: Optional[str] = None
    taste_signature: Optional[str] = None   # or JSON if you want
    uses: Optional[str] = None
    references: Optional[str] = None
