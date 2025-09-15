import os
import numpy as np
import xgboost as xgb

# Paths to model files inside the ml folder
HERB_MODEL_PATH = os.path.join(os.path.dirname(__file__), "xgb_herb_classification.json")
QUALITY_MODEL_PATH = os.path.join(os.path.dirname(__file__), "xgb_quality_classification.json")

# Load the models
herb_model = xgb.Booster()
herb_model.load_model(HERB_MODEL_PATH)

quality_model = xgb.Booster()
quality_model.load_model(QUALITY_MODEL_PATH)

def predict_taste(features: list) -> dict:
    """
    Run predictions using the herb and quality XGBoost models.
    
    Args:
        features (list): Input sensor values as a list of floats.
    
    Returns:
        dict: Predictions for herb type and quality.
    """
    # Convert input into XGBoost DMatrix
    dmatrix = xgb.DMatrix(np.array([features]))

    # Predictions (these return probabilities by default)
    herb_probs = herb_model.predict(dmatrix)
    quality_probs = quality_model.predict(dmatrix)

    # Take the class with the highest probability
    herb_pred = int(np.argmax(herb_probs))
    quality_pred = int(np.argmax(quality_probs))

    return {
        "herb_prediction": herb_pred,
        "quality_prediction": quality_pred
    }
