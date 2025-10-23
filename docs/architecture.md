# Viral Engine (MVPX) - Engineering Blueprint

## 1. Platform Overview

Viral Engine orchestrates campaigns between sponsors, creators, and communities. The MVP launches as a hybrid web platform delivering dashboards, campaign management, creator live tooling, and V-Coin wallet flows. Phase 2 expands AI automation; Phase 3 introduces native mobile experiences.

```
Clients (Next.js Web, future mobile)
        |
        v
 API Gateway (NestJS or FastAPI)
        |
+---------------+-------------+------------+
| Campaign Svc  | Creator Svc | Wallet Svc | ... (microservices)
+---------------+-------------+------------+
        |
 Event Bus (Kafka or NATS) --> Analytics & AI Workers
        |
 PostgreSQL | ClickHouse | Redis | S3 | Stripe | Social APIs | Mux
```

## 2. High-Level Components

- **Web App (Phase 1)** - Next.js + Tailwind for sponsor and creator portals with WHOOP-style analytics. Consumes backend REST/WebSocket APIs.
- **API Layer** - NestJS (recommended) or FastAPI service exposing REST and streaming interfaces. Hosts domain modules (campaigns, users, wallets, streams, AI integrations).
- **Real-time Ingest** - RTMP/WebRTC via managed service (for example Mux or Ant Media). Stream metadata posted back through webhooks.
- **AI and Automation** - Worker services running Whisper for ASR, CLIP/OpenAI for highlight scoring, GPT for captions/trends, and fraud models. Managed via task queue (Celery or BullMQ) fed by event bus.
- **Data Stores**:
  - PostgreSQL - relational source of truth for users, campaigns, wallets, missions.
  - ClickHouse - analytical store for engagement metrics and fraud scoring features.
  - Redis - session cache, websocket presence, rate limits.
  - S3 (or compatible) - stream recordings, highlight clips, asset storage.
- **Payments** - Stripe Connect for fiat to V-Coin; wallet service manages ledger and escrow.

## 3. Service Breakdown

| Service        | Responsibilities                                                                 | Integrations                            |
| -------------- | -------------------------------------------------------------------------------- | --------------------------------------- |
| Gateway/API    | AuthN/Z, session management, REST/GraphQL, WebSocket notifications                | Auth0/Cognito, Redis, PostgreSQL        |
| Campaign Svc   | Campaign wizard, missions, KPI tracking, invitations                              | PostgreSQL, ClickHouse                  |
| Creator Svc    | Task lifecycle, content submissions, stream linkage, level/XP system              | PostgreSQL, S3, AI workers              |
| Wallet Svc     | V-Coin ledger, escrow, payouts, fiat on/off ramp                                  | PostgreSQL (ledger tables), Stripe      |
| Stream Svc     | RTMP/WebRTC ingest metadata, health metrics, VOD references                       | Mux/Ant Media, Redis, PostgreSQL, S3    |
| AI Worker Pool | Transcription, highlight generation, captioning, fraud scoring                    | Whisper, OpenAI, S3, ClickHouse         |
| Admin Svc      | Moderation, fraud flag review, payout approvals                                   | PostgreSQL, ClickHouse                  |

Services communicate via asynchronous events (for example `campaign.created`, `stream.processed`, `highlight.ready`). Kafka or NATS enables fan-out to analytics, notifications, and audit logging.

## 4. Data Model (Initial)

### Core Tables
- `users` (id, role, auth_provider_id, profile_metadata, verification_state)
- `campaigns` (id, sponsor_id, type, title, description, kpi_config JSONB, budget_vcoin, status, start_at, end_at)
- `campaign_missions` (id, campaign_id, mission_type, requirements JSONB, reward_vcoin, status)
- `creator_assignments` (id, campaign_id, creator_id, mission_id, assignment_status, deliverable_url, metrics JSONB)
- `streams` (id, creator_id, campaign_id, platform, ingest_url, mux_asset_id, status, started_at, ended_at, metrics JSONB)
- `ai_highlights` (id, stream_id, start_seconds, end_seconds, caption_text, s3_url, ai_score, reviewer_status)
- `wallet_accounts` (id, user_id, balance_vcoin, escrow_balance, stripe_account_id)
- `wallet_transactions` (id, account_id, type, amount_vcoin, reference_type, reference_id, status, metadata JSONB)
- `fraud_flags` (id, source_type, source_id, score, reasons JSONB, reviewer_id, resolution_status)

