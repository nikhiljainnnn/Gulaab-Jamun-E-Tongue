from fastapi import FastAPI
from sqlmodel import SQLModel
from database import engine
from src.models.models import Herb



app = FastAPI()

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI with DB!"}
