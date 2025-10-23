from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_current_user
from app.models.campaigns import (
    CampaignCreateRequest,
    CampaignDetail,
    CampaignListResponse,
)
from app.services import campaigns as campaign_services

router = APIRouter()


@router.get("/", response_model=CampaignListResponse)
async def list_campaigns(
    _: str = Depends(get_current_user),
) -> CampaignListResponse:
    """Return campaigns available to the current sponsor."""
    return campaign_services.list_campaigns()


@router.post(
    "/", response_model=CampaignDetail, status_code=status.HTTP_201_CREATED
)
async def create_campaign(
    payload: CampaignCreateRequest,
    sponsor_id: str = Depends(get_current_user),
) -> CampaignDetail:
    """Create a new campaign draft."""
    campaign = campaign_services.create_campaign(payload)
    campaign.sponsor_id = sponsor_id
    return campaign


@router.get("/{campaign_id}", response_model=CampaignDetail)
async def get_campaign(
    campaign_id: str, _: str = Depends(get_current_user)
) -> CampaignDetail:
    """Fetch campaign detail."""
    campaign = campaign_services.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found",
        )
    return campaign
