from fastapi import APIRouter, Depends, HTTPException, Header
from firebase_admin import auth
from typing import Dict

router = APIRouter(prefix="/auth", tags=["Authentication"])

# ----------------------------
# Dependency to verify Firebase token
# ----------------------------
def verify_token(authorization: str = Header(...)) -> Dict:
    """
    Verifies the Firebase ID token from the Authorization header.
    Expected header format: "Authorization: Bearer <token>"
    Returns the decoded token on success.
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")

    token = authorization.split(" ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token  # Contains uid, email, etc.
    except auth.ExpiredIdTokenError:
        # Old versions used this, now we just catch auth.InvalidIdTokenError
        raise HTTPException(status_code=401, detail="Token has expired")
    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except auth.RevokedIdTokenError:
        raise HTTPException(status_code=401, detail="Token has been revoked")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")

# ----------------------------
# Example protected route
# ----------------------------
@router.get("/me")
def get_me(user: Dict = Depends(verify_token)):
    """
    Returns basic information of the authenticated user.
    """
    return {"uid": user.get("uid"), "email": user.get("email")}
