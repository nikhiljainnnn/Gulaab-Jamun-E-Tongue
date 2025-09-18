import os
import pickle

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "../../models")

loaded_models = {}

def load_all_models():
    """Load all .pkl models into a dictionary"""
    global loaded_models
    for filename in os.listdir(MODEL_DIR):
        if filename.endswith(".pkl"):
            model_name = filename.replace(".pkl", "")
            with open(os.path.join(MODEL_DIR, filename), "rb") as f:
                loaded_models[model_name] = pickle.load(f)

# Load models at startup
load_all_models()
