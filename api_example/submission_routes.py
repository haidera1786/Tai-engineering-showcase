 # Example API Endpoint 

  POST /api/feedback/submit/
  Authorization: Bearer <JWT>
  Content-Type: application/json

  {
    "student_id": 123,
    "submission_type": "text",
    "submission_content": "The main idea is that...",
    "learning_objective": "Identify the main idea in a paragraph",
    "substandard": 45
  }

  {
    "job_id": "2f6b8c1e-9b7d-4f8f-9c0a-5a1b7d3b1c2d",
    "state": "queued",
    "progress": 0,
    "est_seconds": 30
  }

  GET /api/feedback/status/{job_id}
  Authorization: Bearer <JWT>

  {
    "job_id": "2f6b8c1e-9b7d-4f8f-9c0a-5a1b7d3b1c2d",
    "state": "done",
    "progress": 100,
    "result": {
      "feedback_id": 987,
      "ai_feedback": "Great job identifying the main idea..."
    }
  }
