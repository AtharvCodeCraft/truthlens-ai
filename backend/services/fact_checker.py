
import json

from services.gemini_service import generate_text


def fact_check(claims: list[str]) -> list[dict]:
    """
    Fact-check multiple claims using a single Gemini request.

    Note:
    Gemini can assess whether a claim appears supported,
    unsupported, or misleading based on the information
    available to the model. This does not guarantee external
    factual verification.
    """

    if not claims:
        return []

    # Limit the number of claims processed in one request
    claims = claims[:10]

    claims_text = "\n".join(
        f"{index + 1}. {claim}"
        for index, claim in enumerate(claims)
    )

    prompt = f"""
You are an AI fact-checking assistant.

Analyze the following factual claims.

For each claim, determine whether it appears:

- Verified
- Unverified
- Misleading

Important:
- Do not invent evidence.
- Do not claim that external sources were checked.
- Base the assessment on the information available to you.
- Give a short reason.
- Return ONLY valid JSON.
- Do not use markdown code blocks.

Return exactly this JSON structure:

[
    {{
        "claim": "claim text",
        "status": "Verified",
        "reason": "Short explanation."
    }}
]

Claims:

{claims_text}
"""

    try:
        response = generate_text(prompt)

        cleaned_response = response.strip()

        # Remove accidental markdown code fences
        if cleaned_response.startswith("```"):
            cleaned_response = cleaned_response.replace(
                "```json",
                "",
                1
            )

            if cleaned_response.endswith("```"):
                cleaned_response = cleaned_response[:-3]

            cleaned_response = cleaned_response.strip()

        results = json.loads(cleaned_response)

        if not isinstance(results, list):
            raise ValueError(
                "Gemini returned an invalid fact-check format."
            )

        final_results = []

        for index, claim in enumerate(claims):

            matching_result = None

            # Try to match by claim text
            for result in results:
                if (
                    isinstance(result, dict)
                    and result.get("claim") == claim
                ):
                    matching_result = result
                    break

            if matching_result:
                status = matching_result.get(
                    "status",
                    "Unverified"
                )

                reason = matching_result.get(
                    "reason",
                    "No reason provided."
                )

            else:
                # Fallback if Gemini omitted a claim
                status = "Unverified"
                reason = "No assessment was returned."

            # Validate status
            if status not in [
                "Verified",
                "Unverified",
                "Misleading"
            ]:
                status = "Unverified"

            final_results.append({
                "claim": claim,
                "analysis": (
                    f"Status: {status}\n"
                    f"Reason: {reason}"
                )
            })

        return final_results

    except json.JSONDecodeError:
        raise RuntimeError(
            "Gemini returned an invalid fact-check response."
        )

    except Exception as e:
        raise RuntimeError(
            f"Fact checking failed: {e}"
        )
