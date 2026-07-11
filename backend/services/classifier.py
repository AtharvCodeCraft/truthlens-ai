from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

def predict_news(text: str):

    result = classifier(text[:512])[0]

    label = result["label"]
    score = result["score"]

    prediction = "Likely Real" if label == "POSITIVE" else "Likely Fake"

    return {
        "prediction": prediction,
        "confidence": round(score * 100, 2)
    }