import requests

OLLAMA_URL = "http://localhost:11434/api/generate"


def fact_check(claims):

    results = []

    for claim in claims:

        prompt = f"""
You are an AI fact checker.

Analyze this claim:

{claim}

Return ONLY this format:

Status: Verified / Unverified / Misleading

Reason: One or two sentences.
"""

        response = requests.post(
            OLLAMA_URL,
            json={
                "model": "llama3.2",
                "prompt": prompt,
                "stream": False
            }
        )

        answer = response.json()["response"]

        results.append({
            "claim": claim,
            "analysis": answer
        })

    return results