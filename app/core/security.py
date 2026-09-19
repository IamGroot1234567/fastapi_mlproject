from datetime import datetime, timedelta, timezone
from uuid import uuid4

from jose import JWTError, jwt

from app.core.config import settings
from app.cache.redis_cache import redis_client

def create_token(data: dict, expiry_minutes=30):
    to_encode=data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=expiry_minutes)

    to_encode.update(
        {
            'exp': expire,
            'jti': str(uuid4())
        }
    )

    token = jwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )

    return token

def verify_token(token:str):
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            settings.JWT_ALGORITHM
        )

        jti = payload.get('jti')

        if redis_client.get(f'revoked:{jti}'):
            return None

        return payload

    except JWTError:
        return None