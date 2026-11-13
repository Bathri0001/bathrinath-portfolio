import { docs } from "./documents";

export const experience = [
  {
    company: "ONGC — Infocom Services, Cauvery Asset",
    role: "AI Intern / AI Web Developer",
    period: "March 2026 – April 2026",
    location: "Karaikal, India",
    project: "ONGC Document Intelligence System",
    description:
      "Developed an LLM-powered RAG pipeline supporting PDF, PPTX, XLSX, DOCX, and image files, using Qdrant vector search across 100+ documents.",
    metrics: [
      { value: "5", label: "supported file types" },
      { value: "100+", label: "documents searched" },
      { value: "~60%", label: "less manual retrieval time" },
      { value: "4+", label: "engineering divisions with better relevance" },
    ],
    docs: [docs.ongc],
  },
];
