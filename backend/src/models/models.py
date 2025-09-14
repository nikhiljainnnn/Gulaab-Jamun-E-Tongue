from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

# -------------------------
# Herb Model
# -------------------------
class Herb(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    scientific_name: Optional[str] = None
    taste_signature: Optional[str] = None
    uses: Optional[str] = None
    references: Optional[str] = None

# -------------------------
# TestResult Model
# -------------------------
class TestResult(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    herb_id: int = Field(foreign_key="herb.id")
    batch_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    raw_data: str
