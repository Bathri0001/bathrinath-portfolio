import { docs, type Doc } from "./documents";

export const certifications: { title: string; issuer: string; date: string; note: string; doc: Doc }[] = [
  {
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata / Forage",
    date: "July 4, 2025",
    note: "EDA & risk profiling, AI-driven delinquency prediction, data storytelling, GenAI-powered collections strategy.",
    doc: docs.genai,
  },
  {
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata / Forage",
    date: "February 20, 2024",
    note: "IAM fundamentals, IAM strategy assessment, custom IAM solutions, platform integration.",
    doc: docs.cyber,
  },
];

export const achievements: { title: string; note: string; doc: Doc }[] = [
  { title: "Paper Presentation — JIGYASA 2025", note: "National Level Technical Symposium · Puducherry Technological University · April 2025", doc: docs.jigyasa },
  { title: "Winner — Colossal Connections", note: "NEXUS-2K24 · A.D.M College for Women, Nagapattinam · February 2024", doc: docs.colossal },
  { title: "Government Certified Senior Grade, English Typewriting", note: "Government Technical Examinations, Tamil Nadu · First Class · February 2024", doc: docs.typing },
  { title: "Participant — Quiz Quest", note: "Computer and Multimedia Club, PTU · February 2026", doc: docs.quizQuest },
  { title: "Participant — Quizzy Dizzy", note: "NEXUS-2K24 Intercollegiate Meet · February 2024", doc: docs.quizzy },
];
