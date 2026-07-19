def generate_explanation(article, prediction):

    if prediction == "Likely Real":
        return (
            "The language appears neutral and factual. "
            "No obvious sensational or misleading phrases were detected. "
            "However, this is an AI prediction and should be verified with trusted news sources."
        )

    return (
        "The language contains characteristics that may indicate misinformation "
        "or sensational reporting. This prediction should be verified with reliable sources."
    )