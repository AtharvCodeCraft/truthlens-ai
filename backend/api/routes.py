
from fastapi import APIRouter, Header, HTTPException

from schemas.news import NewsRequest, NewsResponse

from services.classifier import predict_news
from services.gemini_service import generate_text
from services.claim_extractor import extract_claims
from services.fact_checker import fact_check

from services.analysis_service import (
    save_analysis,
    get_user_analysis_history,
    delete_analysis
)

from services.jwt_service import decode_access_token


router = APIRouter()


# --------------------------------------------------
# Gemini Explanation
# --------------------------------------------------

def generate_explanation(text: str, prediction: str) -> str:
    """
    Generate an explanation for the prediction using Gemini.
    """

    prompt = f"""
You are an AI news-analysis assistant for TruthLens AI.

Explain why the following news article was classified as:

Prediction: {prediction}

Rules:
- Explain the reasoning clearly.
- Focus on the claims and wording in the article.
- Do not invent facts.
- Do not claim that external sources were checked.
- Keep the explanation concise and understandable.
- Return only the explanation.

News article:
{text[:6000]}
"""

    return generate_text(prompt)


# --------------------------------------------------
# Health
# --------------------------------------------------

# NOTE:
# The main /health endpoint is already defined in app.py.
# Therefore, we intentionally do not define another /health
# endpoint here.


# --------------------------------------------------
# Analyze News
# --------------------------------------------------

@router.post(
    "/analyze",
    response_model=NewsResponse
)
def analyze(
    request: NewsRequest,
    authorization: str = Header(
        default=None,
        alias="Authorization"
    )
):
    """
    Analyze a news article using Gemini,
    extract claims, perform fact checking,
    and optionally save the analysis for
    the authenticated user.
    """

    if not request.text or not request.text.strip():
        raise HTTPException(
            status_code=400,
            detail="News text cannot be empty."
        )

    try:
        # ------------------------------------------
        # 1. Classify news
        # ------------------------------------------

        result = predict_news(request.text)

        # ------------------------------------------
        # 2. Generate explanation
        # ------------------------------------------

        explanation = generate_explanation(
            request.text,
            result["prediction"]
        )

        # ------------------------------------------
        # 3. Extract factual claims
        # ------------------------------------------

        claims = extract_claims(request.text)

        # ------------------------------------------
        # 4. Fact check claims
        # ------------------------------------------

        fact_results = fact_check(claims)

        # ------------------------------------------
        # 5. Get authenticated user if available
        # ------------------------------------------

        payload = None

        if authorization:
            token = authorization.strip()

            if token.lower().startswith("bearer "):
                token = token[7:].strip()

            payload = decode_access_token(token)

        # ------------------------------------------
        # 6. Save analysis for logged-in user
        # ------------------------------------------

        if payload and payload.get("id"):
            save_analysis(
                payload["id"],
                request.text,
                {
                    "prediction": result["prediction"],
                    "confidence": result["confidence"],
                    "explanation": explanation
                }
            )

        # ------------------------------------------
        # 7. Return result
        # ------------------------------------------

        return {
            "prediction": result["prediction"],
            "confidence": result["confidence"],
            "claims": claims,
            "fact_check": fact_results,
            "explanation": explanation
        }

    except HTTPException:
        raise

    except Exception as e:
        print(
            f"News analysis error: {type(e).__name__}: {e}"
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to analyze the news article."
        )


# --------------------------------------------------
# Analysis History
# --------------------------------------------------

@router.get("/analysis/history")
def history(
    authorization: str = Header(
        default=None,
        alias="Authorization"
    )
):
    """
    Return analysis history for the authenticated user.
    """

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Token missing"
        )

    token = authorization.strip()

    if token.lower().startswith("bearer "):
        token = token[7:].strip()

    payload = decode_access_token(token)

    if not payload or not payload.get("id"):
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    return get_user_analysis_history(
        payload["id"]
    )


# --------------------------------------------------
# Delete Analysis
# --------------------------------------------------

@router.delete("/analysis/{analysis_id}")
def delete_history(
    analysis_id: int,
    authorization: str = Header(
        default=None,
        alias="Authorization"
    )
):
    """
    Delete an analysis belonging to the authenticated user.
    """

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Token missing"
        )

    token = authorization.strip()

    if token.lower().startswith("bearer "):
        token = token[7:].strip()

    payload = decode_access_token(token)

    if not payload or not payload.get("id"):
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
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