### Analytics (ClickHouse)
- `engagement_metrics` (campaign_id, creator_id, platform, timestamp, impressions, clicks, watch_time, conversions)
- `fraud_signals` (source_id, signal_type, value, captured_at)

## 5. API Surface (MVP)

- `POST /auth/login` - federated login, returns JWT or session cookie.
- `POST /campaigns` - create campaign (sponsor role).
- `GET /campaigns/{id}` - campaign detail with metrics.
- `POST /campaigns/{id}/missions` - define mission tasks.
- `POST /campaigns/{id}/fund` - lock V-Coin into escrow.
- `POST /missions/{id}/assign` - invite or assign creators.
- `POST /missions/{id}/deliverables` - submit content or stream link.
- `GET /creators/me/dashboard` - tasks, earnings, AI suggestions.
- `POST /streams` - register new stream session, return RTMP/WebRTC credentials.
- `POST /streams/{id}/complete` - mark stream done, trigger AI pipeline.
- `GET /wallets/me` - wallet summary and transactions.
- `POST /wallets/payout` - request payout (sponsor approval).
- `POST /ai/highlights/{streamId}/approve` - manual review of AI cuts.
- `GET /admin/fraud` - list high-risk items for review.

WebSocket topics supply live campaign metrics, stream health data, and AI processing status updates.

## 6. AI Pipeline

1. Stream complete event triggers worker job.
2. Download recording from S3 and run Whisper for transcript.
3. Extract highlight candidates using CLIP plus engagement heuristics; output segments at 15/30/60 seconds.
4. GPT caption generator produces on-brand titles and hashtags.
5. Store metadata in `ai_highlights`, upload clips to S3.
6. Notify creators and sponsors for manual review; feed anomalies into fraud scoring.

Processing SLA targets 60 minutes or better. Use autoscaling worker pool and priority queues to handle live events.

## 7. Security and Compliance

- JWT plus refresh tokens, optional SSO (OAuth). Enforce RBAC across sponsor, creator, admin roles.
- Wallet actions require audit logging and 2FA for payout approvals.
- Encrypt data at rest (S3 SSE, optional PostgreSQL TDE) and in transit (TLS).
- PDPA/GDPR obligations: consent collection, data deletion workflows, PII minimization.
- Stream ingestion via secure RTMP (TLS) or WebRTC DTLS-SRTP.

## 8. Deployment and Ops

- Environments: dev, staging, prod.
- CI/CD: GitHub Actions that build containers and deploy to Kubernetes.
- Observability: OpenTelemetry plus Prometheus metrics; Grafana dashboards for campaign metrics, stream health, AI processing times.
- Feature Flags: LaunchDarkly or custom tooling for gradual AI feature rollouts.

## 9. Phase 1 Delivery Focus (0-12 weeks)

1. Week 0-2 - Repo setup, auth and user service, design system scaffolding.
2. Week 2-6 - Campaign wizard backend and UI, wallet escrow basics, creator dashboard skeleton.
3. Week 6-9 - Stream service integration with Mux sandbox, AI pipeline stubs, analytics ingestion.
4. Week 9-12 - Sponsor analytics dashboards, fraud scoring MVP, end-to-end UAT.

## 10. Open Questions

- Final decision between NestJS vs FastAPI vs hybrid stack?
- Preferred AI service budget or provider (OpenAI vs in-house)?
- Regulatory requirements for V-Coin (e-money licensing)?
- Final RTMP provider choice (Mux, Ant Media, self-hosted)?
- Scope of community user features in Phase 1 (view-only vs incentives)?

This blueprint provides the foundation for implementation. Next steps: scaffold core services, define shared libraries, and build the critical user journeys (campaign creation, creator submission, escrow payout).
