from sqlalchemy import Column, Integer, Text, Float, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    news = Column(Text)

    prediction = Column(Text)

    confidence = Column(Float)

    explanation = Column(Text)

    created_at = Column(Text)

    user = relationship("User")