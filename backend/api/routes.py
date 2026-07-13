from fastapi import APIRouter, Header, HTTPException

from schemas.news import NewsRequest, NewsResponse
from services.classifier import predict_news
from services.ollama_service import generate_explanation
from services.claim_extractor import extract_claims
from services.fact_checker import fact_check
from services.analysis_service import (
    save_analysis,
    get_user_analysis_history,
    delete_analysis
)
from services.jwt_service import decode_access_token

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "Running"}


@router.post("/analyze", response_model=NewsResponse)
def analyze(
    request: NewsRequest,
    authorization: str = Header(default=None, alias="Authorization")
):

    result = predict_news(request.text)

    explanation = generate_explanation(
        request.text,
        result["prediction"]
    )

    claims = extract_claims(request.text)

    fact_results = fact_check(claims)

    payload = None

    if authorization:
        token = authorization.replace("Bearer ", "")
        payload = decode_access_token(token)

    if payload:
        save_analysis(
            payload["id"],
            request.text,
            {
                "prediction": result["prediction"],
                "confidence": result["confidence"],
                "explanation": explanation
            }
        )

    return {
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "claims": claims,
        "fact_check": fact_results,
        "explanation": explanation,
    }


@router.get("/analysis/history")
def history(
    authorization: str = Header(default=None, alias="Authorization")
):
    print("=" * 50)
    print("Authorization Header:", authorization)

    if not authorization:
        raise HTTPException(status_code=401, detail="Token missing")

    token = authorization.replace("Bearer ", "")

    print("Token:", token)

    payload = decode_access_token(token)

    print("Payload:", payload)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    return get_user_analysis_history(payload["id"])


@router.delete("/analysis/{analysis_id}")
def delete_history(
    analysis_id: int,
    authorization: str = Header(default=None, alias="Authorization")
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Token missing"
        )

    token = authorization.replace("Bearer ", "")

    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    deleted = delete_analysis(
        payload["id"],
        analysis_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    return {
        "message": "Analysis deleted successfully"
    }