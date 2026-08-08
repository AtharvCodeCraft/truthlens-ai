
import json
import re

from services.gemini_service import generate_text


def predict_news(text: str):
    """
    Analyze news text using Gemini instead of loading
    a local Hugging Face Transformer model.

    Returns the same basic structure that the existing
    application expects.
    """

    if not text or not text.strip():
        raise ValueError("News text cannot be empty.")

    # Limit input size to avoid unnecessarily large API requests
    news_text = text.strip()[:6000]

    prompt = f"""
You are a professional fake-news analysis AI.

Analyze the following news text and determine whether it is
likely REAL or FAKE based only on the information provided.

Important:
- Do not use sentiment as a proxy for truth.
- Do not claim that you verified external sources unless you actually did.
- Give a confidence score between 0 and 100.
- Return ONLY valid JSON.
- Do not use markdown code blocks.

Required JSON format:
{{
    "prediction": "Likely Real",
    "confidence": 85
}}

News text:
{news_text}
"""

    try:
        response = generate_text(prompt)

        # Remove possible markdown formatting
        cleaned_response = response.strip()

        cleaned_response = re.sub(
            r"^```json\s*",
            "",
            cleaned_response,
            flags=re.IGNORECASE
        )

        cleaned_response = re.sub(
            r"\s*```$",
            "",
            cleaned_response
        )

        result = json.loads(cleaned_response)

        prediction = result.get("prediction")
        confidence = result.get("confidence")

        # Validate prediction
        if prediction not in ["Likely Real", "Likely Fake"]:
            raise ValueError("Invalid prediction returned by Gemini.")

        # Validate confidence
        confidence = float(confidence)

        if not 0 <= confidence <= 100:
            raise ValueError("Invalid confidence score returned by Gemini.")

        return {
            "prediction": prediction,
            "confidence": round(confidence, 2)
        }

    except json.JSONDecodeError:
        raise RuntimeError(
            "Gemini returned an invalid analysis format."
        )

    except (ValueError, TypeError) as e:
        raise RuntimeError(
            f"Invalid Gemini analysis result: {e}"
        )

    except Exception as e:
        raise RuntimeError(
            f"News classification failed: {e}"
        )
