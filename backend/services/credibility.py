import requests

OLLAMA_URL = "http://localhost:11434/api/generate"


def analyze_credibility(text: str):

    prompt = f"""
You are an expert journalist.

Analyze this news article.

{text}

Return ONLY this format.

Score: <0-100>

Status:
Highly Credible
Credible
Suspicious
Highly Suspicious

Reason:
Explain in 2-3 sentences considering:
- writing style
- evidence
- emotional language
- neutrality
- reliability
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "llama3.2",
            "prompt": prompt,
            "stream": False
        }
    )

    return response.json()["response"]