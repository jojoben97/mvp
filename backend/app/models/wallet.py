from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


class TransactionType(str, Enum):
    CREDIT = "credit"
    DEBIT = "debit"
    ESCROW_LOCK = "escrow_lock"
    ESCROW_RELEASE = "escrow_release"


class TransactionRecord(BaseModel):
    id: str
    type: TransactionType
    amount_vcoin: float
    balance_after_vcoin: float
    reference_type: Optional[str] = None
    reference_id: Optional[str] = None
    created_at: datetime
    metadata: dict = Field(default_factory=dict)


class WalletSummary(BaseModel):
    account_id: str
    user_id: str
    balance_vcoin: float
    escrow_balance_vcoin: float
    transactions: List[TransactionRecord] = Field(default_factory=list)


class WalletPayoutRequest(BaseModel):
    amount_vcoin: float
    external_account_id: Optional[str] = None
    notes: Optional[str] = None
