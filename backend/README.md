# Viral Engine Backend (Skeleton)

FastAPI-based service providing the core APIs for Viral Engine (MVPX). This scaffold maps the PRD modules into domain routers, models, and service stubs so we can plug in real integrations next.

## Quickstart

```bash
poetry install
poetry run uvicorn app.main:app --reload
```

Docker resources are not committed yet; add a compose file once infrastructure decisions are final.

## Project Structure

```
backend/
|- app/
|  |- api/        # Routers per domain (campaigns, creators, wallet, streams, admin)
|  |- core/       # App configuration, logging, security utilities
|  |- models/     # Pydantic schemas (request/response contracts)
|  |- services/   # Business logic stubs and integration clients
|- pyproject.toml
|- README.md
```

## Roadmap

1. Implement JWT authentication and RBAC (sponsor, creator, admin roles).
2. Connect PostgreSQL via SQLAlchemy with Alembic migrations.
3. Integrate Stripe and wallet ledger flows.
4. Wire up event bus (Kafka or NATS) for AI and analytics pipelines.
5. Add background workers (Celery or BullMQ) for highlight generation workflows.
