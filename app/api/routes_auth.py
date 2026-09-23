from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.cache.redis_cache import redis_client
from app.core.dependencies import get_current_user
from app.core.security import create_token, verify_password, verify_token
from app.crud.user import (
    create_user,
    get_user_by_phone,
    get_user_by_username
)
from app.db.database import get_db
from app.schemas import (
    AuthInput,
    RegisterInput,
    TokenResponse,
    UserResponse,
    MessageResponse
)

router = APIRouter()
bearer_scheme = HTTPBearer()


@router.post('/login', response_model=TokenResponse)
def login(
        auth: AuthInput,
        db: Session = Depends(get_db)
):
    user = get_user_by_username(db, auth.username)

    if not user:
        raise HTTPException(
            status_code=401,
            detail='Invalid Credentials'
        )

    if not verify_password(auth.password, user.password):
        raise HTTPException(
            status_code=401,
            detail='Invalid Credentials'
        )

    token = create_token({
        'sub': user.username
    })

    return {
        'access_token': token,
        'token_type': 'bearer'
    }


@router.post('/logout', response_model=MessageResponse)
def logout(
        credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)
):
    token = credentials.credentials

    payload = verify_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail='Invalid JWT Token'
        )

    jti = payload.get('jti')
    exp = payload.get('exp')

    remaining_seconds = int(
        exp - datetime.now(timezone.utc).timestamp()
    )

    if remaining_seconds > 0:
        redis_client.setex(
            f'revoked:{jti}',
            remaining_seconds,
            '1'
        )

    return {
        'message': 'Logged out successfully'
    }


@router.post('/register', response_model=UserResponse)
def register(
        auth: RegisterInput,
        db: Session = Depends(get_db)
):
    existing_user = get_user_by_username(
        db,
        auth.username
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail='Username already exists. Please choose another.'
        )

    existing_phone = get_user_by_phone(
        db,
        auth.phone_number
    )

    if existing_phone:
        raise HTTPException(
            status_code=409,
            detail='Phone number already registered.'
        )

    try:
        user = create_user(
            db=db,
            username=auth.username,
            password=auth.password,
            phone_number=auth.phone_number,
            company_name=auth.company_name
        )

    except IntegrityError:
        raise HTTPException(
            status_code=409,
            detail='Username or phone number already exists'
        )

    return user

@router.get('/me', response_model=UserResponse)
def get_me(payload=Depends(get_current_user), db: Session = Depends(get_db)):
    username = payload.get('sub')

    user = get_user_by_username(db, username)

    if not user:
        raise HTTPException(
            status_code=404,
            detail='User not found'
        )

    return user