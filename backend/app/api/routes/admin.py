from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.services import admin as admin_service

router = APIRouter()


@router.get("/fraud")
async def list_fraud_flags(_: str = Depends(get_current_user)):
    """Return fraud flags requiring review."""
    return admin_service.list_fraud_flags()
