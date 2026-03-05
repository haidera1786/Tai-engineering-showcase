# Simplified Teacher Feedback Generation

  This is a public‑safe snapshot of how TAI generates teacher feedback from student work.

  ```python
  def generate_teacher_feedback(student_work, objective, age_bracket, standards, guideline):
      # 1) Validate + sanitize input
      work = validate_student_work(student_work)
      objective = sanitize(objective)

      # 2) Build prompt with context
      prompt = build_prompt(
          work=work,
          objective=objective,
          age_bracket=age_bracket,
          standards=standards,
          marking_guideline=guideline,
      )

      # 3) Call LLM with fallback chain
      feedback = call_llm_fallback(
          prompt,
          models=["gpt-5-mini", "gpt-4o-mini"],
      )

      # 4) Enforce quality and format
      if not feedback or not quotes_student_work(feedback, work):
          feedback = safe_fallback_feedback(work, objective, age_bracket)

      # 5) Post‑process for marking symbols + accessibility
      feedback = apply_marking_symbols(feedback, guideline)
      feedback = apply_accessibility_formatting(feedback, age_bracket)

      return feedback

  Key design choices

  - Prompts require short quotes from the student work to keep feedback specific.
  - Model fallback ensures output even if the first attempt fails.
  - Post‑processing enforces marking style and accessibility adjustments.
