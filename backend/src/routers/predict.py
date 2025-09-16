from fastapi import APIRouter
from src.ml.service import predict_taste

router = APIRouter()

@router.post("/predict")
def predict(data: dict):
    result = predict_taste(data)
    return result

