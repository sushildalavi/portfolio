export const profile = {
  name: "Sushil Dalavi",
  role: "Software Engineer · AI Infrastructure",
  headline: "Scalable Backend Systems\nfor AI, Data & Reliability",
  description:
    "Software engineer building backend platforms, data systems, and AI tooling that hold up under real traffic.",
  about: {
    paragraphs: [
      "I like building systems that stay calm when traffic gets messy.",
      "My work usually sits where backend and AI meet: API orchestration, data pipelines, async workers, validation layers, and observability that actually helps during incidents.",
      "At USC Annenberg, I helped turn a noisy multilingual ingestion flow into a reliable pipeline: 1M+ validated records across 3 country datasets, plus an 85% drop in manual validation through schema-checked FastAPI routing and model fallback logic.",
      "Before that at Reliance Jio, I focused on backend speed and stability - p99 dropped from 2.8s to 480ms at 1,500+ RPS, and a failure-prone document pipeline was rebuilt into Kafka-backed chunked streaming to S3 to remove OOM crashes.",
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
      degree: "Master of Science in Computer Science",
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
      logo: "/logos/usc.png",
      accentColor: "#ffffff",
    },
    {
      degree: "Bachelor of Engineering in Computer Engineering",
      school: "University of Mumbai",
      shortName: "MU",
      location: "Mumbai, India",
      period: "Aug 2019 — May 2023",
      coursework: [
        "Data Structures",
        "Operating Systems",
        "Database Management Systems",
        "Distributed Computing",
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
