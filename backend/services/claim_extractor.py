import requests

OLLAMA_URL = "http://localhost:11434/api/generate"


def extract_claims(text: str):

    prompt = f"""
Extract only the main factual claims from the following news article.

Return ONLY a numbered list.

News:
{text}
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "llama3.2",
            "prompt": prompt,
            "stream": False
        }
    )

    result = response.json()["response"]

    claims = []

    for line in result.split("\n"):
        line = line.strip()

        if not line:
            continue

        if line[0].isdigit():
            line = line.split(".", 1)[-1].strip()

        claims.append(line)

    return claims