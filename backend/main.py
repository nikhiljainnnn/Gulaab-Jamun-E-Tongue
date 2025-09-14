# main.py (at backend/main.py)
from fastapi import FastAPI
from sqlmodel import SQLModel
from database import engine
# if your model import is required elsewhere keep it; otherwise it's optional here
# from src.models.models import Herb

# import our new router
from src.routers.herbs import router as herbs_router

app = FastAPI()

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# mount the herbs router at /herbs
app.include_router(herbs_router, prefix="/herbs", tags=["herbs"])

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI with DB!"}
