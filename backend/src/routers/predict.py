# --- 1. Import Necessary Libraries ---
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
import pickle
import os

# --- 2. Define the EXACT Input Your Model Needs ---
# This class creates automatic error checking for your API.
#
# !!! IMPORTANT !!!
# You MUST replace 'feature1', 'feature2', etc., with the REAL
# feature names your model was trained on. Check your CSV files
# or 'feature_columns.json' for the correct names.
class HerbPredictionInput(BaseModel):
    feature1: str
    feature2: float
    feature3: int
    # For example, it might be:
    # color_intensity: float
    # texture_value: float
    # aroma_level: int
    # ... add all other features your model needs here

# --- 3. Load Your New Model From the 'saved_models' Folder ---
# This code runs only once when your application starts up.
MODEL_FILE_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'saved_models', 'catboost_herb_classification.pkl')

model = None
try:
    with open(MODEL_FILE_PATH, 'rb') as f:
        model = pickle.load(f)
    print(f"✅ Successfully loaded model from: {MODEL_FILE_PATH}")
except Exception as e:
    print(f"❌ CRITICAL ERROR: Could not load model. The API will not work.")
    print(f"❌ Reason: {e}")

# --- 4. Create the API Router for Predictions ---
# This sets up the URL structure.
router = APIRouter(
    prefix="/predict",
    tags=["Predictions"]  # This is for the automatic API documentation
)

# --- 5. Create the API Endpoint to Make Predictions ---
# The URL for this will be: http://your-api-address/predict/herb
@router.post("/herb")
def predict_herb(input_data: HerbPredictionInput):
    """
    Takes herb features as input and returns a classification prediction.
    """
    if not model:
        raise HTTPException(
            status_code=503, # Service Unavailable
            detail="Model is not available. Please check server logs for errors."
        )

    try:
        # Convert the input data into a format the model understands (a DataFrame)
        input_df = pd.DataFrame([input_data.dict()])

        print("\nReceived data for prediction:")
        print(input_df.to_string())

        # Use the loaded model to make the prediction
        prediction = model.predict(input_df)

        # Send the result back in a clean JSON format
        response = {
            'predicted_class': str(prediction[0])
        }
        
        print(f"🔮 Prediction successful: {response}")
        return response
        
    except Exception as e:
        print(f"❌ Error during prediction process: {e}")
        # If something goes wrong during prediction, send a clear error message.
        raise HTTPException(status_code=400, detail=f"Failed to process prediction. Error: {e}")

