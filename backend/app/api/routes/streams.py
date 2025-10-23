from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.api.deps import get_current_user
from app.models.streams import (
    StreamCreateRequest,
    StreamDetail,
    StreamListResponse,
)
from app.services import streams as stream_services

router = APIRouter()


@router.get("/", response_model=StreamListResponse)
async def list_streams(
    creator_id: str | None = Query(default=None),
    _: str = Depends(get_current_user),
) -> StreamListResponse:
    """List streams filtered by creator if provided."""
    return stream_services.list_streams(creator_id=creator_id)


@router.post("/", response_model=StreamDetail, status_code=status.HTTP_201_CREATED)
async def register_stream(
    payload: StreamCreateRequest,
    current_user: str = Depends(get_current_user),
) -> StreamDetail:
    """Register a stream and return ingest credentials."""
    return stream_services.register_stream(
        creator_id=current_user, payload=payload
    )


@router.post("/{stream_id}/complete", response_model=StreamDetail)
async def complete_stream(
    stream_id: str, _: str = Depends(get_current_user)
) -> StreamDetail:
    """Mark a stream as completed and trigger post-processing."""
    stream = stream_services.mark_stream_complete(stream_id)
    if not stream:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Stream not found",
        )
    return stream
