from fastapi import APIRouter
from schemas.news import NewsRequest, NewsResponse
from services.classifier import predict_news
from services.ollama_service import generate_explanation
from services.claim_extractor import extract_claims
from services.fact_checker import fact_check
from services.credibility import analyze_credibility
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
    credibility = analyze_credibility(request.text)
    return {
    "prediction": result["prediction"],
    "confidence": result["confidence"],
    "claims": claims,
    "fact_check": fact_results,
    "credibility": credibility,
    "explanation": explanation
}