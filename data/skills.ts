export interface SkillGroup {
  title: string
  icon: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "AI / Machine Learning",
    icon: "Brain",
    skills: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "NumPy",
      "Pandas",
      "CNNs",
      "LSTMs",
      "Transformers",
    ],
  },
  {
    title: "NLP / Retrieval",
    icon: "Search",
    skills: [
      "BERT",
      "XLM-RoBERTa",
      "GPT",
      "RAG",
      "FAISS",
      "pgvector",
      "BM25",
      "Embeddings",
    ],
  },
  {
    title: "Backend / APIs",
    icon: "Server",
    skills: [
      "Python",
      "FastAPI",
      "REST APIs",
      "Microservices",
      "PostgreSQL",
      "Node.js",
    ],
  },
  {
    title: "Cloud / Infrastructure",
    icon: "Cloud",
    skills: [
      "AWS",
      "EC2",
      "S3",
      "Lambda",
      "SageMaker",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "GCP",
    ],
  },
  {
    title: "Data / Analytics",
    icon: "BarChart3",
    skills: [
      "Spark",
      "PySpark",
      "Hive SQL",
      "SAP HANA",
      "Tableau",
      "Athena",
      "ETL Pipelines",
    ],
  },
  {
    title: "Languages / Tools",
    icon: "Code2",
    skills: [
      "Python",
      "C++",
      "JavaScript",
      "TypeScript",
      "SQL",
      "Bash",
      "Git",
      "Linux",
    ],
  },
]
