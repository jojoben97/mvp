from fastapi import APIRouter

from app.api.routes import admin, campaigns, creators, streams, wallet

api_router = APIRouter()

api_router.include_router(
    campaigns.router, prefix="/campaigns", tags=["campaigns"]
)
api_router.include_router(creators.router, prefix="/creators", tags=["creators"])
api_router.include_router(streams.router, prefix="/streams", tags=["streams"])
api_router.include_router(wallet.router, prefix="/wallets", tags=["wallets"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
