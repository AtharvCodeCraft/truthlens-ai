from pydantic import BaseModel

class NewsRequest(BaseModel):
    text: str

class NewsResponse(BaseModel):
    prediction: str
    confidence: float
    explanation: str
    claims: list[str]
    fact_check: list[dict]