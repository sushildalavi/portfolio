export interface SkillGroup {
  title: string
  icon: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: "Code2",
    skills: [
      "Java",
      "Kotlin",
      "Python",
      "C++",
      "Go",
      "SQL",
      "Bash",
      "TypeScript",
      "JavaScript",
    ],
  },
  {
    title: "Backend & APIs",
    icon: "Server",
    skills: [
      "Spring Boot",
      "FastAPI",
      "REST",
      "GraphQL",
      "gRPC",
      "SSE",
      "SQLAlchemy",
      "Hibernate",
      "Pydantic",
    ],
  },
  {
    title: "Distributed Systems & Streaming",
    icon: "Workflow",
    skills: [
      "Temporal",
      "Kafka",
      "Redis Streams",
      "Async Workflows",
      "Replay Recovery",
      "Dead-letter Queues",
      "Load Shedding",
    ],
  },
  {
    title: "Databases & Storage",
    icon: "Database",
    skills: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "MongoDB",
      "pgvector",
      "Qdrant",
      "Athena",
      "S3",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "Cloud",
    skills: [
      "AWS",
      "Glue",
      "Lambda",
      "SageMaker",
      "Bedrock",
      "GCP",
      "Docker",
      "Kubernetes",
      "Linux",
      "NGINX",
      "GitHub Actions",
      "CI/CD",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    title: "AI Infrastructure",
    icon: "Brain",
    skills: [
      "PyTorch",
      "Transformers",
      "Whisper",
      "ONNX Runtime",
      "Quantization",
      "MLflow",
      "RAG",
      "Hybrid Retrieval",
      "Reranking",
    ],
  },
  {
    title: "AI-Assisted Development",
    icon: "BarChart3",
    skills: [
      "Claude Code",
      "Cursor",
      "GitHub Copilot",
      "Codex",
    ],
  },
]
