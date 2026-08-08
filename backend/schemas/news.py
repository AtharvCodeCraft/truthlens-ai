
from pydantic import BaseModel, Field


# --------------------------------------------------
# News Request
# --------------------------------------------------

class NewsRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=1,
        max_length=10000
    )


# --------------------------------------------------
# Fact Check Result
# --------------------------------------------------

class FactCheckResult(BaseModel):
    claim: str
    analysis: str


# --------------------------------------------------
# News Response
# --------------------------------------------------

class NewsResponse(BaseModel):
    prediction: str
    confidence: float
    explanation: str
    claims: list[str]
    fact_check: list[FactCheckResult]
