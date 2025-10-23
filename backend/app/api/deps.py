from fastapi import Depends, Header, HTTPException, status


async def get_current_user(
    x_mock_user_id: str | None = Header(default=None, alias="X-Mock-User-Id")
) -> str:
    """
    Temporary auth dependency.

    In lieu of full authentication, supply `X-Mock-User-Id` header.
    """
    if not x_mock_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing X-Mock-User-Id header; replace with real auth later.",
        )
    return x_mock_user_id
