from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
from src.utils.model_loader import loaded_models

router = APIRouter(prefix="/predict", tags=["predict"])

class InputData(BaseModel):
    features: dict  # Example: {"sensor_1": 0.5, "sensor_2": 1.2, ...}

@router.post("/{model_name}")
def predict(model_name: str, data: InputData):
    """
    Generic prediction endpoint:
    - POST /predict/xgb_herb_classification
    - POST /predict/xgb_quality_classification
    """
    if model_name not in loaded_models:
        raise HTTPException(status_code=404, detail=f"Model '{model_name}' not found")

    model = loaded_models[model_name]
    df = pd.DataFrame([data.features])

    try:
        prediction = model.predict(df)[0]
        return {"model": model_name, "prediction": str(prediction)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
