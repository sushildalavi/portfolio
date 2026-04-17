/**
 * Knowledge base for the on-site AI assistant.
 * The client-side matcher scores entries by keyword overlap and returns
 * the top-scoring answers as a structured response.
 *
 * Upgrade path: swap `match()` for a fetch to a Cloudflare Worker /
 * Vercel Edge Function that calls Claude / GPT with these facts as
 * retrieved context. The entry schema below already matches what a
 * RAG-style retriever would expect.
 */

export interface Fact {
  id: string
  keywords: string[]
  title: string
  body: string
  links?: { label: string; href: string }[]
}

export const facts: Fact[] = [
  {
    id: "intro",
    keywords: ["who", "hi", "hello", "introduction", "about", "yourself", "you"],
    title: "Who is Sushil?",
    body: "Sushil Dalavi is an AI Engineer at the USC Annenberg Norman Lear Center and an MS Computer Science candidate at USC (2024 – 2026). He architects production AI systems — AWS data platforms, hybrid retrieval, distributed workflow platforms, and multi-modal ML — with a bias toward measurable outcomes and reproducibility.",
  },
  {
    id: "role",
    keywords: ["role", "job", "position", "title", "work", "current"],
    title: "Current role",
    body: "AI Engineer at USC Annenberg Norman Lear Center (Los Angeles, CA) since June 2025. Architected an AWS data platform (S3, Glue, SageMaker, Bedrock) ingesting 1M+ multi-region records. Shipped a multi-modal alignment system fusing audio, speaker diarization, and caption streams — 99.3% F1, 99.9% coverage on ground-truth evaluation.",
  },
  {
    id: "jio",
    keywords: ["jio", "reliance", "prior", "previous", "past", "before"],
    title: "Reliance Jio experience",
    body: "Software Engineer at Reliance Jio Platforms (Dec 2023 – Jul 2024, Navi Mumbai). Trained and deployed ResNet-50 / DenseNet-121 for medical image anomaly detection — +35% recall. Optimized quantized BERT/GPT-2 inference — −30% p95 latency while preserving 20% accuracy gains. Shipped demand-forecasting microservices (TFT, CatBoost, LSTM) — forecast MAPE cut 25%.",
  },
  {
    id: "education",
    keywords: ["education", "degree", "school", "university", "usc", "mumbai", "masters", "bachelor", "study"],
    title: "Education",
    body: "MS in Computer Science at USC (Aug 2024 – May 2026). Coursework: Machine Learning, Deep Learning, Distributed Systems, Information Retrieval, NLP. BE in Computer Engineering at University of Mumbai (Jun 2019 – May 2023). Coursework: OS, Distributed Systems, Computer Networks, DSA.",
  },
  {
    id: "projects",
    keywords: ["projects", "built", "shipped", "portfolio", "work", "case", "studies"],
    title: "Signature projects",
    body: "JobSense — durable workflow platform on Temporal with 12 tool integrations, Redis semantic caching, CI regression gates. ScribeAI — async FastAPI inference service with SSE streaming, multi-backend routing (GPT-4o, Claude), MLflow-tracked eval (ROUGE, BLEU, BERTScore), and 10+ PII-type redaction. ScholarRAG — hybrid retrieval (dense + BM25 + RRF + MiniLM rerank) lifting MRR by 21.8% and nDCG@10 by 18.0%.",
  },
  {
    id: "jobsense",
    keywords: ["jobsense", "temporal", "workflow", "orchestration"],
    title: "JobSense",
    body: "Durable distributed workflow platform. Temporal for fault-tolerant orchestration across 12 tool integrations, with automated retries and human-in-the-loop checkpoints. Provider-agnostic inference gateway with multi-backend failover, Redis semantic caching, structured-output validation. CI regression gates block merges on quality or cost drift. Hybrid retrieval fused with Reciprocal Rank Fusion.",
  },
  {
    id: "scribeai",
    keywords: ["scribe", "scribeai", "inference", "evaluation", "mlflow"],
    title: "ScribeAI",
    body: "Inference service with an evaluation pipeline. Async FastAPI with SSE streaming, multi-backend routing across GPT-4o / Claude / fallback engine, graceful degradation. MLflow-tracked harness running ROUGE, BLEU, BERTScore, faithfulness, and leakage checks on every model change. Compliance pipeline: entity-level redaction across 10+ PII types, pgcrypto encrypted storage, append-only audit log.",
  },
  {
    id: "scholarrag",
    keywords: ["scholar", "scholarrag", "rag", "retrieval", "pgvector", "hybrid"],
    title: "ScholarRAG",
    body: "Retrieval & data engineering system for scholarly discovery. Hybrid pipeline — dense embeddings + BM25 + RRF + MiniLM cross-encoder rerank — lifted MRR by 21.8% and nDCG@10 by 18.0% over a 120+ query eval harness. DOI/ID/title normalization and SHA-256 content hashing reduced duplicate indexing by 50% and re-ingestion time by 60%. Evidence-constrained generation improved faithfulness from 0.505 → 0.616 and claim support 45.4% → 85.6%.",
  },
  {
    id: "skills",
    keywords: ["skills", "stack", "tools", "languages", "tech", "toolchain"],
    title: "Toolchain",
    body: "Languages: Python, C++, Go, SQL, Bash, TypeScript, JavaScript. ML/DL: PyTorch, Hugging Face, ONNX Runtime, Quantization, LoRA/PEFT, MLflow, Distributed Training. LLMs/Retrieval: RAG, Hybrid Retrieval, Reranking, pgvector, Qdrant, RAGAS. Backend: FastAPI, Temporal, gRPC, REST, SSE, Kafka, Spark, Postgres, Redis, MongoDB. Cloud: AWS (S3, Glue, SageMaker, Bedrock), GCP, Docker, Kubernetes, GitHub Actions, Prometheus, Grafana, Airflow.",
  },
  {
    id: "aws",
    keywords: ["aws", "cloud", "sagemaker", "bedrock", "glue", "s3"],
    title: "AWS experience",
    body: "Architected the NLC's multi-region ingestion platform on S3 + Glue + SageMaker + Bedrock — 1M+ records deduplicated and normalized for downstream ML training. Also comfortable with GCP, Docker, Kubernetes, and full CI/CD on GitHub Actions with Prometheus/Grafana observability.",
  },
  {
    id: "llm",
    keywords: ["llm", "gpt", "claude", "model", "inference", "anthropic", "openai"],
    title: "LLM systems work",
    body: "Built provider-agnostic inference gateways with multi-backend failover across OpenAI (GPT-4o) and Anthropic (Claude) plus fallback engines. Shipped MLflow-tracked evaluation harnesses covering ROUGE, BLEU, BERTScore, faithfulness, and leakage — so regressions ship to a dashboard before they ship to users.",
  },
  {
    id: "retrieval",
    keywords: ["retrieval", "rag", "search", "rerank", "embedding", "vector"],
    title: "Retrieval systems",
    body: "Hybrid retrieval is a recurring theme — dense embeddings + lexical (BM25) + Reciprocal Rank Fusion + cross-encoder rerank (MiniLM). Measured uplift: +21.8% MRR and +18.0% nDCG@10 over a 120+ query evaluation harness. Strong opinions on eval harnesses, content hashing for dedup, and citation-aware grounding.",
  },
  {
    id: "publications",
    keywords: ["publications", "papers", "patent", "ip", "research", "ieee"],
    title: "Publications & IP",
    body: "Registered Indian IP on emoji-aware hate speech classification with Bi-LSTM + GloVe. Two IEEE papers on hate-speech detection — one comparing vectorization techniques, one introducing emoji-based classification — both from 2024.",
  },
  {
    id: "metrics",
    keywords: ["metrics", "results", "numbers", "impact", "outcomes"],
    title: "Shipped metrics",
    body: "1M+ multi-region records processed. 99.3% F1, 99.9% coverage on multi-modal alignment. +35% recall on medical anomaly detection. −30% p95 latency on quantized transformer inference. −25% forecast MAPE. +21.8% MRR, +18.0% nDCG@10 on hybrid retrieval. Faithfulness 0.505 → 0.616 on RAG grounding.",
  },
  {
    id: "availability",
    keywords: ["available", "hiring", "open", "opportunities", "hire", "looking", "role"],
    title: "Availability",
    body: "Open to full-time SDE / SWE / AI & ML Engineer / Applied AI roles starting 2026. Comfortable with both research-adjacent and product engineering environments. Los Angeles-based, open to relocation.",
  },
  {
    id: "contact",
    keywords: ["contact", "reach", "email", "linkedin", "github", "hire", "reach", "message"],
    title: "Get in touch",
    body: "Best channels: email sdalavi@usc.edu or sushildalavi@gmail.com, LinkedIn, and GitHub. Replies typically within a day.",
    links: [
      { label: "Email", href: "mailto:sdalavi@usc.edu" },
      { label: "LinkedIn", href: "https://linkedin.com/in/sushildalavi" },
      { label: "GitHub", href: "https://github.com/sushildalavi" },
    ],
  },
  {
    id: "location",
    keywords: ["where", "location", "based", "live", "city", "la", "los angeles"],
    title: "Location",
    body: "Los Angeles, CA. Originally from Mumbai, India.",
  },
  {
    id: "interests",
    keywords: ["interests", "hobbies", "football", "real madrid", "anime", "life", "personal"],
    title: "Off-hours",
    body: "Real Madrid supporter (Hala Madrid y nada más). Swimming, table tennis, and serious anime watching. Always got music on — usually via Spotify.",
  },
  {
    id: "stack-rec",
    keywords: ["why", "opinion", "prefer", "favorite", "choice"],
    title: "Engineering opinions",
    body: "Strong priors: eval harnesses before model changes, dashboards before deploy, reproducibility is non-negotiable. Prefers Temporal over custom retry scaffolding for any non-trivial workflow. Hybrid retrieval beats pure dense for production RAG, almost always. Quantization + batched serving gets most teams the p95 wins they need.",
  },
]

