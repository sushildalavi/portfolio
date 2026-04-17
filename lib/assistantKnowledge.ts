/**
 * Knowledge base for the on-site AI assistant.
 *
 * Each entry has a body that can contain Markdown-lite formatting:
 *   **bold**, `code`, line breaks, and bullet lines starting with "- ".
 * The renderer in AIAssistant handles those inline.
 *
 * Upgrade path (turning this into a real LLM-backed bot):
 *   1. Deploy a Cloudflare Worker or Vercel Edge Function.
 *   2. In the Worker, concatenate the top-N matched `body` strings as
 *      retrieved context, wrap with a Sushil-voice system prompt, and
 *      call Claude or GPT-4o.
 *   3. Swap `match()` in this file for a fetch call to that Worker;
 *      everything else (UI, streaming, message shape) already lines up.
 */

export interface Fact {
  id: string
  keywords: string[]
  title: string
  /** Markdown-lite: **bold**, `code`, "- " bullets, line breaks. */
  body: string
  links?: { label: string; href: string }[]
  followUps?: string[]
}

export const facts: Fact[] = [
  {
    id: "intro",
    keywords: ["who", "hi", "hello", "hey", "introduction", "about", "yourself"],
    title: "Who is Sushil?",
    body:
      "**Sushil Dalavi** — AI Engineer at the USC Annenberg Norman Lear Center and MS Computer Science candidate at USC (2024 – 2026).\n\nHe architects production AI systems end-to-end: AWS data platforms, hybrid retrieval pipelines, distributed workflow engines, and multi-modal ML. Bias toward measurable outcomes and reproducibility — *if a number isn't on a dashboard, it didn't happen*.",
    followUps: [
      "What's he working on now?",
      "Walk me through his projects",
      "How do I reach him?",
    ],
  },
  {
    id: "role-current",
    keywords: ["role", "current", "job", "position", "now", "working", "usc", "annenberg", "lear", "norman"],
    title: "Current role · USC Annenberg NLC",
    body:
      "**AI Engineer** at USC Annenberg Norman Lear Center (Los Angeles, CA) since **June 2025**.\n\nShipped so far:\n- **AWS data platform** (S3, Glue, SageMaker, Bedrock) ingesting **1M+ multi-region records**, deduplicated and normalized for downstream ML.\n- **Multi-modal alignment system** fusing audio, speaker diarization, and caption streams — **99.3% F1**, **99.9% coverage** on ground-truth eval.\n- **Batch pipelines** for long-form video/audio: Whisper ASR → pyannote diarization → model-based refinement.\n- **Dataset QA** automation (Unicode normalization, dedup) lifting analysis-ready yield from **10,819 → 9,735 records**.",
    followUps: ["What stack did he use?", "What's before USC?", "Who's he collaborating with?"],
  },
  {
    id: "jio",
    keywords: ["jio", "reliance", "previous", "prior", "past", "before", "india", "mumbai"],
    title: "Reliance Jio · Software Engineer",
    body:
      "**Software Engineer** at Reliance Jio Platforms (Dec 2023 – Jul 2024, Navi Mumbai).\n\n- Deployed **ResNet-50 / DenseNet-121** for medical image anomaly detection — **+35% recall** via transfer learning, augmentation, loss tuning.\n- **Quantized transformer inference** (BERT, GPT-2) with batched serving — **−30% p95 latency**, preserved 20% accuracy gains.\n- **Demand-forecasting microservices** (TFT, CatBoost, LSTM) over Hive SQL pipelines — **forecast MAPE cut 25%**.\n- Shipped **shadow-testing + canary-release workflows** for 3 production ML upgrades — caught 2 latency regressions before fleet-wide deploy.",
  },
  {
    id: "education",
    keywords: ["education", "degree", "school", "university", "usc", "mumbai", "masters", "bachelor", "study", "coursework"],
    title: "Education",
    body:
      "**MS in Computer Science · USC** (Aug 2024 – May 2026)\n- Coursework: Machine Learning, Deep Learning, Distributed Systems, Information Retrieval, NLP.\n\n**BE in Computer Engineering · University of Mumbai** (Jun 2019 – May 2023)\n- Coursework: OS, Distributed Systems, Computer Networks, Data Structures & Algorithms.",
  },
  {
    id: "projects",
    keywords: ["projects", "built", "shipped", "portfolio", "case", "studies", "what", "made"],
    title: "Flagship projects",
    body:
      "Three case studies up top:\n\n- **JobSense** — durable workflow platform on Temporal with 12 tool integrations, Redis semantic caching, CI regression gates.\n- **ScribeAI** — async FastAPI inference service with SSE streaming, multi-backend routing (GPT-4o, Claude), MLflow-tracked evaluation, 10+ PII types redacted at the entity level.\n- **ScholarRAG** — hybrid retrieval pipeline (dense + BM25 + RRF + MiniLM rerank) lifting **MRR by 21.8%** and **nDCG@10 by 18.0%** over a 120+ query harness.",
    followUps: [
      "Tell me more about JobSense",
      "What's ScribeAI?",
      "ScholarRAG numbers?",
    ],
  },
  {
    id: "jobsense",
    keywords: ["jobsense", "job", "sense", "temporal", "workflow", "orchestration", "durable", "fault"],
    title: "JobSense · Durable Workflow Platform",
    body:
      "Fault-tolerant orchestration platform.\n\n**Orchestration**\n- Temporal-based durable workflows with 12 tool integrations\n- Automated retries, human-in-the-loop checkpoints, end-to-end observability\n\n**Inference gateway**\n- Provider-agnostic with multi-backend failover\n- Redis semantic caching, structured-output validation\n- CI regression gates block merges on quality or cost drift\n\n**Retrieval**\n- Hybrid (BM25 + dense vector + cross-encoder rerank) fused with Reciprocal Rank Fusion, benchmarked end-to-end\n\n**Stack:** `Python` · `FastAPI` · `Temporal` · `PostgreSQL` · `Redis`",
  },
  {
    id: "scribeai",
    keywords: ["scribe", "scribeai", "inference", "evaluation", "mlflow", "streaming", "sse", "pii"],
    title: "ScribeAI · Inference + Evaluation",
    body:
      "Async FastAPI inference service with a rigorous evaluation pipeline.\n\n**Service**\n- SSE streaming for real-time token delivery\n- Multi-backend routing across GPT-4o, Claude, and a fallback engine\n- Graceful degradation under upstream failure\n\n**Evaluation**\n- MLflow-tracked harness runs ROUGE, BLEU, BERTScore, faithfulness, leakage checks on every model change\n- Automated regression alerts on metric drift\n\n**Compliance pipeline**\n- Entity-level redaction across **10+ PII types**\n- Encrypted storage via `pgcrypto`\n- Append-only audit log for traceability\n\n**Stack:** `Python` · `FastAPI` · `Qdrant` · `MLflow` · `pgcrypto`",
  },
  {
    id: "scholarrag",
    keywords: ["scholar", "scholarrag", "rag", "retrieval", "pgvector", "hybrid", "minilm", "mrr", "ndcg", "faithfulness"],
    title: "ScholarRAG · Retrieval System",
    body:
      "Retrieval and data engineering system for scholarly discovery.\n\n**Hybrid pipeline**\n- Dense embeddings + BM25 + RRF + MiniLM cross-encoder rerank\n- **MRR lifted 21.8%**, **nDCG@10 lifted 18.0%** over a 120+ query eval harness\n\n**Data engineering**\n- DOI / ID / title normalization + SHA-256 content hashing\n- Duplicate indexing reduced **50%**\n- Re-ingestion time reduced **60%**\n\n**Grounding**\n- Evidence-constrained generation with citation-aware prompting\n- Faithfulness **0.505 → 0.616**\n- Claim support **45.4% → 85.6%**\n\n**Stack:** `Python` · `FastAPI` · `pgvector` · `PostgreSQL` · `MiniLM`",
  },
  {
    id: "skills",
    keywords: ["skills", "stack", "tools", "languages", "tech", "toolchain", "tools", "technology"],
    title: "Toolchain",
    body:
      "**Languages** — Python, C++, Go, SQL, Bash, TypeScript, JavaScript.\n\n**ML & Deep Learning** — PyTorch, Hugging Face, ONNX Runtime, Quantization, LoRA/PEFT, Fine-Tuning, Distributed Training, MLflow.\n\n**LLMs & Retrieval** — Prompt Engineering, Function Calling, Structured Outputs, RAG, Hybrid Retrieval, Reranking, pgvector, Qdrant, RAGAS.\n\n**Backend & Data Systems** — FastAPI, Temporal, gRPC, REST, SSE, Kafka, Spark, PostgreSQL, Redis, MongoDB.\n\n**Cloud & DevOps** — AWS (S3, Glue, SageMaker, Bedrock), GCP, Docker, Kubernetes, Linux, GitHub Actions, Prometheus, Grafana, Airflow.",
  },
  {
    id: "aws",
    keywords: ["aws", "cloud", "sagemaker", "bedrock", "glue", "s3", "athena"],
    title: "AWS experience",
    body:
      "Architected the NLC's multi-region ingestion platform on **S3 + Glue + SageMaker + Bedrock** — 1M+ records deduplicated and normalized for downstream ML training and retrieval workloads.\n\nAlso comfortable with GCP, Docker, Kubernetes, and full CI/CD on GitHub Actions with Prometheus/Grafana observability.",
  },
  {
    id: "llm",
    keywords: ["llm", "gpt", "claude", "model", "inference", "anthropic", "openai", "prompt"],
    title: "LLM systems",
    body:
      "Built **provider-agnostic inference gateways** with multi-backend failover across OpenAI (GPT-4o) and Anthropic (Claude) plus fallback engines.\n\nShipped **MLflow-tracked evaluation harnesses** covering ROUGE, BLEU, BERTScore, faithfulness, and leakage — so regressions ship to a dashboard before they ship to users.\n\nDeep experience with quantized transformer inference (BERT, GPT-2) — **−30% p95 latency** while preserving 20% accuracy gains.",
  },
  {
    id: "retrieval",
    keywords: ["retrieval", "rag", "search", "rerank", "embedding", "vector", "bm25", "dense"],
    title: "Retrieval systems",
    body:
      "Hybrid retrieval is a recurring theme:\n\n- **Dense embeddings** (text-embedding-3-large, MiniLM) + **BM25** + **Reciprocal Rank Fusion** + **cross-encoder rerank**\n- Measured uplift: **+21.8% MRR**, **+18.0% nDCG@10** on a 120+ query evaluation harness (ScholarRAG)\n- **SHA-256 content hashing** for dedup, DOI/ID normalization across heterogeneous sources\n\nStrong opinions on eval harnesses, citation-aware grounding, and why pure-dense retrieval is rarely the right answer in production.",
  },
  {
    id: "publications",
    keywords: ["publications", "papers", "patent", "ip", "research", "ieee"],
    title: "Publications & IP",
    body:
      "- **Indian IP (2024)** — Hate speech detection via emoji-based classification using Bi-LSTM and GloVe embeddings.\n- **IEEE (2024)** — Comparative Analysis of Vectorization Techniques and ML Models for Hate Speech Detection.\n- **IEEE (2024)** — Enhancing Hate Speech Detection using Emoji-Based Classification with Bi-LSTM and GloVe Embeddings.",
  },
  {
    id: "metrics",
    keywords: ["metrics", "results", "numbers", "impact", "outcomes", "wins", "best"],
    title: "Shipped metrics — the highlight reel",
    body:
      "- **1M+** multi-region records processed\n- **99.3% F1** · **99.9% coverage** · multi-modal alignment\n- **+35%** recall · medical anomaly detection\n- **−30%** p95 latency · quantized transformer inference\n- **−25%** forecast MAPE · TFT/CatBoost/LSTM pipeline\n- **+21.8% MRR** · **+18.0% nDCG@10** · hybrid retrieval\n- Faithfulness **0.505 → 0.616** · Claim support **45.4% → 85.6%**",
  },
  {
    id: "availability",
    keywords: ["available", "hiring", "open", "opportunities", "hire", "looking", "fulltime", "intern"],
    title: "Availability",
    body:
      "**Open to full-time SDE / SWE / AI & ML Engineer / Applied AI roles starting 2026.**\n\nComfortable with both research-adjacent and product engineering environments. LA-based, open to relocation. Fast replies (within a day), tight collaboration, writes and reviews well.",
    links: [{ label: "Résumé (PDF)", href: "/resume.pdf" }],
  },
  {
    id: "contact",
    keywords: ["contact", "reach", "email", "linkedin", "github", "message", "connect"],
    title: "Get in touch",
    body:
      "Best channels:\n- Email — `sdalavi@usc.edu` or `sushildalavi@gmail.com`\n- LinkedIn — /in/sushildalavi\n- GitHub — /sushildalavi\n\nReplies within a day.",
    links: [
      { label: "Email", href: "mailto:sdalavi@usc.edu" },
      { label: "LinkedIn", href: "https://linkedin.com/in/sushildalavi" },
      { label: "GitHub", href: "https://github.com/sushildalavi" },
    ],
  },
  {
    id: "location",
    keywords: ["where", "location", "based", "live", "city", "la", "los", "angeles"],
    title: "Location",
    body: "**Los Angeles, CA.** Originally from Mumbai, India. Open to relocation for the right role.",
  },
  {
    id: "interests",
    keywords: ["interests", "hobbies", "football", "real", "madrid", "anime", "life", "personal", "fun"],
    title: "Off-hours",
    body:
      "- **Real Madrid** supporter — *Hala Madrid y nada más*.\n- Swimming, table tennis, serious anime watching.\n- Always got music on — usually via Spotify.\n- Kind of a webseries + binge watching person.",
  },
  {
    id: "opinions",
    keywords: ["why", "opinion", "prefer", "favorite", "choice", "belief", "philosophy"],
    title: "Engineering opinions",
    body:
      "Strong priors:\n- **Eval harnesses before model changes.** Dashboards before deploy.\n- **Temporal beats custom retry scaffolding** for any non-trivial workflow.\n- **Hybrid retrieval beats pure dense** for production RAG, almost always.\n- **Quantization + batched serving** gets most teams the p95 wins they're looking for.\n- **Reproducibility is non-negotiable** — if you can't rerun it, you didn't ship it.",
  },
]

