from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

# Define input data structure
class InputData(BaseModel):
    feature1: float
    feature2: float

# A new endpoint for prediction
@app.post("/predict")
def predict(data: InputData):
    # Temporary fake prediction
    result = data.feature1 + data.feature2
    return {"prediction": result}