const STOP = new Set([
  "a", "an", "the", "is", "are", "do", "does", "what", "how", "why", "tell",
  "me", "about", "of", "on", "in", "to", "for", "and", "or", "with", "his",
  "has", "have", "had", "your", "you", "can", "could", "would", "should",
  "i", "am", "it", "that", "this", "these", "those",
])

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
}

export interface MatchedAnswer {
  title: string
  body: string
  links?: Fact["links"]
  score: number
}

/**
 * Score each fact against the query via keyword overlap + title hits.
 * Returns up to `limit` facts ranked by score, plus a fallback if
 * nothing scores above zero.
 */
export function match(query: string, limit = 2): MatchedAnswer[] {
  const tokens = tokenize(query)
  if (tokens.length === 0) {
    return [
      {
        title: "Try asking…",
        body: "What does Sushil currently work on? What projects has he shipped? What's his stack? Is he available to hire? How do I reach him?",
        score: 1,
      },
    ]
  }

  const scored = facts.map((f) => {
    let score = 0
    for (const t of tokens) {
      if (f.keywords.includes(t)) score += 3
      else if (f.keywords.some((k) => k.includes(t) || t.includes(k))) score += 1.5
      if (f.title.toLowerCase().includes(t)) score += 1
      if (f.body.toLowerCase().includes(t)) score += 0.5
    }
    return { fact: f, score }
  })

  const hits = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  if (hits.length === 0) {
    return [
      {
        title: "Not sure I have that in my knowledge base",
        body: "I can tell you about Sushil's current role, past work at Reliance Jio, shipped projects (JobSense, ScribeAI, ScholarRAG), technical stack, education, publications, or how to reach him. What would you like to know?",
        score: 0,
      },
    ]
  }

  return hits.map(({ fact, score }) => ({
    title: fact.title,
    body: fact.body,
    links: fact.links,
    score,
  }))
}
