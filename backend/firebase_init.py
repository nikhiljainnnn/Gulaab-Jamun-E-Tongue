import os
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get the service account path from .env
cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

if not firebase_admin._apps:
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
