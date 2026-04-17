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
    id: "jobsense",
    title: "JobSense",
    tagline: "Durable Distributed Workflow Platform",
    description:
      "A fault-tolerant orchestration platform built on Temporal — coordinating 12 tool integrations, automated retries, human-in-the-loop checkpoints, and a provider-agnostic inference gateway with semantic caching and CI regression gates.",
    technologies: [
      "Python",
      "FastAPI",
      "Temporal",
      "PostgreSQL",
      "Redis",
      "BM25",
      "Cross-Encoder",
      "RRF",
    ],
    categories: ["Workflows", "Retrieval", "Platform"],
    highlights: [
      "Durable orchestration on Temporal with 12 tool integrations, automated retries, human-in-the-loop checkpoints, and end-to-end observability",
      "Provider-agnostic inference gateway with multi-backend failover, Redis semantic caching, and structured-output validation",
      "CI regression gates blocking merges on quality or cost drift",
      "Hybrid retrieval (BM25, dense vector, cross-encoder rerank) fused with Reciprocal Rank Fusion, benchmarked end-to-end",
    ],
    metrics: [
      { label: "Tool Integrations", value: "12" },
      { label: "Retrieval", value: "Hybrid + RRF" },
      { label: "Gateway", value: "Multi-Backend" },
    ],
    links: {
      github: "https://github.com/sushildalavi",
    },
    featured: true,
    order: 1,
  },
  {
    id: "scribeai",
    title: "ScribeAI",
    tagline: "Inference Service with Evaluation Pipeline",
    description:
      "An async FastAPI inference service with SSE streaming, multi-backend routing (GPT-4o, Claude, fallback engine), an MLflow-tracked evaluation harness, and a compliance-aware pipeline with entity-level redaction and append-only audit logging.",
    technologies: [
      "Python",
      "FastAPI",
      "Qdrant",
      "MLflow",
      "pgcrypto",
      "SSE",
      "GPT-4o",
      "Claude",
    ],
    categories: ["LLM Systems", "MLOps", "Compliance"],
    highlights: [
      "Async FastAPI inference service with SSE streaming, multi-backend routing (GPT-4o, Claude, fallback), and graceful degradation under upstream failure",
      "MLflow-tracked evaluation harness running ROUGE, BLEU, BERTScore, faithfulness, and leakage checks on every model change",
      "Automated regression alerts on metric drift across versioned model releases",
      "Compliance-aware pipeline: entity-level redaction across 10+ PII types, encrypted storage via pgcrypto, and append-only audit logging",
    ],
    metrics: [
      { label: "PII Types", value: "10+" },
      { label: "Eval Metrics", value: "5" },
      { label: "Streaming", value: "SSE" },
    ],
    links: {
      github: "https://github.com/sushildalavi",
    },
    featured: true,
    order: 2,
  },
  {
    id: "scholar-rag",
    title: "ScholarRAG",
    tagline: "Retrieval & Data Engineering System",
    description:
      "A hybrid retrieval pipeline for scholarly discovery — combining dense embeddings, BM25, RRF, and MiniLM reranking over 120+ evaluation queries, with DOI/title normalization and citation-aware grounding.",
    technologies: [
      "Python",
      "FastAPI",
      "pgvector",
      "PostgreSQL",
      "MiniLM",
      "BM25",
      "RRF",
      "SHA-256",
    ],
    categories: ["RAG", "Retrieval", "Data Engineering"],
    highlights: [
      "Hybrid retrieval pipeline (dense, BM25, RRF, MiniLM rerank) lifting MRR by 21.8% and nDCG@10 by 18.0% across a 120+ query evaluation harness",
      "Reduced duplicate indexing by 50% and re-ingestion time by 60% via DOI/ID/title normalization and SHA-256 content hashing",
      "Improved answer grounding from 0.505 to 0.616 faithfulness and claim support from 45.4% to 85.6%",
      "Evidence-constrained generation with citation-aware prompting across heterogeneous scholarly sources",
    ],
    metrics: [
      { label: "MRR Lift", value: "+21.8%" },
      { label: "Faithfulness", value: "0.616" },
      { label: "Claim Support", value: "85.6%" },
    ],
    links: {
      github: "https://github.com/sushildalavi",
    },
    featured: true,
    order: 3,
  },
]
