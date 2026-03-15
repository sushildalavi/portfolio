export interface Publication {
  id: string
  title: string
  type: "patent" | "paper"
  venue: string
  year: string
  description: string
  link?: string
}

export const publications: Publication[] = [
  {
    id: "ip-emosentry",
    title:
      "Hate Speech Detection through Emoji-Based Classification Using Bi-LSTM and GloVe Embeddings",
    type: "patent",
    venue: "Government of India — Intellectual Property",
    year: "2024",
    description:
      "Registered intellectual property for a novel approach to emoji-aware hate speech classification using deep learning architectures.",
  },
  {
    id: "ieee-comparative",
    title:
      "Comparative Analysis of Vectorization Techniques and ML Models for Hate Speech Detection",
    type: "paper",
    venue: "IEEE",
    year: "2024",
    description:
      "Comprehensive benchmarking of feature extraction methods and classification architectures for toxicity detection.",
  },
  {
    id: "ieee-emoji",
    title:
      "Enhancing Hate Speech Detection using Emoji-Based Classification with Bi-LSTM and GloVe Embeddings",
    type: "paper",
    venue: "IEEE",
    year: "2024",
    description:
      "Novel deep learning approach integrating emoji semantics into hate speech classification pipelines for improved moderation.",
  },
]
