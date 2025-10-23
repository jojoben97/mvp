from datetime import datetime, timedelta
from typing import Dict, List

from app.models.streams import (
    StreamCreateRequest,
    StreamDetail,
    StreamHealthMetric,
    StreamListResponse,
    StreamStatus,
)

_STREAMS: Dict[str, StreamDetail] = {
    "str_001": StreamDetail(
        id="str_001",
        creator_id="creator_001",
        campaign_id="cmp_001",
        platform="tiktok",
        status=StreamStatus.COMPLETED,
        ingest_url="rtmp://stream.viralengine.dev/live",
        stream_key="demo-key",
        started_at=datetime.utcnow() - timedelta(hours=2),
        ended_at=datetime.utcnow() - timedelta(hours=1, minutes=10),
        vod_url="s3://viralengine/streams/str_001.mp4",
        health_metrics=[
            StreamHealthMetric(
                timestamp=datetime.utcnow() - timedelta(hours=1, minutes=40),
                bitrate_kbps=4200,
                viewers=1200,
                latency_ms=180,
            )
        ],
        ai_highlights=["hl_001", "hl_002"],
    )
}


def register_stream(creator_id: str, payload: StreamCreateRequest) -> StreamDetail:
    stream_id = f"str_{len(_STREAMS) + 1:03d}"
    detail = StreamDetail(
        id=stream_id,
        creator_id=creator_id,
        campaign_id=payload.campaign_id,
        platform=payload.platform,
        status=StreamStatus.SCHEDULED,
        ingest_url="rtmps://ingest.mvpx.live/app",
        stream_key=f"{stream_id}_key",
        started_at=None,
        ended_at=None,
        health_metrics=[],
        ai_highlights=[],
    )
    _STREAMS[stream_id] = detail
    return detail


def list_streams(creator_id: str | None = None) -> StreamListResponse:
    items: List[StreamDetail] = list(_STREAMS.values())
    if creator_id:
        items = [stream for stream in items if stream.creator_id == creator_id]
    return StreamListResponse(items=items, total=len(items))


def mark_stream_complete(stream_id: str) -> StreamDetail | None:
    stream = _STREAMS.get(stream_id)
    if not stream:
        return None
    stream.status = StreamStatus.COMPLETED
    stream.ended_at = datetime.utcnow()
    stream.ai_highlights = ["hl_demo_15s", "hl_demo_30s"]
    return stream
