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
    title: "ML & Deep Learning",
    icon: "Brain",
    skills: [
      "PyTorch",
      "Hugging Face",
      "ONNX Runtime",
      "Quantization",
      "LoRA / PEFT",
      "Fine-Tuning",
      "Distributed Training",
      "MLflow",
    ],
  },
  {
    title: "LLMs & Retrieval",
    icon: "Search",
    skills: [
      "Prompt Engineering",
      "Function Calling",
      "Structured Outputs",
      "RAG",
      "Hybrid Retrieval",
      "Reranking",
      "pgvector",
      "Qdrant",
      "RAGAS",
    ],
  },
  {
    title: "Backend & Data Systems",
    icon: "Server",
    skills: [
      "FastAPI",
      "Temporal",
      "gRPC",
      "REST",
      "SSE",
      "Kafka",
      "Spark",
      "PostgreSQL",
      "Redis",
      "MongoDB",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "Cloud",
    skills: [
      "AWS S3",
      "AWS Glue",
      "SageMaker",
      "Bedrock",
      "GCP",
      "Docker",
      "Kubernetes",
      "Linux",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
      "Airflow",
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
