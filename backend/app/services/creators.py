from datetime import datetime, timedelta
from typing import Dict

from app.models.creators import (
    CreatorDashboardResponse,
    CreatorMission,
    CreatorMissionStatus,
)
from app.services import campaigns as campaign_services

_CREATOR_MISSIONS: Dict[str, list[CreatorMission]] = {
    "creator_001": [
        CreatorMission(
            id="assign_001",
            campaign_id="cmp_001",
            mission=campaign_services._FAKE_CAMPAIGNS[0].missions[0],
            status=CreatorMissionStatus.IN_PROGRESS,
            due_at=datetime.utcnow() + timedelta(days=2),
        )
    ]
}


def get_dashboard(creator_id: str) -> CreatorDashboardResponse:
    missions = _CREATOR_MISSIONS.get(creator_id, [])
    ai_suggestions = [
        "Highlight battery life in the first 10 seconds.",
        "Use #GalaxyLaunch and #TechTok for higher reach.",
    ]

    return CreatorDashboardResponse(
        creator_id=creator_id,
        missions=missions,
        earnings_vcoin=640.0,
        wallet_balance_vcoin=320.0,
        ai_suggestions=ai_suggestions,
    )


def submit_mission(creator_id: str, mission_id: str, deliverable_url: str) -> CreatorMission | None:
    missions = _CREATOR_MISSIONS.setdefault(creator_id, [])
    for mission in missions:
        if mission.id == mission_id:
            mission.deliverable_url = deliverable_url
            mission.status = CreatorMissionStatus.SUBMITTED
            mission.submitted_at = datetime.utcnow()
            return mission
    return None
