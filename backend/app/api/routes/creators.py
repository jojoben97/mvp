from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from app.api.deps import get_current_user
from app.models.creators import CreatorDashboardResponse, CreatorMission
from app.services import creators as creator_services


class MissionSubmitRequest(BaseModel):
    deliverable_url: str


router = APIRouter()


@router.get("/me/dashboard", response_model=CreatorDashboardResponse)
async def get_dashboard(current_user: str = Depends(get_current_user)) -> CreatorDashboardResponse:
    """Return missions, earnings, and AI suggestions for the creator."""
    return creator_services.get_dashboard(creator_id=current_user)


@router.post(
    "/me/missions/{mission_id}/deliverable",
    response_model=CreatorMission,
    status_code=status.HTTP_202_ACCEPTED,
)
async def submit_mission_deliverable(
    mission_id: str,
    payload: MissionSubmitRequest,
    current_user: str = Depends(get_current_user),
) -> CreatorMission:
    """Submit deliverable URL for an assigned mission."""
    mission = creator_services.submit_mission(
        creator_id=current_user,
        mission_id=mission_id,
        deliverable_url=payload.deliverable_url,
    )
    if not mission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mission not found for current user",
        )
    return mission
