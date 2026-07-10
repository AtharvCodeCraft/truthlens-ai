from fastapi import APIRouter
from schemas.news import NewsRequest, NewsResponse

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "Running"}


@router.post("/analyze", response_model=NewsResponse)
def analyze(request: NewsRequest):

    return {
        "prediction": "Testing",
        "confidence": 100,
        "explanation": request.text
    }