from fastapi import Depends, Header, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import settings
from app.core.security import verify_token

# from fastapi.security import OAuth2PasswordBearer
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login')


bearer_scheme = HTTPBearer()


def get_api_key(api_key: str = Header(...)):
    if api_key != settings.API_KEY:
        raise HTTPException(
            status_code=403,
            detail='Invalid API key'
        )


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)
):
    token = credentials.credentials

    payload = verify_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail='Invalid JWT Token'
        )

    return payload