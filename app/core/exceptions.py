from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


def register_exception_handler(app: FastAPI):

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request,
        exc: RequestValidationError
    ):
        errors = []

        for error in exc.errors():
            error = error.copy()

            if 'ctx' in error:
                error['ctx'] = {
                    key: str(value)
                    for key, value in error['ctx'].items()
                }

            errors.append(error)

        return JSONResponse(
            status_code=422,
            content={
                'detail': 'Invalid request data',
                'errors': errors
            }
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(
        request: Request,
        exc: Exception
    ):
        return JSONResponse(
            status_code=500,
            content={
                'detail': 'Internal Server Error'
            }
        )