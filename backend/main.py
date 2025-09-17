  # just to initialize Firebase

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

# Import routers
from src.routers import predict, herbs, test_results, auth

# ----------------------------
# FastAPI app setup
# ----------------------------
app = FastAPI(
    title="Gulaab Jamun E-Tongue API",
    description="API for managing herbs, taste data, and ML predictions",
    version="1.0.0"
)

# CORS setup
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
ADDITIONAL_ORIGINS = os.getenv("CORS_EXTRA_ORIGINS", "").split(",") if os.getenv("CORS_EXTRA_ORIGINS") else []
ALLOWED_ORIGINS = [FRONTEND_ORIGIN] + [o.strip() for o in ADDITIONAL_ORIGINS if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(predict.router)
app.include_router(herbs.router)
app.include_router(test_results.router)
app.include_router(auth.router)

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to Gulaab Jamun E-Tongue API"}
