from fastapi import FastAPI
from src.routers import herbs, test_results, predict  # ✅ include predict here

app = FastAPI(
    title="Gulaab Jamun E-Tongue API",
    description="API for managing herbs, taste data, and ML predictions",
    version="1.0.0"
)

# Register routers
app.include_router(herbs.router)
app.include_router(test_results.router)
app.include_router(predict.router)  # ✅ include predict router

@app.get("/")
def root():
    return {"message": "Welcome to Gulaab Jamun E-Tongue API"}
