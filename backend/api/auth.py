from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models.user import User

from schemas.user import UserRegister, UserLogin
from services.auth_service import hash_password, verify_password
from services.jwt_service import create_access_token

router = APIRouter()


@router.post("/register")
def register(user: UserRegister):

    db: Session = SessionLocal()

    existing = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing:
        db.close()
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.close()

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(user: UserLogin):

    db: Session = SessionLocal()

    existing = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing is None:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        user.password,
        existing.password
    ):
        db.close()
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token(
        {
            "sub": existing.email,
            "id": existing.id
        }
    )

    db.close()

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": existing.id,
            "name": existing.name,
            "email": existing.email
        }
    }