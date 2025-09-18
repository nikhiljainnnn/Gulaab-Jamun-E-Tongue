import requests
import pandas as pd

# Load one row from the test dataset
df = pd.read_csv("synthetic_realistic_test.csv")
sample = df.drop(columns=["herb_class", "quality_label"]).iloc[0]  # remove labels
data = sample.to_dict()

# Send request to FastAPI endpoint
url = "http://127.0.0.1:8000/predict"
response = requests.post(url, json=data)

print("Input Data:", data)
print("Response:", response.json())
