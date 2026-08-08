import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from models.user import User
from models.analysis import Analysis

from api.routes import router as news_router
from api.auth import router as auth_router


# --------------------------------------------------
# Database
# --------------------------------------------------

# Create database tables
Base.metadata.create_all(bind=engine)


# --------------------------------------------------
# FastAPI Application
# --------------------------------------------------

app = FastAPI(
    title="TruthLens AI API",
    version="1.0.0"
)


# --------------------------------------------------
# CORS Configuration
# --------------------------------------------------

# Get frontend URL from environment variable.
# Example on Render:
# FRONTEND_URL=https://your-frontend.onrender.com

frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

allowed_origins = [
    frontend_url,
    "http://localhost:5173",
]


# Remove duplicate origins
allowed_origins = list(set(allowed_origins))


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# --------------------------------------------------
# News Routes
# --------------------------------------------------

app.include_router(
    news_router,
    tags=["News Analysis"]
)


# --------------------------------------------------
# Authentication Routes
# --------------------------------------------------

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)
