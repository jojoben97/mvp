from datetime import datetime, timedelta
from typing import List

from pydantic import BaseModel


class FraudFlag(BaseModel):
    id: str
    source_type: str
    source_id: str
    score: float
    reasons: List[str]
    detected_at: datetime
    status: str = "pending_review"


def list_fraud_flags() -> list[FraudFlag]:
    now = datetime.utcnow()
    return [
        FraudFlag(
            id="flag_001",
            source_type="campaign",
            source_id="cmp_001",
            score=0.82,
            reasons=[
                "Suspicious velocity in follower growth",
                "High variance in watch_time across regions",
            ],
            detected_at=now - timedelta(hours=3),
        )
    ]
