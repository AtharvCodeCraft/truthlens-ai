from pydantic import BaseModel


class NewsRequest(BaseModel):
    text: str


class FactCheckResult(BaseModel):
    claim: str
    analysis: str


class NewsResponse(BaseModel):
    prediction: str
    confidence: float
    explanation: str
    claims: list[str]
    fact_check: list[FactCheckResult]