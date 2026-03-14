from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import User
from utils.mfa import generate_mfa_setup, verify_mfa_code

router = APIRouter()


# Setup MFA
@router.post("/mfa/setup")
def setup_mfa(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    mfa_data = generate_mfa_setup(user.email)

    user.mfa_secret = mfa_data["secret"]
    db.commit()

    return {
        "message": "Scan this QR with Google Authenticator",
        "qr_code": mfa_data["qr_code"],
        "secret": mfa_data["secret"]
    }


# Verify MFA
@router.post("/mfa/verify")
def verify_mfa(user_id: int, token: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user or not user.mfa_secret:
        raise HTTPException(status_code=400, detail="MFA not setup")

    valid = verify_mfa_code(user.mfa_secret, token)

    if not valid:
        raise HTTPException(status_code=401, detail="Invalid token")

    user.mfa_enabled = True
    db.commit()

    return {"message": "MFA enabled successfully"}


# Disable MFA
@router.post("/mfa/disable")
def disable_mfa(user_id: int, token: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not user.mfa_enabled:
        raise HTTPException(status_code=400, detail="MFA is not enabled")

    # Verify token before disabling
    valid = verify_mfa_code(user.mfa_secret, token)

    if not valid:
        raise HTTPException(status_code=401, detail="Invalid token")

    user.mfa_enabled = False
    user.mfa_secret = None
    db.commit()

    return {"message": "MFA disabled successfully"}