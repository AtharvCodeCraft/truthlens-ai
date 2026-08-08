import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError(
        "GEMINI_API_KEY environment variable is not configured."
    )

client = genai.Client(api_key=api_key)

GEMINI_MODEL = os.getenv(
    "GEMINI_MODEL",
    "gemini-3.5-flash"
)


def generate_text(prompt: str) -> str:
    """
    Generate text using Google Gemini.
    """

    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt
        )

        if not response or not response.text:
            raise RuntimeError(
                "Gemini returned an empty response."
            )

        return response.text.strip()

    except Exception as e:
        print(f"Gemini API error: {type(e).__name__}: {e}")

        raise RuntimeError(
            "Unable to generate AI response."
        )