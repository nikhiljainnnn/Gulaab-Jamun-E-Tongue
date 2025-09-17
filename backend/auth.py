from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict, Any, Optional
import os

try:
    from firebase_admin import auth
    FIREBASE_AVAILABLE = True
except ImportError:
    FIREBASE_AVAILABLE = False

# 1. Defines a security scheme to expect a Bearer token.
token_scheme = HTTPBearer()

async def get_current_user(creds: HTTPAuthorizationCredentials = Depends(token_scheme)) -> Dict[str, Any]:
    """
    A dependency function to extract and verify a Firebase ID token from the
    Authorization header. Falls back to mock user if Firebase is not available.
    """
    id_token = creds.credentials

    # Check if Firebase is available and credentials file exists
    cred_path = os.path.join(os.path.dirname(_file_), '..', 'firebase-credentials.json')
    
    if not FIREBASE_AVAILABLE or not os.path.exists(cred_path):
        # Return mock user for development
        return {
            "uid": "mock-user-id",
            "email": "test@example.com",
            "name": "Test User"
        }

    try:
        # Use the official method to verify the token.
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token

    except auth.InvalidIdTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Firebase ID token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {e}",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Optional dependency for endpoints that don't require auth
async def get_current_user_optional(creds: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer(auto_error=False))) -> Optional[Dict[str, Any]]:
    """Optional authentication - returns None if no token provided"""
    if creds is None:
        return None
    return await get_current_user(creds)