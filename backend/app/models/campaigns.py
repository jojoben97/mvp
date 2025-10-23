from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class CampaignType(str, Enum):
    SHORT_VIDEO = "short_video"
    LIVESTREAM = "livestream"
    HYBRID = "hybrid"


class CampaignStatus(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    COMPLETED = "completed"
    ARCHIVED = "archived"


class KPITarget(BaseModel):
    name: str
    value: float
    unit: str = Field(default="count")


class CampaignSummary(BaseModel):
    id: str
    name: str
    type: CampaignType
    sponsor_id: str
    budget_vcoin: float
    status: CampaignStatus
    start_at: Optional[datetime] = None
    end_at: Optional[datetime] = None


class MissionTemplate(BaseModel):
    id: str
    title: str
    mission_type: str
    reward_vcoin: float
    requirements: Dict[str, Any]


class CampaignDetail(CampaignSummary):
    description: Optional[str] = None
    kpis: List[KPITarget] = Field(default_factory=list)
    missions: List[MissionTemplate] = Field(default_factory=list)
    metrics: Dict[str, Any] = Field(default_factory=dict)


class CampaignCreateRequest(BaseModel):
    name: str
    type: CampaignType
    description: Optional[str] = None
    budget_vcoin: float
    start_at: Optional[datetime] = None
    end_at: Optional[datetime] = None
    target_kpis: List[KPITarget] = Field(default_factory=list)
    missions: List[MissionTemplate] = Field(default_factory=list)


class CampaignListResponse(BaseModel):
    items: List[CampaignSummary]
    total: int
