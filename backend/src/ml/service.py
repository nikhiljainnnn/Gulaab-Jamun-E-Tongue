import os
import joblib

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")

model = None
try:
    if os.path.exists(MODEL_PATH) and os.path.getsize(MODEL_PATH) > 0:
        model = joblib.load(MODEL_PATH)
        print("✅ Model loaded successfully")
    else:
        print("⚠️ No valid model found, using dummy predictions")
except Exception as e:
    print(f"⚠️ Could not load model: {e}")
    model = None

def predict_taste(data):
    if model is None:
        # Temporary dummy prediction
        return {"prediction": "unknown", "confidence": 0.0}
    else:
        return model.predict([data]).tolist()
