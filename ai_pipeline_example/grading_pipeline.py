This is a simplified, public‑safe walkthrough of the grading pipeline used in TAI. It highlights the real engineering
  decisions behind the system while keeping internal details private.

  ## Pipeline Highlights
  - **Async‑first architecture** keeps the UI fast while AI work runs in the background.
  - **OCR fallback chain** (OpenAI → Google Vision gRPC → REST) ensures reliability.
  - **LLM fallback chain** prevents empty or generic feedback.
  - **Target progress evaluation** updates learning goals after feedback is saved.

  ## Simplified Flow (Aligned to Production Logic)

  ```python
  def submit_feedback(request):
      # 1) Validate + access control
      student = ensure_student_access(request.user, request.data["student_id"])

      # 2) Extract work (text or OCR for images)
      if request.data["submission_type"] == "text":
          work_text = request.data["submission_content"].strip()
      else:
          work_text = recognize_handwriting(request.files["submission_content"])
          # OCR fallback: OpenAI Vision → Google Vision → REST fallback

      # 3) Build context (objective, age bracket, standards, marking style)
      context = build_context(student, request.data)

      # 4) Generate feedback (model fallback chain)
      feedback_text = generate_feedback(
          student_work=work_text,
          context=context,
      )
      # LLM fallback: gpt-5-mini → gpt-4o-mini → simple prompt fallback

      # 5) Persist and update progress
      feedback = Feedback.objects.create(student=student, ai_feedback=feedback_text)
      update_target_progress(student, feedback)

      return {"feedback_id": feedback.id, "ai_feedback": feedback_text}

  ## Why This Design Works

  - Fast user experience: async jobs + progress tracking.
  - Reliable output: multi‑step fallback for OCR and LLMs.
  - Actionable feedback: prompts require quoting student work.
  - Data‑driven outcomes: targets and progress events update automatically.
