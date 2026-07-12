from pydantic import BaseModel

class RelatedArticle(BaseModel):
    title: str
    source: str
    url: str
class NewsRequest(BaseModel):
    text: str


class NewsResponse(BaseModel):
    prediction: str
    confidence: float
    credibility: float
    explanation: str
    claims: list[str]
    related_news: list[RelatedArticle]
    model: str
    processing_time: str