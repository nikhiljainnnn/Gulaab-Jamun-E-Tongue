from pydantic import BaseModel

# 🟢 Input schema: what the frontend sends when asking for a prediction
class PredictRequest(BaseModel):
    # Add the sensor features your model actually needs (without optical absorbance)
    # Example features (replace with your real ones):
    ph: float
    conductivity: float
    bitterness_signal: float
    sourness_signal: float
    sweetness_signal: float
    saltiness_signal: float


# 🔵 Output schema: what your API will return to the frontend
class PredictResponse(BaseModel):
    # The predicted taste class/label from the ML model
    predicted_label: str

    # (Optional) The confidence/probability of the prediction
    confidence: float | None = None
