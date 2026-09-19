from app.cache.redis_cache import redis_client
from app.core.security import create_token, verify_token
from fastapi import APIRouter, Header
from pydantic import BaseModel

router = APIRouter()


class AuthInput(BaseModel):
    username: str
    password: str


@router.post('/login')
def login(auth: AuthInput):
    if auth.username == 'admin' and auth.password == 'admin':
        token = create_token({'sub': auth.username})
        return {'access_token': token}

    return {'error': 'Invalid Credentials'}


@router.post('/logout')
def logout(token: str = Header(...)):
    payload = verify_token(token)

    if not payload:
        return {'error': 'Invalid token'}

    jti = payload.get('jti')

    redis_client.setex(
        f'revoked:{jti}',
        1800,
        '1'
    )

    return {'message': 'Logged out successfully'}
