from fastapi import APIRouter
from src.schema.predict import PredictRequest, PredictResponse
from src.ml.service import predict_taste

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("/", response_model=PredictResponse)
def get_prediction(request: PredictRequest):
    """
    Use the trained ML model to predict the taste of a herb sample
    based on sensor data.
    """
    # Convert request (Pydantic model) to dict
    features = request.dict()

    # Run prediction via ML service
    result = predict_taste(features)

    # Return as a Pydantic response
    return PredictResponse(**result)
