from multiprocessing.managers import all_methods

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from app.api import routes_auth, routes_predict, routes_feedback
from app.middleware.logging_middleware import LoggingMiddleware
from app.core.exceptions import register_exception_handler
from app.models import user, feedback
from app.db.database import Base, engine

app = FastAPI(title='Car Price Prediction API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

Base.metadata.create_all(bind=engine)


# link middleware
app.add_middleware(LoggingMiddleware)

# link endpoints
app.include_router(routes_auth.router, tags=['Auth'])
app.include_router(routes_predict.router, tags=['Prediction'])
app.include_router(routes_feedback.router, tags=['Feedback'])

# monitoring using Prometheus
Instrumentator().instrument(app).expose(app)

# add exception handler
register_exception_handler(app)