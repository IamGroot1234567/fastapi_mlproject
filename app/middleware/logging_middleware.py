import logging
import time

from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

class LoggingMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:

        start_time = time.time()

        client = request.client

        if client:
            client_host = client.host
            client_port = client.port
        else:
            client_host = "unknown"
            client_port = "unknown"


        logging.info(f'Request: {request.method} {request.url} | Client: {client_host}:{client_port}')

        response = await call_next(request)

        process_time = time.time() - start_time

        logging.info(
            f'Response: {response.status_code} | Time: {process_time:.4f}'
        )

        return response