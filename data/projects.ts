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
    id: "querylens",
    title: "QueryLens",
    tagline: "PostgreSQL Query Performance Monitor",
    description:
      "Production-style observability pipeline for PostgreSQL query behavior with C++ telemetry collection, Kafka/Redpanda transport, FastAPI ingestion, deterministic regression detection, and dashboard triage workflows.",
    technologies: [
      "C++",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pg_stat_statements",
      "Kafka/Redpanda",
      "Prometheus",
      "Grafana",
      "React",
    ],
    categories: ["Observability", "Databases", "Performance"],
    highlights: [
      "Captured PostgreSQL query telemetry with a low-overhead C++ collector and normalized SQL fingerprinting.",
      "Hardened ingestion with idempotent event IDs, retry/backoff, and DLQ persistence.",
      "Detected deterministic query regressions across latency spikes, scan fallbacks, temp spills, and vector-search issues.",
      "Streamed telemetry through Kafka/Redpanda into FastAPI and PostgreSQL with Prometheus/Grafana operational visibility.",
    ],
    metrics: [
      { label: "Event Volume", value: "100K events" },
      { label: "Throughput", value: "8,938 events/sec" },
      { label: "Reliability", value: "0 DLQ/persistence failures" },
    ],
    links: {
      github:
        "https://github.com/sushildalavi/QueryLens-PostgreSQL-Query-Performance-Monitor",
    },
    featured: true,
    order: 1,
  },
  {
    id: "replayforge",
    title: "ReplayForge",
    tagline: "Async Workflow Replay & Failure Debugging Platform",
    description:
      "Crash-tolerant workflow replay platform with a FastAPI control plane, Go worker execution path, Redis Streams transport, PostgreSQL persistence, and replay-safe recovery automation.",
    technologies: [
      "Go",
      "Python",
      "FastAPI",
      "Redis Streams",
      "PostgreSQL",
      "SQLAlchemy",
      "Docker Compose",
      "React",
    ],
    categories: ["Distributed Systems", "Workflows", "Reliability"],
    highlights: [
      "Built FastAPI operational APIs for workflow visibility, replay controls, and failure debugging.",
      "Implemented idempotency-keyed completion paths with retry/backoff and durable PostgreSQL writes.",
      "Recovered orphaned pending entries using XAUTOCLAIM and replay-safe Redis Streams reprocessing.",
      "Integrated DLQ and replay tooling to isolate poison messages without stalling main flow throughput.",
    ],
    metrics: [
      { label: "Transport", value: "Redis Streams" },
      { label: "Recovery", value: "XAUTOCLAIM" },
      { label: "Safety", value: "Replay-safe ingestion" },
    ],
    links: {
      github:
        "https://github.com/sushildalavi/ReplayForge-Async-Workflow-Replay-Failure-Debugging-Platform",
    },
    featured: true,
    order: 2,
  },
  {
    id: "schemapilot",
    title: "SchemaPilot",
    tagline: "API Contract Drift Monitor",
    description:
      "Contract observability service that tracks API payload drift through FastAPI ingestion, deterministic schema fingerprints, endpoint-scoped uniqueness guards, and severity-aware classification.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Prometheus",
      "Grafana",
      "Kafka",
      "React",
      "TypeScript",
    ],
    categories: ["APIs", "Schema Governance", "Monitoring"],
    highlights: [
      "Tracked live traffic through a FastAPI /track ingestion path for runtime contract visibility.",
      "Generated deterministic schema fingerprints and endpoint-scoped uniqueness keys for stable drift detection.",
      "Used PostgreSQL advisory locks to coordinate concurrent updates safely across endpoint baselines.",
      "Classified drift as SAFE, RISKY, or BREAKING and routed alerts via retry/backoff and DLQ flows.",
    ],
    metrics: [
      { label: "Load", value: "5,000 requests" },
      { label: "Concurrency", value: "200" },
      { label: "Failures", value: "0" },
    ],
    links: {
      github:
        "https://github.com/sushildalavi/SchemaPilot-API-Contract-Drift-Monitor",
    },
    featured: true,
    order: 3,
  },
  {
    id: "nanoserve",
    title: "nanoserve",
    tagline: "OpenAI-Compatible LLM Serving Engine",
    description:
      "From-scratch local inference server on Apple Silicon with continuous batching, prefix KV reuse, quantization paths, streaming API compatibility, and integrated observability for throughput and latency profiling.",
    technologies: [
      "Python",
      "FastAPI",
      "PyTorch",
      "Transformers",
      "TorchAO",
      "Uvicorn",
      "Prometheus",
      "Grafana",
      "SSE",
    ],
    categories: ["LLM Systems", "Inference", "Performance"],
    highlights: [
      "Implements continuous batching scheduler and prefix-cache reuse for serving efficiency",
      "Supports OpenAI-style chat completions with streaming and non-streaming paths",
      "Includes INT8/INT4 quantization experiments and reproducible ablation benchmarking",
      "Ships with Prometheus metrics and provisioned Grafana dashboard observability",
    ],
    metrics: [
      { label: "API", value: "OpenAI-Compatible" },
      { label: "Batching", value: "Continuous" },
      { label: "Quantization", value: "INT8/INT4" },
    ],
    links: {
      github: "https://github.com/sushildalavi/nanoserve",
    },
    featured: false,
    order: 4,
  },
  {
    id: "sourcery",
    title: "sourcery",
    tagline: "Scholarly RAG with Citation Grounding",
    description:
      "Scholarly retrieval-augmented generation app combining uploaded PDFs and live academic sources, with hybrid retrieval, evidence-linked generation, and calibrated claim-support confidence scoring.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "React",
      "Vite",
      "Ollama",
      "OpenAI API",
    ],
    categories: ["RAG", "Research", "Evaluation"],
    highlights: [
      "Hybrid dense+sparse retrieval over local documents and scholarly APIs",
      "Evidence-constrained generation that cites supporting source chunks",
      "Confidence calibration over claim-evidence pairs for support scoring",
      "Offline-first runtime path with local model fallback support",
    ],
    metrics: [
      { label: "Tests", value: "198" },
      { label: "Routes", value: "32 Typed" },
      { label: "Retrieval", value: "Hybrid" },
    ],
    links: {
      github: "https://github.com/sushildalavi/sourcery",
    },
    featured: false,
    order: 5,
  },
  {
    id: "soapflow",
    title: "SOAPFlow",
    tagline: "Clinical Transcript to SOAP Note Platform",
    description:
      "Clinical documentation platform that converts transcripts into structured SOAP notes with multi-provider generation routing, PHI de-identification, evaluation tooling, vector search history, and audio transcription support.",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Qdrant",
      "Redis",
      "SQLAlchemy",
      "MLflow",
    ],
    categories: ["Healthcare AI", "NLP", "LLM Systems"],
    highlights: [
      "Supports six generation backends including hosted and local providers",
      "PII/PHI de-identification pipeline with Presidio and spaCy components",
      "SOAP quality validation with structured warning and severity output",
      "Vector-indexed note history and transcript-to-note workflow persistence",
    ],
    metrics: [
      { label: "Backends", value: "6 Modes" },
      { label: "Format", value: "SOAP" },
      { label: "Search", value: "Vector History" },
    ],
    links: {
      github:
        "https://github.com/sushildalavi/SOAPFlow-Clinical-Transcript-to-SOAP-Note-Platform",
    },
    featured: false,
    order: 6,
  },
  {
    id: "medledger",
    title: "MedLedger",
    tagline: "Secure Decentralized EHR Audit Logging",
    description:
      "Privacy-first audit logging system for EHR access with encrypted records, hash-chained ledgers across independent nodes, and TLS-pinned inter-service communication for tamper detection and integrity verification.",
    technologies: [
      "Python",
      "Flask",
      "Cryptography",
      "AES-GCM",
      "HKDF",
      "Ed25519",
      "HMAC-SHA256",
      "PBKDF2",
      "Vanilla JS",
    ],
    categories: ["Security", "Healthcare", "Audit"],
    highlights: [
      "Encrypted audit records with per-patient key derivation and authenticated metadata binding",
      "Cross-node majority verification detects tampering and chain inconsistency",
      "Mutual service trust via pinned cert bundles and strict TLS verification",
      "Role-based access controls for patient, doctor, audit, and admin personas",
    ],
    metrics: [
      { label: "Audit Nodes", value: "3" },
      { label: "Transport", value: "TLS Pinned" },
      { label: "Ledger", value: "Hash-Chained" },
    ],
    links: {
      github: "https://github.com/sushildalavi/MedLedger",
    },
    featured: false,
    order: 7,
  },
]
