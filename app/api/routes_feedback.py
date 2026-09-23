from app.core.dependencies import get_current_user
from app.crud.feedback import (create_feedback, get_feedback_by_user_id)
from app.db.database import get_db
from app.models.user import User
from app.schemas import FeedbackCreate, FeedbackResponse
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter()


@router.post('/feedback', response_model=FeedbackResponse)
def submit_feedback(
        feedback: FeedbackCreate, payload=Depends(get_current_user), db: Session = Depends(get_db)
):
    username = payload.get('sub')

    user = db.query(User).filter(
        User.username == username
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail='User not found'
        )

    existing_feedback = get_feedback_by_user_id(
        db,
        user.id
    )

    if existing_feedback:
        raise HTTPException(
            status_code=409,
            detail='Feedback already submitted'
        )

    return create_feedback(
        db,
        user.id,
        feedback.message
    )
