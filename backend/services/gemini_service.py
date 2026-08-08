
import os

from dotenv import load_dotenv
from google import genai


# --------------------------------------------------
# Load Environment Variables
# --------------------------------------------------

load_dotenv()


# --------------------------------------------------
# Gemini API Configuration
# --------------------------------------------------

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError(
        "GEMINI_API_KEY environment variable is not configured."
    )


# Create Gemini client
client = genai.Client(
    api_key=api_key
)


# --------------------------------------------------
# Generate Text
# --------------------------------------------------

def generate_text(prompt: str) -> str:
    """
    Generate text using Google Gemini.

    Args:
        prompt: Prompt to send to Gemini.

    Returns:
        Generated text.
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
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
