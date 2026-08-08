
import re

from services.gemini_service import generate_text


def extract_claims(text: str) -> list[str]:
    """
    Extract important factual claims from a news article
    using Gemini.
    """

    if not text or not text.strip():
        return []

    # Limit the input size to avoid unnecessarily large API requests
    news_text = text.strip()[:6000]

    prompt = f"""
You are an AI claim extraction assistant.

Extract the important factual claims from the following news article.

Rules:
- Return only factual claims.
- Return one claim per line.
- Do not include explanations.
- Do not include headings.
- Do not number the claims.
- Avoid opinions and speculation.
- Do not invent information.

News article:
{news_text}
"""

    try:
        result = generate_text(prompt)

        claims = []

        for line in result.splitlines():
            line = line.strip()

            if not line:
                continue

            # Remove common numbering/bullet formats:
            # 1.
            # 1)
            # -
            # *
            # â€¢
            line = re.sub(
                r"^(\d+[\.\)]\s*|[-*â€¢]\s*)",
                "",
                line
            ).strip()

            if line:
                claims.append(line)

        # Remove duplicate claims while preserving order
        unique_claims = list(dict.fromkeys(claims))

        return unique_claims

    except Exception as e:
        raise RuntimeError(
            f"Claim extraction failed: {e}"
        )