const STOP = new Set([
  "a", "an", "the", "is", "are", "do", "does", "what", "how", "why", "tell",
  "me", "about", "of", "on", "in", "to", "for", "and", "or", "with", "his",
  "has", "have", "had", "your", "you", "can", "could", "would", "should",
  "i", "am", "it", "that", "this", "these", "those", "when", "did",
])

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
}

export interface MatchedAnswer {
  id: string
  title: string
  body: string
  links?: Fact["links"]
  followUps?: string[]
  score: number
}

export function match(query: string, limit = 2): MatchedAnswer[] {
  const tokens = tokenize(query)
  if (tokens.length === 0) {
    return [
      {
        id: "start",
        title: "Ask about…",
        body:
          "Try one of these:\n- What is Sushil working on right now?\n- Walk me through **JobSense**\n- What are the retrieval numbers?\n- How do I reach him?",
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
      if (f.body.toLowerCase().includes(t)) score += 0.4
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
        id: "unknown",
        title: "Not in my notes yet",
        body:
          "I can talk about his **current role** at USC Annenberg, past work at **Reliance Jio**, shipped projects (**JobSense**, **ScribeAI**, **ScholarRAG**), technical stack, publications, metrics, or how to reach him. What sounds interesting?",
        followUps: [
          "What's he working on now?",
          "Show me his best metrics",
          "How do I contact him?",
        ],
        score: 0,
      },
    ]
  }

  return hits.map(({ fact, score }) => ({
    id: fact.id,
    title: fact.title,
    body: fact.body,
    links: fact.links,
    followUps: fact.followUps,
    score,
  }))
}
