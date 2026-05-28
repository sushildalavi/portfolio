export const profile = {
  name: "Sushil Dalavi",
  role: "Software Engineer · AI Infrastructure",
  headline: "Scalable Backend Systems\nfor AI, Data & Reliability",
  description:
    "SDE-AI engineer building backend platforms, observability-first data systems, and production AI infrastructure that hold up under real traffic.",
  about: {
    paragraphs: [
      "I build software systems that make AI usable in production: fast APIs, reliable data pipelines, resilient async workflows, and strong observability.",
      "At USC Annenberg, I delivered 1M+ validated multilingual records across three country datasets on AWS and reduced manual validation by 85% with schema-checked FastAPI orchestration and fallback routing.",
      "At Reliance Jio, I cut p99 latency from 2.8s to 480ms at 1,500+ RPS using indexing and Redis caching, and redesigned a large document pipeline to eliminate OOM failures via Kafka-backed chunked streaming to S3.",
      "I focus on measurable engineering outcomes: throughput, latency, failure recovery, and reproducibility.",
    ],
    focus: [
      "Backend Engineering · FastAPI · Spring Boot",
      "Distributed Systems · Async Workflows · Replay",
      "Data Infrastructure · AWS · Streaming",
      "API Contracts · Reliability · Observability",
      "AI Infrastructure · Inference Platforms",
      "Performance Engineering · Load & Latency",
    ],
  },
  education: [
    {
      degree: "MS in Computer Science",
      school: "University of Southern California",
      shortName: "USC",
      location: "Los Angeles, CA",
      period: "Aug 2024 — May 2026",
      coursework: [
        "Analysis of Algorithms",
        "Database Systems",
        "Information Retrieval",
        "Applied Cryptography",
      ],
      logo: "/logos/usc-official.svg",
      accentColor: "#ffffff",
    },
    {
      degree: "BE in Computer Engineering",
      school: "University of Mumbai",
      shortName: "MU",
      location: "Mumbai, India",
      period: "Jun 2019 — May 2023",
      coursework: [
        "Operating Systems",
        "Distributed Systems",
        "Computer Networks",
        "Data Structures & Algorithms",
      ],
      logo: "/logos/mumbai.jpeg",
      accentColor: "#ffffff",
    },
  ],
  links: {
    email: "sdalavi@usc.edu",
    email2: "sushildalavi@gmail.com",
    github: "https://github.com/sushildalavi",
    linkedin: "https://linkedin.com/in/sushildalavi",
    resume: "/resume.pdf",
    spotify: "https://open.spotify.com/user/0q7aeehtv582g9ua2qwl2k62g",
  },
  stats: [
    { value: "1M+", label: "Records Processed" },
    { value: "99.3%", label: "Alignment F1" },
    { value: "21.8%", label: "MRR Lift" },
    { value: "30%", label: "Latency Reduction" },
  ],
  interests: [
    { label: "Football", emoji: "⚽" },
    { label: "Real Madrid", emoji: "👑" },
    { label: "Swimming", emoji: "🏊" },
    { label: "Table Tennis", emoji: "🏓" },
    { label: "Netflix", emoji: "🎬" },
    { label: "Spotify", emoji: "🎧" },
    { label: "Game Dev", emoji: "🎮" },
  ],
  realMadrid: {
    tagline: "Hala Madrid y nada más.",
    description:
      "A proud Real Madrid supporter through and through — the mentality, history, and winning culture is unmatched.",
  },
  quote: {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    coauthor: "— Michael Scott",
  },
}
