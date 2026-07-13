from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router as news_router
from api.auth import router as auth_router
from database import engine
from models.user import User
from database import Base
from models.analysis import Analysis

Base.metadata.create_all(bind=engine)
app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# News Routes
app.include_router(news_router)

# Authentication Routes
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)