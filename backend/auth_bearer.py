# backend/app/auth_bearer.py

from fastapi import Request, HTTPException, status
from firebase_admin import auth

async def get_current_user(request: Request):
    """
    Dependency to verify Firebase ID token from Authorization header.
    """
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header is missing"
        )

    # The header should be in the format "Bearer <token>"
    parts = auth_header.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header format"
        )
        
    id_token = parts[1]

    try:
        # Verify the ID token using the Firebase Admin SDK
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except auth.InvalidIdTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid Firebase ID token"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during token verification: {e}"
        )