from transformers import pipeline

classifier = None

def get_classifier():
    global classifier

    if classifier is None:
        print("Loading DistilBERT...")
        classifier = pipeline(
            "text-classification",
            model="distilbert-base-uncased-finetuned-sst-2-english"
        )
        print("DistilBERT Loaded!")

    return classifier


def predict_news(text: str):
    model = get_classifier()

    result = model(text[:512])[0]

    label = result["label"]
    score = result["score"]

    prediction = (
        "Likely Real"
        if label == "POSITIVE"
        else "Likely Fake"
    )

    return {
        "prediction": prediction,
        "confidence": round(score * 100, 2),
    }