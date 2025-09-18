import os
import joblib

# Path to your model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")

print("Checking model file...")

# Step 1: Check if file exists
if not os.path.exists(MODEL_PATH):
    print(f"❌ Model file does not exist: {MODEL_PATH}")
    exit(1)

# Step 2: Check if file is empty
if os.path.getsize(MODEL_PATH) == 0:
    print(f"❌ Model file is empty or corrupted: {MODEL_PATH}")
    exit(1)

# Step 3: Try loading the model
try:
    model = joblib.load(MODEL_PATH)
    print(f"✅ Model loaded successfully! Type: {type(model)}")
except EOFError:
    print(f"❌ EOFError: The model file is corrupted: {MODEL_PATH}")
except Exception as e:
    print(f"❌ Error loading model: {e}")
