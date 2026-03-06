# System Architecture

```mermaid
flowchart TD

A[Frontend Dashboard] --> B[API Layer]

B --> C[Authentication Service]
B --> D[Class Management]
B --> E[Feedback Service]

E --> F[AI Grading Engine]
F --> G[Database]
```
