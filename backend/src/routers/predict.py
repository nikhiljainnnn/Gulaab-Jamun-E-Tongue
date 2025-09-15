from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from src.ml.service import predict_taste

# Request schema for prediction input
class PredictRequest(BaseModel):
    features: List[float]  # List of sensor values

# Response schema for prediction output
class PredictResponse(BaseModel):
    herb_prediction: int
    quality_prediction: int

# Router setup
router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)

@router.post("/", response_model=PredictResponse)
def predict(request: PredictRequest):
    """
    Predict herb type and quality based on sensor input values.
    """
    try:
        result = predict_taste(request.features)
        return PredictResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
