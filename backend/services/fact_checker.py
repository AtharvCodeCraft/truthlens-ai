from services.gemini_service import generate_text


def fact_check(claims):

    results = []

    for claim in claims:

        prompt = f"""
You are an AI fact checker.

Analyze this claim:

{claim}

Return ONLY in this format:

Status: Verified / Unverified / Misleading

Reason: One or two sentences.
"""

        answer = generate_text(prompt)

        results.append({
            "claim": claim,
            "analysis": answer
        })

    return results