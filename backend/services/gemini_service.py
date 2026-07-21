import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

print("Current Working Directory:", os.getcwd())
print("GEMINI_API_KEY exists:", "GEMINI_API_KEY" in os.environ)
print("GEMINI_API_KEY value:", os.getenv("GEMINI_API_KEY"))

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables.")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_text(prompt: str) -> str:
    response = model.generate_content(prompt)
    return response.text.strip()