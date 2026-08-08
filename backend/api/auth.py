from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models.user import User

from schemas.user import UserRegister, UserLogin
from services.auth_service import hash_password, verify_password
from services.jwt_service import create_access_token


router = APIRouter()


# --------------------------------------------------
# Register
# --------------------------------------------------

@router.post("/register")
def register(user: UserRegister):
    db: Session = SessionLocal()

    try:
        # Normalize email
        email = user.email.strip().lower()

        # Check if user already exists
        existing = db.query(User).filter(
            User.email == email
        ).first()

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        # Create new user
        new_user = User(
            name=user.name.strip(),
            email=email,
            password=hash_password(user.password)
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "message": "User registered successfully"
        }

    except HTTPException:
        raise

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Registration failed"
        )

    finally:
        db.close()


# --------------------------------------------------
# Login
# --------------------------------------------------

@router.post("/login")
def login(user: UserLogin):
    db: Session = SessionLocal()

    try:
        # Normalize email
        email = user.email.strip().lower()

        # Find user
        existing = db.query(User).filter(
            User.email == email
        ).first()

        if existing is None:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        # Verify password
        if not verify_password(
            user.password,
            existing.password
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid password"
            )

        # Create JWT access token
        token = create_access_token(
            {
                "sub": existing.email,
                "id": existing.id
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": existing.id,
                "name": existing.name,
                "email": existing.email
            }
        }

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Login failed"
        )

    finally:
        db.close()
