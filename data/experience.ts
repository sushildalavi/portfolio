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
    period: "Dec 2023 — Jul 2024",
    location: "Navi Mumbai, India",
    description:
      "Trained and deployed deep vision and quantized transformer models into production, and engineered demand-forecasting microservices for business-critical workloads.",
    achievements: [
      "Trained and deployed ResNet-50 and DenseNet-121 deep vision networks for medical image anomaly detection — improving recall by 35% through transfer learning, augmentation, and loss tuning",
      "Optimized quantized transformer inference (BERT, GPT-2) on GPU with batched serving — cutting p95 latency by 30% and lifting throughput while preserving 20% accuracy gains",
      "Engineered demand-forecasting microservices (TFT, CatBoost, LSTM) over Hive SQL batch pipelines, reducing forecast MAPE by 25% for business-critical workloads",
      "Rolled out shadow-testing and canary-release workflows for 3 production ML upgrades, catching 2 latency regressions before fleet-wide deployment",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "BERT",
      "GPT-2",
      "ResNet",
      "DenseNet",
      "Hive SQL",
      "CatBoost",
    ],
  },
]
