from fastapi import APIRouter
from schemas.news import NewsRequest, NewsResponse
from services.classifier import predict_news
from services.ollama_service import generate_explanation
from services.claim_extractor import extract_claims
from services.fact_checker import fact_check
from schemas.news import NewsRequest, NewsResponse

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "Running"}


@router.post("/analyze", response_model=NewsResponse)
def analyze(request: NewsRequest):

    result = predict_news(request.text)
    
    

    explanation = generate_explanation(
        request.text,
        result["prediction"]
    )
    claims = extract_claims(request.text)
    fact_results = fact_check(claims)
    
    return {
    "prediction": result["prediction"],
    "confidence": result["confidence"],
    "claims": claims,
    "fact_check": fact_results,
    "explanation": explanation
}