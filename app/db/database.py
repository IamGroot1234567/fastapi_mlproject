from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine, text

from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

with engine.connect() as connection:
    result = connection.execute(text("SELECT 1"))
    print("Database connected:", result.scalar())

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


