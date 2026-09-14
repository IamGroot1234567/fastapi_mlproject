from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

("Any unhandled exception from any endpoint in this FastAPI application should be handled by this "
 "global exception handler.")


def register_exception_handler(app: FastAPI):
    @app.add_exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content={'detail': str(exc)}
        )
