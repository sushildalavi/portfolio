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
    id: "citelens",
    title: "citelens",
    tagline: "Scholarly Citation Intelligence Platform",
    description:
      "Citation-focused research platform entry reserved from your repo set. The local directory currently contains no source files beyond workspace metadata, so stack details are marked pending until repository contents are added.",
    technologies: [
      "Pending Repository Source",
      "TBD",
    ],
    categories: ["Research", "Citations", "Platform"],
    highlights: [
      "Project slug included exactly as requested in portfolio project listings",
      "Directory scan verified no application source files in the provided local path",
      "Card prepared for immediate stack/data backfill once repo content is available",
      "Preserves current site layout and ordering semantics without breaking rendering",
    ],
    metrics: [
      { label: "Status", value: "Needs Source" },
      { label: "Path", value: "Verified Local" },
      { label: "Listing", value: "Included" },
    ],
    links: {
      github: "https://github.com/sushildalavi/citelens",
    },
    featured: true,
    order: 1,
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
    featured: true,
    order: 2,
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
    featured: true,
    order: 3,
  },
  {
    id: "querylens",
    title: "QueryLens",
    tagline: "PostgreSQL Query Performance Monitor",
    description:
      "Production-style observability pipeline for PostgreSQL query behavior with C++ telemetry collection, Kafka transport, idempotent ingestion, deterministic regression detection, and dashboard triage workflows.",
    technologies: [
      "C++",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pg_stat_statements",
      "Kafka/Redpanda",
      "React",
      "Prometheus",
    ],
    categories: ["Observability", "Databases", "Performance"],
    highlights: [
      "Collector fingerprints normalized SQL and captures safe plan snapshots",
      "Backend ingests telemetry with idempotent keys and DLQ retry handling",
      "Deterministic regression engine classifies query degradations",
      "Prometheus and Grafana instrumentation for lag, failures, and alerts",
    ],
    metrics: [
      { label: "Collector", value: "C++" },
      { label: "Ingestion", value: "Idempotent + DLQ" },
      { label: "Stack", value: "Postgres + Kafka" },
    ],
    links: {
      github:
        "https://github.com/sushildalavi/QueryLens-PostgreSQL-Query-Performance-Monitor",
    },
    featured: false,
    order: 4,
  },
  {
    id: "replayforge",
    title: "ReplayForge",
    tagline: "Async Workflow Replay & Failure Debugging Platform",
    description:
      "Crash-tolerant async workflow processing platform with a FastAPI control plane, Go worker data plane, Redis Streams transport, Postgres-backed idempotent completion tracking, and stale-message replay recovery.",
    technologies: [
      "Python",
      "FastAPI",
      "Go",
      "Redis Streams",
      "PostgreSQL",
      "React",
      "SQLAlchemy",
      "Docker Compose",
    ],
    categories: ["Distributed Systems", "Workflows", "Reliability"],
    highlights: [
      "Go worker pool consumes Redis Streams with PEL-aware recovery loop",
      "Janitor flow uses XAUTOCLAIM to replay orphaned pending messages",
      "FastAPI plane exposes operational controls and workflow visibility",
      "Idempotent claim-complete transaction boundaries reduce duplicate side effects",
    ],
    metrics: [
      { label: "Data Plane", value: "Go Workers" },
      { label: "Transport", value: "Redis Streams" },
      { label: "Recovery", value: "XAUTOCLAIM" },
    ],
    links: {
      github:
        "https://github.com/sushildalavi/ReplayForge-Async-Workflow-Replay-Failure-Debugging-Platform",
    },
    featured: false,
    order: 5,
  },
  {
    id: "schemapilot",
    title: "SchemaPilot",
    tagline: "API Contract Drift Monitor",
    description:
      "Contract observability system that monitors live endpoint schema evolution, computes deterministic diffs and severity classes, and records runtime SAFE/RISKY/BREAKING violations with concurrency-safe ingestion paths.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "AsyncPG",
      "React",
      "TypeScript",
      "Prometheus",
    ],
    categories: ["APIs", "Schema Governance", "Monitoring"],
    highlights: [
      "Scheduled monitor infers and fingerprints response schemas from traffic",
      "Runtime contract guard records drift violations in real time",
      "Deterministic classifier flags missing fields and type-risk transitions",
      "Dashboard supports triage through endpoint-level schema history views",
    ],
    metrics: [
      { label: "Drift Classes", value: "SAFE/RISKY/BREAKING" },
      { label: "Mode", value: "Scheduled + Runtime" },
      { label: "Storage", value: "PostgreSQL" },
    ],
    links: {
      github:
        "https://github.com/sushildalavi/SchemaPilot-API-Contract-Drift-Monitor",
    },
    featured: false,
    order: 6,
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
    order: 7,
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
    order: 8,
  },
]
