export interface SkillGroup {
  title: string
  icon: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: "Code2",
    skills: [
      "Go",
      "C++",
      "Java",
      "Kotlin",
      "Python",
      "SQL",
      "Bash",
      "TypeScript",
      "JavaScript",
    ],
  },
  {
    title: "Backend & APIs",
    icon: "Server",
    skills: [
      "Spring Boot",
      "FastAPI",
      "REST",
      "GraphQL",
      "gRPC",
      "Pydantic",
      "SQLAlchemy",
      "Hibernate",
    ],
  },
  {
    title: "Databases & Streaming",
    icon: "Database",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Kafka",
      "Redis Streams",
      "pgvector",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "Cloud",
    skills: [
      "AWS",
      "S3",
      "Glue",
      "Docker",
      "Linux",
      "NGINX",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    title: "Testing, Observability & Frontend",
    icon: "BarChart3",
    skills: [
      "Pytest",
      "JUnit",
      "Playwright",
      "Prometheus",
      "Grafana",
      "React",
      "Vite",
      "Tailwind CSS",
    ],
  },
]
