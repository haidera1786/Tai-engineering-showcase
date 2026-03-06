# AI Grading Pipeline

This diagram illustrates how TAI processes and evaluates a student submission using AI.

```mermaid
flowchart TD

A[Student Answer] --> B[Prompt Builder]

B --> C[Rubric + Instructions]

C --> D[LLM Evaluation]

D --> E[Score Extraction]

E --> F[Feedback Generation]

F --> G[Teacher Review]
