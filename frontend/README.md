# Viral Engine Frontend (MVP UI)

Next.js + Tailwind dashboard that visualises the MVPX sponsor/creator workflows. It currently consumes the FastAPI mock endpoints you can run from `backend/`.

## Prerequisites

- Node.js 18 or newer (Next 14 requirement)
- Backend API running locally at `http://127.0.0.1:8000` (see backend README)

## Setup

```bash
cd frontend
npm install
npm run dev
```

Then open [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

The app defaults to the FastAPI mock headers:

- `NEXT_PUBLIC_API_BASE_URL` → `http://127.0.0.1:8000/api`
- `NEXT_PUBLIC_USER_ID` → `sponsor_demo`

To impersonate a creator perspective (for wallet/mission data), create a `.env.local` file:

```
NEXT_PUBLIC_USER_ID=creator_001
```

## Available Screens

- `/dashboard` – Sponsor control center with KPIs, AI signals, and live feed.
- `/campaigns` – Campaign wizard steps and active campaign overview.
- `/live` – Creator Live control board with ingest checklist.
- `/wallet` – V-Coin balances, escrow, and ledger.
- `/ai` – Highlight generator, trend intel, and fraud signals.

## Next Steps

1. Replace mock fetch headers with real auth tokens once auth service is ready.
2. Introduce SWR/React Query for client-side updates and optimistic UI.
3. Connect charts to live WebSocket metrics (mirroring WHOOP-style interactions).
4. Expand campaign wizard into an interactive multi-step form with validation.
