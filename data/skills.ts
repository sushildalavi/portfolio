export interface SkillGroup {
  title: string
  icon: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "AI / ML",
    icon: "Brain",
    skills: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Transformers",
      "LoRA",
      "NumPy",
      "Pandas",
      "CNNs",
      "LSTMs",
      "OpenAI",
      "Hugging Face",
    ],
  },
  {
    title: "NLP / Retrieval",
    icon: "Search",
    skills: [
      "RAG",
      "LangChain",
      "FAISS",
      "pgvector",
      "BM25",
      "Embeddings",
      "BERT",
      "XLM-RoBERTa",
      "GPT",
      "MiniLM",
      "Reranking",
    ],
  },
  {
    title: "Backend / APIs",
    icon: "Server",
    skills: [
      "Python",
      "FastAPI",
      "Flask",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Microservices",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Supabase",
    ],
  },
  {
    title: "Cloud / DevOps",
    icon: "Cloud",
    skills: [
      "AWS",
      "SageMaker",
      "Docker",
      "Git",
      "GitHub Actions",
      "Vercel",
      "Railway",
      "EC2",
      "S3",
      "Lambda",
      "Jenkins",
    ],
  },
  {
    title: "Languages",
    icon: "Code2",
    skills: [
      "Python",
      "TypeScript",
      "JavaScript",
      "Java",
      "C++",
      "C#",
      "SQL",
      "Bash",
    ],
  },
  {
    title: "Frontend / Other",
    icon: "BarChart3",
    skills: [
      "React",
      "Next.js",
      "TailwindCSS",
      "Unity",
      "Tableau",
      "Spark",
      "Pandas",
      "Matplotlib",
    ],
  },
]
