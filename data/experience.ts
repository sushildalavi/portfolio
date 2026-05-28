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
    role: "Software Engineer - AI Infrastructure",
    period: "Jun 2025 — May 2026",
    location: "Los Angeles, CA",
    description:
      "Built production-style AI data infrastructure, ingestion automation, and validation services for large-scale multilingual social and media datasets.",
    achievements: [
      "Delivered 1M+ validated multilingual records across 3 country datasets through an AWS pipeline (S3, Glue, Athena, Lambda) with schema-versioned outputs",
      "Reduced manual validation workload by 85% by automating LLM-output checks via FastAPI orchestration, OpenAI/Gemini fallback routing, Pydantic schema validation, JSON repair, and retry logic",
      "Engineered an authenticated GraphQL ingestion workflow with Playwright, session refresh, structured retries, and parse validation for long-running social data pulls",
      "Shortened media-to-transcript turnaround by 40% by parallelizing async stages for download, speech-to-text, speaker diarization, and structured transcript export",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "AWS",
      "S3",
      "Glue",
      "Athena",
      "Lambda",
      "GraphQL",
      "Playwright",
      "Pydantic",
    ],
  },
  {
    id: "jio",
    company: "Reliance Jio Platforms",
    role: "Software Engineer",
    period: "Dec 2023 — Jul 2024",
    location: "Navi Mumbai, India",
    description:
      "Built and optimized high-throughput backend services and distributed data flows across inventory and service-management systems.",
    achievements: [
      "Cut p99 latency from 2.8s to 480ms at 1,500+ RPS by profiling hot paths, adding targeted MySQL composite indexes, and isolating high-frequency reads with Redis look-aside caching",
      "Eliminated recurring OOM failures in a 25K+ file document pipeline by redesigning uploads into a Kafka-orchestrated chunked streaming flow to AWS S3",
      "Standardized Java/Kotlin service contracts and shared domain models across 6 Spring Boot microservices for inventory, operations, and service-management domains",
      "De-risked 3 major upgrades with NGINX traffic shadowing and canary rollouts, catching 2 high-severity regressions before customer impact",
    ],
    technologies: [
      "Java",
      "Kotlin",
      "Spring Boot",
      "Python",
      "MySQL",
      "Redis",
      "Kafka",
      "AWS S3",
      "NGINX",
    ],
  },
]
