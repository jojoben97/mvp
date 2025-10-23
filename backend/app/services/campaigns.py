from datetime import datetime, timedelta
from typing import List

from app.models.campaigns import (
    CampaignCreateRequest,
    CampaignDetail,
    CampaignListResponse,
    CampaignStatus,
    CampaignSummary,
    CampaignType,
    KPITarget,
    MissionTemplate,
)

_FAKE_CAMPAIGNS: List[CampaignDetail] = [
    CampaignDetail(
        id="cmp_001",
        name="Galaxy S24 Launch",
        type=CampaignType.SHORT_VIDEO,
        sponsor_id="sponsor_acme",
        budget_vcoin=5000,
        status=CampaignStatus.ACTIVE,
        start_at=datetime.utcnow() - timedelta(days=3),
        end_at=datetime.utcnow() + timedelta(days=27),
        description="Launch challenge for new Galaxy device.",
        kpis=[
            KPITarget(name="impressions", value=1_000_000, unit="views"),
            KPITarget(name="ugc_posts", value=500, unit="count"),
        ],
        missions=[
            MissionTemplate(
                id="msn_001",
                title="Unboxing Short",
                mission_type="short_video",
                reward_vcoin=150,
                requirements={"duration_seconds": 60, "hashtags": ["#GalaxyLaunch"]},
            )
        ],
        metrics={"impressions": 325000, "ugc_posts": 132},
    )
]


def list_campaigns() -> CampaignListResponse:
    summaries = [
        CampaignSummary(
            id=c.id,
            name=c.name,
            type=c.type,
            sponsor_id=c.sponsor_id,
            budget_vcoin=c.budget_vcoin,
            status=c.status,
            start_at=c.start_at,
            end_at=c.end_at,
        )
        for c in _FAKE_CAMPAIGNS
    ]
    return CampaignListResponse(items=summaries, total=len(summaries))


def create_campaign(payload: CampaignCreateRequest) -> CampaignDetail:
    campaign_id = f"cmp_{len(_FAKE_CAMPAIGNS) + 1:03d}"
    detail = CampaignDetail(
        id=campaign_id,
        name=payload.name,
        type=payload.type,
        sponsor_id="sponsor_demo",
        budget_vcoin=payload.budget_vcoin,
        status=CampaignStatus.DRAFT,
        start_at=payload.start_at,
        end_at=payload.end_at,
        description=payload.description,
        kpis=payload.target_kpis,
        missions=payload.missions,
        metrics={},
    )
    _FAKE_CAMPAIGNS.append(detail)
    return detail


def get_campaign(campaign_id: str) -> CampaignDetail | None:
    return next((c for c in _FAKE_CAMPAIGNS if c.id == campaign_id), None)
