from datetime import datetime, timedelta

from app.models.wallet import (
    TransactionRecord,
    TransactionType,
    WalletPayoutRequest,
    WalletSummary,
)


def _fake_transactions(user_id: str) -> list[TransactionRecord]:
    now = datetime.utcnow()
    return [
        TransactionRecord(
            id="txn_001",
            type=TransactionType.CREDIT,
            amount_vcoin=500.0,
            balance_after_vcoin=500.0,
            reference_type="campaign",
            reference_id="cmp_001",
            created_at=now - timedelta(days=2),
            metadata={"note": "Galaxy Launch bonus"},
        ),
        TransactionRecord(
            id="txn_002",
            type=TransactionType.ESCROW_LOCK,
            amount_vcoin=200.0,
            balance_after_vcoin=300.0,
            reference_type="escrow",
            reference_id="escrow_001",
            created_at=now - timedelta(days=1),
            metadata={"note": "Pending payout"},
        ),
    ]


def get_wallet_summary(user_id: str) -> WalletSummary:
    transactions = _fake_transactions(user_id)
    latest_balance = transactions[-1].balance_after_vcoin if transactions else 0.0
    escrow_balance = 200.0 if transactions else 0.0

    return WalletSummary(
        account_id="wallet_001",
        user_id=user_id,
        balance_vcoin=latest_balance,
        escrow_balance_vcoin=escrow_balance,
        transactions=transactions,
    )


def request_payout(user_id: str, payload: WalletPayoutRequest) -> dict[str, str]:
    return {
        "status": "pending",
        "request_id": "payout_001",
        "user_id": user_id,
        "amount_vcoin": f"{payload.amount_vcoin:.2f}",
    }
