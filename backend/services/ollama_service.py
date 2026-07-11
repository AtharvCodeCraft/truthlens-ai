import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3.2"


def generate_explanation(article, prediction):
    prompt = f"""
You are an AI Fake News Detector.

Prediction:
{prediction}

Article:
{article}

Explain in simple English why this news might be real or fake.

Keep your answer under 5 lines.
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "prompt": prompt,
            "stream": False
        }
    )

    if response.status_code == 200:
        return response.json()["response"]

    return "Unable to generate explanation."