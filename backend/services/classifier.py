from transformers import pipeline

_classifier = None


def get_classifier():
    global _classifier

    if _classifier is None:
        _classifier = pipeline(
            "text-classification",
            model="distilbert-base-uncased-finetuned-sst-2-english"
        )

    return _classifier


def predict_news(text: str):
    classifier = get_classifier()

    result = classifier(text[:512])[0]

    label = result["label"]
    score = result["score"]

    prediction = "Likely Real" if label == "POSITIVE" else "Likely Fake"

    return {
        "prediction": prediction,
        "confidence": round(score * 100, 2)
    }