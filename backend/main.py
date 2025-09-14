from fastapi import FastAPI
from src.routers import herbs, test_results

app = FastAPI(
    title="Gulaab Jamun E-Tongue API",
    description="API for managing herbs and taste data",
    version="1.0.0"
)

app.include_router(herbs.router)
app.include_router(test_results.router)

@app.get("/")
def root():
    return {"message": "Welcome to Gulaab Jamun E-Tongue API"}
