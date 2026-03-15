export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  technologies: string[]
  categories: string[]
  highlights: string[]
  metrics: { label: string; value: string }[]
  links: {
    github?: string
    live?: string
    paper?: string
  }
  featured: boolean
  order: number
}

export const projects: Project[] = [
  {
    id: "scholar-rag",
    title: "ScholarRAG",
    tagline: "Full-Stack Retrieval-Augmented Research Assistant",
    description:
      "A production-grade research assistant that unifies private document Q&A with live scholarly APIs — surfacing citation-grounded answers across arXiv, OpenAlex, Springer, IEEE, and Elsevier through a hybrid RAG architecture.",
    technologies: [
      "Python",
      "FastAPI",
      "GPT-4o-mini",
      "FAISS",
      "pgvector",
      "PostgreSQL",
      "AWS EC2",
      "Docker",
      "text-embedding-3-large",
      "MiniLM",
    ],
    categories: ["RAG", "NLP", "Full-Stack"],
    highlights: [
      "Unified private PDF Q&A with live scholarly APIs (arXiv, OpenAlex, Springer, IEEE, Elsevier)",
      "Hybrid RAG stack combining text-embedding-3-large with FAISS and pgvector for dense retrieval",
      "Lexical blending with BM25 and MiniLM MS-MARCO cross-encoder reranking",
      "GPT-4o-mini for citation-grounded response generation",
      "Deployed on AWS with EC2, Docker, Postgres, and pgvector",
    ],
    metrics: [
      { label: "Recall@10", value: "0.81" },
      { label: "p95 Latency", value: "~980ms" },
      { label: "Sources", value: "5+ APIs" },
    ],
    links: {
      github: "https://github.com/sushildalavi/scholar-rag",
    },
    featured: true,
    order: 1,
  },
  {
    id: "emosentry",
    title: "EmoSentry",
    tagline: "Emoji-Aware Hate Speech Detection System",
    description:
      "A deep learning pipeline for sarcasm-aware hate speech detection that enriches traditional text classifiers with emoji context, multilingual embeddings, and LLM-based augmentation — achieving high-precision moderation at scale.",
    technologies: [
      "Python",
      "PyTorch",
      "Bi-LSTM",
      "CNN",
      "GloVe",
      "XLM-RoBERTa",
      "AWS SageMaker",
      "Lambda",
      "S3",
      "YouTube API",
    ],
    categories: ["NLP", "Deep Learning", "MLOps"],
    highlights: [
      "Sarcasm-aware hate speech classifier trained on 42K tweets via Tweepy",
      "Bi-LSTM + CNN architecture with GloVe embeddings achieving 93.7% accuracy",
      "XLM-RoBERTa embeddings with LLM-based RAG enrichment boosting precision by 16%",
      "Operationalized on AWS (S3, SageMaker, Lambda) with YouTube API integration",
      "Sustained 98% detection rate in production moderation pipeline",
    ],
    metrics: [
      { label: "Accuracy", value: "93.7%" },
      { label: "Precision", value: "+16%" },
      { label: "Detection", value: "98%" },
    ],
    links: {
      github: "https://github.com/sushildalavi/emosentry",
    },
    featured: true,
    order: 2,
  },
  {
    id: "medsoap",
    title: "MedSOAP",
    tagline: "AI-Powered Clinical Documentation",
    description:
      "An intelligent clinical documentation system that generates structured SOAP notes from patient-provider conversations, streamlining healthcare workflows and reducing documentation burden.",
    technologies: ["Python", "NLP", "LLMs", "FastAPI", "Healthcare AI"],
    categories: ["Healthcare AI", "NLP"],
    highlights: [
      "Automated SOAP note generation from clinical conversations",
      "Structured output with medical entity recognition",
      "HIPAA-conscious architecture design",
    ],
    metrics: [],
    links: {},
    featured: false,
    order: 3,
  },
  {
    id: "nlc-pipeline",
    title: "NLC Multilingual Pipeline",
    tagline: "Social Listening & Gender Norms Analysis",
    description:
      "A multilingual social listening and analytics pipeline for the Norman Lear Center — analyzing gender norms and media representation across global datasets in collaboration with Oxford, UPenn, and the World Bank.",
    technologies: [
      "Python",
      "AWS Glue",
      "S3",
      "Athena",
      "SageMaker",
      "OpenAI",
      "Tableau",
    ],
    categories: ["Data Engineering", "NLP", "Analytics"],
    highlights: [
      "Multilingual data pipeline on AWS for global media analysis",
      "Cross-institutional research collaboration at scale",
      "Operationalized Tableau dashboards for stakeholder reporting",
    ],
    metrics: [],
    links: {},
    featured: false,
    order: 4,
  },
]
