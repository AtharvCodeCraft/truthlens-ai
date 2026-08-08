import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


# --------------------------------------------------
# Database Configuration
# --------------------------------------------------

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./truthlens.db"
)


# --------------------------------------------------
# Database Engine
# --------------------------------------------------

engine_kwargs = {}

# SQLite requires this for FastAPI's request handling
if DATABASE_URL.startswith("sqlite"):
    engine_kwargs["connect_args"] = {
        "check_same_thread": False
    }


engine = create_engine(
    DATABASE_URL,
    **engine_kwargs
)


# --------------------------------------------------
# Session
# --------------------------------------------------

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# --------------------------------------------------
# Base Model
# --------------------------------------------------

Base = declarative_base()
