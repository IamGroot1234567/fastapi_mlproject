from app.db.database import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func


class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False,
        index=True
    )

    message = Column(
        String(49),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
