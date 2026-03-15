export interface Experience {
  id: string
  company: string
  role: string
  period: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
}

export const experiences: Experience[] = [
  {
    id: "usc",
    company: "USC Annenberg Norman Lear Center",
    role: "AI Research Engineer",
    period: "2024 — Present",
    location: "Los Angeles, CA",
    description:
      "Building multilingual AI pipelines and retrieval systems for media research at the intersection of AI, policy, and social impact.",
    achievements: [
      "Architected multilingual data pipelines on AWS (S3, Glue, SageMaker), reducing ETL latency by 45%",
      "Built hybrid retrieval pipelines using OpenAI embeddings, BM25, and MiniLM reranking for document discovery",
      "Integrated GPT-4o-mini for clustering, sentiment analysis, and theme discovery on YouTube comment datasets",
      "Designed virality indices and operationalized Tableau dashboards on Athena, shortening reporting cycles by 45%",
      "Collaborated with researchers from Oxford, UPenn, and the World Bank on multilingual media analytics",
    ],
    technologies: ["Python", "AWS", "OpenAI", "RAG", "Tableau", "SageMaker"],
  },
  {
    id: "jio",
    company: "Reliance Jio Platforms",
    role: "Software Engineer",
    period: "2021 — 2023",
    location: "Mumbai, India",
    description:
      "Built production microservices, ML pipelines, and NLP systems for one of the world's largest telecommunications platforms.",
    achievements: [
      "Built microservices and REST APIs for ML forecasting pipelines using TFT, CatBoost, and LSTM models",
      "Trained and tuned CNNs (ResNet, DenseNet) for radiology classification, improving anomaly detection by 35%",
      "Deployed BERT and GPT-2 as REST APIs in Haptik chatbot platform — improved intent accuracy by 20%, reduced latency by 30%",
      "Automated CI/CD with Docker and Jenkins, reducing release cycles by 40%",
      "Engineered data workflows with Hive SQL and SAP HANA, improving workflow efficiency by 25%",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "Docker",
      "Jenkins",
      "BERT",
      "REST APIs",
    ],
  },
]
