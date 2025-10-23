from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


class StreamStatus(str, Enum):
    SCHEDULED = "scheduled"
    LIVE = "live"
    COMPLETED = "completed"
    FAILED = "failed"
    PROCESSING = "processing"


class StreamHealthMetric(BaseModel):
    timestamp: datetime
    bitrate_kbps: Optional[float] = None
    viewers: Optional[int] = None
    latency_ms: Optional[int] = None


class StreamDetail(BaseModel):
    id: str
    creator_id: str
    campaign_id: Optional[str] = None
    platform: str
    status: StreamStatus
    ingest_url: Optional[str] = None
    stream_key: Optional[str] = None
    started_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None
    vod_url: Optional[str] = None
    health_metrics: List[StreamHealthMetric] = Field(default_factory=list)
    ai_highlights: List[str] = Field(default_factory=list)


class StreamCreateRequest(BaseModel):
    campaign_id: Optional[str]
    platform: str
    preferred_protocol: str = Field(default="rtmp")


class StreamListResponse(BaseModel):
    items: List[StreamDetail]
    total: int
