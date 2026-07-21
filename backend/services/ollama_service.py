from services.gemini_service import generate_text


def generate_explanation(article, prediction):

    prompt = f"""
You are an AI Fake News Detector.

Prediction:
{prediction}

Article:
{article}

Explain in simple English why this news might be real or fake.

Keep the explanation under 5 lines.
"""

    return generate_text(prompt)