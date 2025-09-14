
from fastapi import FastAPI
from src.routers.herbs import router as herbs_router

app = FastAPI(
    title="Gulaab Jamun E-Tongue API",
    description="API for managing herbs and taste data",
    version="1.0.0"
)

# This will Include the herbs router
app.include_router(herbs_router)

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to Gulaab Jamun E-Tongue API"}
