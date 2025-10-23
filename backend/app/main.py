from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings


def create_application() -> FastAPI:
    """FastAPI app factory."""
    application = FastAPI(
        title=settings.project_name,
        version=settings.version,
        debug=settings.debug,
        openapi_url=f"{settings.api_prefix}/openapi.json",
        docs_url=f"{settings.api_prefix}/docs",
        redoc_url=f"{settings.api_prefix}/redoc",
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # TODO: narrow per environment
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    )

    application.include_router(api_router, prefix=settings.api_prefix)

    @application.get("/health", tags=["meta"])
    async def healthcheck() -> dict[str, str]:
        return {"status": "ok", "service": settings.project_name}

    return application


app = create_application()
