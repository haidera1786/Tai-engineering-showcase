 # TAI — AI Feedback Platform for Teachers

  Public showcase repo for TAI, a platform that helps teachers submit student work and receive AI-assisted feedback,
  aligned to curriculum standards and tracked against learning targets.

  This repository contains high‑level docs and architecture diagrams only. The full source code and production
  configuration live in a private repository.

  ## What TAI Does
  - Teacher web app and mobile app for submitting student work
  - AI-assisted feedback with optional OCR for image submissions
  - Class, student, and target tracking
  - Curriculum standards mapping and progress events
  - Marking guideline management and symbol libraries
  - Billing + subscriptions (Stripe, Apple App Store, Google Play)

  ## Architecture Overview
  TAI is built as a multi‑client platform with a Django REST API and async feedback processing.

  - Web client: React
  - Mobile client: React Native (Expo)
  - Backend: Django + Django REST Framework
  - Async jobs: Celery + Redis
  - Data: PostgreSQL (or SQLite in dev)
  - AI/OCR: OpenAI API + Google Vision fallback
  - Payments: Stripe + App Store / Play Store verification

  ## Diagrams and Docs (in this repo)
  - System context (C4 L1): `c4-l1-context.md`
  - Container view (C4 L2): `c4-l2-container.md`
  - Feedback pipeline sequence: `sequence-submit-feedback.md`
  - Data model (ERD): `erd-django-models.md`
  - API surface map: `api-route-map.md`

  ## Feedback Flow (High Level)
  1. Teacher submits a file (text or image) via web or mobile.
  2. API accepts the request and either:
     - processes synchronously, or
     - enqueues an async job for a worker.
  3. OCR runs for images (OpenAI vision or Google Vision fallback).
  4. LLM generates structured feedback.
  5. Feedback is stored and returned to the teacher app.

  ## Tech Stack
  **Frontend**
  - React (web)
  - React Native + Expo (mobile)

  **Backend**
  - Django, Django REST Framework
  - Celery + Redis (async jobs)

  **Data**
  - PostgreSQL (prod), SQLite (dev)
  - File storage for submissions and reference assets

  **AI / OCR**
  - OpenAI API
  - Google Vision API (fallback OCR)

  **Billing**
  - Stripe
  - Apple App Store + Google Play verification

  ## Screenshots
  - Screenshots: Please see Screenshots folder :)

  ## Status
  Active development. This repo is intentionally limited to documentation for public sharing.

  ## Contact
  If you want a walkthrough or demo access, reach out at: founder@taimarking.com
