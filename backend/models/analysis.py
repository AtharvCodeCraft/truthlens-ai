from sqlalchemy import Column, Integer, Text, Float, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    news = Column(
        Text,
        nullable=False
    )

    prediction = Column(
        Text,
        nullable=False
    )

    confidence = Column(
        Float,
        nullable=False
    )

    explanation = Column(
        Text,
        nullable=False
    )

    created_at = Column(
        Text,
        nullable=False
    )

    user = relationship(
        "User"
    )
