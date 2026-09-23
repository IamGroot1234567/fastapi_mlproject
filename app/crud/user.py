from sqlalchemy.orm import Session
from app.core.security import hash_password
from app.models.user import User
from sqlalchemy.exc import IntegrityError


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(
        User.username == username
    ).first()


def get_user_by_phone(db: Session, phone_number: str):
    return db.query(User).filter(
        User.phone_number == phone_number
    ).first()

def create_user(
    db: Session,
    username: str,
    password: str,
    phone_number: str,
    company_name: str | None = None
):
    user = User(
        username=username,
        password=hash_password(password),
        phone_number=phone_number,
        company_name=company_name
    )

    try:
        db.add(user)
        db.commit()
        db.refresh(user)
    except IntegrityError:
        db.rollback()
        raise

    return user