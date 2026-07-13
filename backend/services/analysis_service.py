from datetime import datetime

from database import SessionLocal
from models.analysis import Analysis


def save_analysis(user_id, text, result):

    print("=" * 50)
    print("Saving Analysis")
    print("User ID:", user_id)
    print("News:", text[:50])
    print("=" * 50)

    db = SessionLocal()

    analysis = Analysis(
        user_id=user_id,
        news=text,
        prediction=result["prediction"],
        confidence=result["confidence"],
        explanation=result["explanation"],
        created_at=datetime.now().strftime("%d-%m-%Y %H:%M")
    )

    db.add(analysis)
    db.commit()

    print("Analysis Saved Successfully!")

    db.close()


def get_user_analysis_history(user_id):

    db = SessionLocal()

    analyses = (
        db.query(Analysis)
        .filter(Analysis.user_id == user_id)
        .order_by(Analysis.id.desc())
        .all()
    )

    print("History requested for user:", user_id)
    print("Records found:", len(analyses))

    history = []

    for item in analyses:
        history.append({
            "id": item.id,
            "news": item.news,
            "prediction": item.prediction,
            "confidence": item.confidence,
            "explanation": item.explanation,
            "created_at": item.created_at
        })

    db.close()

    return history


# 👇 ADD THIS FUNCTION AT THE END
def delete_analysis(user_id, analysis_id):

    db = SessionLocal()

    analysis = (
        db.query(Analysis)
        .filter(
            Analysis.id == analysis_id,
            Analysis.user_id == user_id
        )
        .first()
    )

    if not analysis:
        db.close()
        return False

    db.delete(analysis)
    db.commit()
    db.close()

    return True