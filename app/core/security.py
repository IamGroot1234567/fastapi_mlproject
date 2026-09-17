from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt

from app.core.config import settings


def create_token(data: dict, expire_minutes=30):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expire_minutes)
    to_encode.update({'exp': expire})
    token = jwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )
    return token


def verify_token(token: str):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)
        return payload
    except JWTError:
        return None
