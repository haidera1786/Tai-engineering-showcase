
  # Architecture

  This document explains how the TAI system works end‑to‑end and how the major components fit together. It is a
  high‑level view intended for public sharing.

  ## Purpose
  TAI helps teachers submit student work and receive AI‑assisted feedback aligned to curriculum standards. The platform
  supports both web and mobile clients, asynchronous processing, and subscription billing.

  ## System Overview
  TAI is a multi‑client platform with a backend API that orchestrates feedback generation and data management.

  Core components:
  - Web frontend (React)
  - Mobile app (React Native / Expo)
  - Backend API (Django + Django REST Framework)
  - Async worker (Celery)
  - Data stores (PostgreSQL or SQLite in dev)
  - Cache / broker (Redis)
  - File storage for submissions and reference assets

  External services:
  - OpenAI API (LLM feedback + optional vision OCR)
  - Google Vision API (OCR fallback)
  - Stripe (billing + webhooks)
  - Apple App Store / Google Play (receipt verification + notifications)

  ## High‑Level Flow
  1. A teacher submits work via web or mobile (text or image).
  2. The API validates the request and either:
     - processes immediately (sync), or
     - enqueues a background job (async).
  3. OCR runs for image submissions.
  4. The LLM generates structured feedback.
  5. Feedback is stored and returned to the client.

  See the sequence diagram in `sequence-submit-feedback.md` for the detailed flow.

  ## Component Responsibilities

  ### Web Frontend (React)
  - Teacher UI for classes, students, and feedback
  - Submits files and metadata to the API
  - Displays AI feedback and progress tracking

  ### Mobile App (React Native / Expo)
  - Teacher mobile UI
  - Supports quick submission flows and viewing feedback

  ### Backend API (Django + DRF)
  - Auth, user profiles, and admin
  - Core business logic (classes, students, targets, standards)
  - File uploads and submission handling
  - Billing and subscription endpoints
  - Orchestrates sync feedback generation

  ### Worker (Celery)
  - Executes async feedback jobs
  - Runs OCR and LLM calls when queued
  - Writes results back to the database

  ### Data Stores
  - PostgreSQL in production (SQLite in development)
  - Redis for async job queue + cache
  - File storage for images, PDFs, and reference assets

  ## Data Model
  The platform centers on:
  - Users and profiles
  - Classes and students
  - Submissions and AI feedback
  - Curriculum standards + sub‑standards
  - Targets and progress events
  - Marking guidelines and symbol libraries

  See `erd-django-models.md` for the ER diagram.

  ## API Surface
  The API is organized around:
  - Auth + profile management
  - Classes, students, targets, and progress
  - Feedback submission and status
  - Standards and curricula ingestion
  - Marking guidelines and symbols
  - Billing and subscriptions

  See `api-route-map.md` for a route overview.

  ## Architecture Diagrams
  - System context (C4 L1): `c4-l1-context.md`
  - Containers (C4 L2): `c4-l2-container.md`

  ## Security and Privacy (High Level)
  - Authenticated API access
  - Separation of user data by account
  - Secure handling of file uploads
  - Billing and subscription verification via official provider APIs

  ## Deployment (High Level)
  Typical deployment includes:
  - Django API behind a reverse proxy (e.g., Nginx)
  - Gunicorn/ASGI for application serving
  - Celery worker processes
  - Redis and PostgreSQL services
  - Object/file storage for uploads

  ## Status
  This repo is documentation‑only. The private repository contains the full source code and production configuration.
