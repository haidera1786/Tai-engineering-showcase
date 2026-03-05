 # System Design (Engineering Decisions)

  This document explains the key engineering decisions in TAI, based on the implementation in the private codebase. It
  is a high-level, public-facing summary.

  ## Goals and Constraints
  - Keep teacher workflows fast, even when AI processing is slow.
  - Provide resilient feedback generation with graceful fallbacks.
  - Support both web and mobile clients with a single API.
  - Make deployments flexible across dev (SQLite) and production (Postgres + Redis).
  - Enforce subscription access while keeping onboarding and billing accessible.

  ## Architecture Decisions

  ### 1) Single API for Web and Mobile
  - Both clients call the same Django REST API.
  - JWT auth is the default, with session auth kept for dev and admin workflows.

  ### 2) Async-First Feedback Pipeline
  - Feedback submission is queued by default to avoid long request latency.
  - Jobs are stored as `FeedbackJob` records with progress metadata.
  - A request can force synchronous execution via `X-Force-Sync` or `?force_sync=1`.

  Why: AI + OCR can be slow; async keeps UX responsive and avoids request timeouts.

  ### 3) Job Deduplication and Persistence
  - Payloads are hashed (user + data + files) to avoid duplicate submissions.
  - If a newer identical job exists, older ones are cancelled.
  - File attachments are stored in the DB as binary blobs so a worker can replay the exact request later.

  Why: Dedup prevents duplicate AI costs and keeps async processing deterministic.

  ### 4) Queue Failover
  - Celery is the primary execution path.
  - If the queue is unavailable, the system falls back to inline execution.
  - Errors are captured and stored on the job with progress history.

  Why: Keep the system functional even if Redis or Celery are temporarily down.

  ## OCR and Input Handling Decisions

  ### 1) OCR Provider Strategy
  - Default OCR path: Google Vision.
  - Optional OpenAI Vision when configured.
  - Automatic fallback from OpenAI to Google Vision, and from gRPC to REST.

  Why: Avoid a single provider dependency and ensure OCR remains available.

  ### 2) Image Preprocessing
  - Images are normalized (contrast, brightness, sharpening) before OCR.
  - This improves recognition quality for handwriting and scans.

  ### 3) Multi-Page Submissions
  - Multiple images are OCRed in parallel.
  - A combined text is used for full feedback; per-page feedback is also stored.

  Why: Teachers often upload multiple pages; parallel OCR reduces latency.

  ### 4) Question Paper and Reference Context
  - PDFs are parsed with PyPDF2 when possible.
  - Images fall back to OCR.
  - Context is added to prompts but not surfaced in feedback text.

  Why: Extra context improves feedback accuracy without changing tone.

  ## AI Feedback Strategy

  ### 1) Prompt Design
  - Prompts enforce quoted evidence from the student work.
  - Subject-specific templates are used (e.g., math vs. general).
  - Reading level is inferred and can simplify language when needed.
  - Marking guidelines and targets are injected when available.

  Why: Keep feedback specific, accurate, and aligned to teacher expectations.

  ### 2) Model Fallback Chain
  - Primary: `gpt-5-mini` via Responses API (fast and cost-effective).
  - Fallbacks: `gpt-4o-mini` (multiple attempts with stricter prompts).
  - Final fallback: a simplified prompt with minimal structure.

  Why: Prevent total failure and keep feedback delivery reliable.

  ### 3) Marking Guidelines and Symbols
  - Guidelines can be parsed into structured JSON.
  - If the model fails to include marking symbols, deterministic keyword injection adds them.
  - Ensures consistent UI rendering even with imperfect model output.

  Why: Teachers expect their marking style to appear consistently.

  ## Target Progress Evaluation

  - After feedback is saved, the system evaluates student and class targets.
  - LLM-based evaluation returns status + progress delta + rationale.
  - Progress deltas are clamped to safe bounds.
  - If AI is unavailable, targets are updated with neutral results.

  Why: Provide continuous progress tracking without blocking core feedback flow.

  ## Performance and Scalability

  - Bulk operations are used for target progress events and updates.
  - Caching is used for teacher dashboards; Redis if available, local memory otherwise.
  - Redis is used as both cache and Celery broker where configured.

  Why: Reduce database load and keep dashboards responsive.

  ## Security and Access Control

  - JWT auth for API, with session auth for admin/browsable API.
  - Rate limiting on user, anon, chat, and support endpoints.
  - Subscription middleware blocks paid routes unless trial or active subscription.
  - Security headers (CSP, Permissions-Policy, HSTS where configured).

  Why: Protect data while keeping onboarding and billing reachable.

  ## Configuration and Deployment Decisions

  - Database auto-detects Postgres via env or URL; falls back to SQLite for dev.
  - Celery, Redis, Stripe, and OpenAI are configured via environment variables.
  - Static assets served with WhiteNoise.

  Why: Keep deployments environment-driven and easy to migrate.

  ## Trade-offs and Rationale

  - Async jobs add complexity but keep UX fast and AI cost controlled.
  - Storing attachments in DB increases size but guarantees worker replay.
  - Multiple model fallbacks cost more but prevent degraded output.
  - Caching improves speed but requires careful invalidation.
