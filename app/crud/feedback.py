from app.models.feedback import Feedback
from sqlalchemy.orm import Session


def get_feedback_by_user_id(db: Session, user_id: int):
    return db.query(Feedback).filter(Feedback.user_id == user_id).first()


def create_feedback(db: Session, user_id: int, message: str):
    feedback = Feedback(user_id=user_id, message=message)

    db.add(feedback)
    db.commit()
    db.refresh(feedback)

    return feedback
