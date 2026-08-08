
from datetime import datetime

from database import SessionLocal
from models.analysis import Analysis


# --------------------------------------------------
# Save Analysis
# --------------------------------------------------

def save_analysis(user_id, text, result):
    """
    Save a news analysis for the authenticated user.
    """

    db = SessionLocal()

    try:
        analysis = Analysis(
            user_id=user_id,
            news=text,
            prediction=result["prediction"],
            confidence=result["confidence"],
            explanation=result["explanation"],
            created_at=datetime.now().strftime(
                "%d-%m-%Y %H:%M"
            )
        )

        db.add(analysis)
        db.commit()
        db.refresh(analysis)

        return analysis

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


# --------------------------------------------------
# Get User Analysis History
# --------------------------------------------------

def get_user_analysis_history(user_id):
    """
    Return analysis history belonging only to the specified user.
    """

    db = SessionLocal()

    try:
        analyses = (
            db.query(Analysis)
            .filter(
                Analysis.user_id == user_id
            )
            .order_by(
                Analysis.id.desc()
            )
            .all()
        )

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

        return history

    finally:
        db.close()


# --------------------------------------------------
# Delete Analysis
# --------------------------------------------------

def delete_analysis(user_id, analysis_id):
    """
    Delete an analysis only if it belongs to the
    authenticated user.
    """

    db = SessionLocal()

    try:
        analysis = (
            db.query(Analysis)
            .filter(
                Analysis.id == analysis_id,
                Analysis.user_id == user_id
            )
            .first()
        )

        if not analysis:
            return False

        db.delete(analysis)
        db.commit()

        return True

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()
