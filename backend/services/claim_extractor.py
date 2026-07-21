import re
from services.gemini_service import generate_text


def extract_claims(text: str):

    prompt = f"""
You are an AI claim extraction assistant.

Extract the important factual claims from the news article below.

Rules:
- Return only factual claims.
- One claim per line.
- Do not include explanations.
- Do not include headings.

News:
{text}
"""

    result = generate_text(prompt)

    claims = []

    for line in result.split("\n"):
        line = line.strip()

        if not line:
            continue

        # Remove numbering like:
        # 1.
        # 1)
        # -
        # *
        line = re.sub(r"^(\d+[\.\)]\s*|[-*]\s*)", "", line)

        if line:
            claims.append(line)
            
            print("Gemini Response:")
            print(result)

            print("Claims:")
            print(claims)

    return claims