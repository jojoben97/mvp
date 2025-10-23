from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field

from app.models.campaigns import MissionTemplate


class CreatorMissionStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    SUBMITTED = "submitted"
    APPROVED = "approved"
    REJECTED = "rejected"


class CreatorMission(BaseModel):
    id: str
    campaign_id: str
    mission: MissionTemplate
    status: CreatorMissionStatus = CreatorMissionStatus.PENDING
    due_at: Optional[datetime] = None
    submitted_at: Optional[datetime] = None
    deliverable_url: Optional[str] = None
    ai_highlight_ids: List[str] = Field(default_factory=list)


class CreatorDashboardResponse(BaseModel):
    creator_id: str
    missions: List[CreatorMission] = Field(default_factory=list)
    earnings_vcoin: float = 0.0
    wallet_balance_vcoin: float = 0.0
    ai_suggestions: List[str] = Field(default_factory=list)
