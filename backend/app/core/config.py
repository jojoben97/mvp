from functools import lru_cache
from pydantic import BaseModel, Field


class Settings(BaseModel):
    """Application configuration."""

    project_name: str = Field(default="Viral Engine API")
    version: str = Field(default="0.1.0")
    api_prefix: str = Field(default="/api")
    environment: str = Field(default="development")
    debug: bool = Field(default=True)


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return cached settings instance."""
    return Settings()


settings = get_settings()
