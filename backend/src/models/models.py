from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime


# Herb Model

class Herb(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    scientific_name: Optional[str] = None
    taste_signature: Optional[str] = None
    uses: Optional[str] = None
    references: Optional[str] = None

    # 🔗 Add relationship (Herb has many TestResults)
    test_results: List["TestResult"] = Relationship(back_populates="herb")


# TestResult Model
class TestResult(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    herb_id: int = Field(foreign_key="herb.id")
    batch_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    raw_data: str

    # Back link (TestResult belongs to one Herb)
    herb: Optional[Herb] = Relationship(back_populates="test_results")

