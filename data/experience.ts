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
    role: "AI Engineer",
    period: "Jun 2025 — Present",
    location: "Los Angeles, CA",
    description:
      "Architecting AWS data platforms, multi-modal alignment systems, and large-scale batch ML pipelines for media and social-impact research.",
    achievements: [
      "Architected an AWS data platform (S3, Glue, SageMaker, Bedrock) ingesting, deduplicating, and normalizing 1M+ multi-region records for downstream ML training and retrieval workloads",
      "Shipped a multi-modal alignment system fusing audio, speaker diarization, and caption streams — reaching 99.3% F1 and 99.9% coverage on ground-truth evaluation",
      "Developed large-scale batch pipelines processing long-form video and audio through Whisper ASR, pyannote diarization, and model-based refinement stages",
      "Automated dataset QA, Unicode normalization, and deduplication in Python — lifting analysis-ready yield from 10,819 raw inputs to 9,735 records with full reproducibility",
    ],
    technologies: [
      "Python",
      "AWS",
      "S3",
      "Glue",
      "SageMaker",
      "Bedrock",
      "Whisper",
      "pyannote",
    ],
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
