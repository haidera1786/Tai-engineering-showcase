# Product Flow

This diagram shows the high-level user workflow for the TAI platform.  
It illustrates how a teacher interacts with the system from submission to feedback delivery.

```mermaid
flowchart TD

A[Student Work] --> B[Teacher Upload]

B --> C[Document Processing]

C --> D[AI Grading Engine]

D --> E[Feedback Generation]

E --> F[Printing The Feedback]
