from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.wallet import WalletPayoutRequest, WalletSummary
from app.services import wallet as wallet_service

router = APIRouter()


@router.get("/me", response_model=WalletSummary)
async def get_wallet(current_user: str = Depends(get_current_user)) -> WalletSummary:
    """Return wallet summary for current user."""
    return wallet_service.get_wallet_summary(user_id=current_user)


@router.post("/me/payouts")
async def request_payout(
    payload: WalletPayoutRequest, current_user: str = Depends(get_current_user)
) -> dict[str, str]:
    """Request payout (pending approval flow)."""
    return wallet_service.request_payout(
        user_id=current_user,
        payload=payload,
    )
