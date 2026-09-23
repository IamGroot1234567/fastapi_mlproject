from app.db.database import Base
from sqlalchemy import Column, Integer, String


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    phone_number = Column(String, unique=True, nullable=False)
    company_name = Column(String, nullable=True)