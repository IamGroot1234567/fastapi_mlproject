import re
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class AuthInput(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    phone_number: str
    company_name: str | None = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'


class PredictionResponse(BaseModel):
    predicted_price: float


class MessageResponse(BaseModel):
    message: str


class FeedbackCreate(BaseModel):
    message: str = Field(
        ...,
        min_length=6,
        max_length=49
    )


class FeedbackResponse(BaseModel):
    id: int
    user_id: int
    message: str
    created_at: datetime


class RegisterInput(BaseModel):
    username: str
    password: str
    phone_number: str
    company_name: str | None = None

    @field_validator('username')
    @classmethod
    def validate_username(cls, username: str):

        if len(username) < 3:
            raise ValueError(
                'Username must be at least 3 characters long'
            )

        if len(username) > 20:
            raise ValueError(
                'Username must not exceed 20 characters'
            )

        if not re.fullmatch(r'[A-Za-z0-9_]+', username):
            raise ValueError(
                'Username can contain only letters, numbers, and underscore'
            )

        return username

    @field_validator('password')
    @classmethod
    def validate_password(cls, password: str):

        if len(password) < 7:
            raise ValueError(
                'Password must be at least 7 characters long'
            )

        if not any(char.isdigit() for char in password):
            raise ValueError(
                'Password must contain at least one number'
            )

        if not any(not char.isalnum() for char in password):
            raise ValueError(
                'Password must contain at least one symbol'
            )

        return password
