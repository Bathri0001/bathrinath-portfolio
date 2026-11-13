import { docs, type Doc } from "./documents";

export type EduStep = {
  tag: string;
  level: string;
  degree: string;
  school: string;
  place: string;
  period: string;
  score?: string;
  details?: string[];
  status?: string;
  docs: Doc[];
};

/** Descending timeline: latest (MCA) first, 10th last. */
export const education: EduStep[] = [
  {
    tag: "INTERN",
    level: "Internship",
    degree: "AI Intern — ONGC Document Intelligence System",
    school: "ONGC — Infocom Services, Cauvery Asset",
    place: "Karaikal, India",
    period: "Mar 2026 – Apr 2026",
    details: ["Built an LLM-powered RAG pipeline with Qdrant vector search across 100+ documents."],
    docs: [docs.ongc],
  },
  {
    tag: "MCA",
    level: "Postgraduate",
    degree: "Master of Computer Applications (MCA)",
    school: "Puducherry Technological University",
    place: "Puducherry, India",
    period: "2024 – 2026",
    score: "CGPA 7.6 / 10",
    docs: [docs.mcaSem1, docs.mcaSem2, docs.mcaSem4, docs.mcaCumulative],
  },
  {
    tag: "BSC",
    level: "Undergraduate",
    degree: "B.Sc. Physics",
    school: "Government Arts College (Autonomous), Kumbakonam",
    place: "Tamil Nadu, India",
    period: "2021 – 2024",
    score: "CGPA 7.87 / 10",
    details: ["Bharathidasan University · Degree examination April 2024"],
    docs: [docs.bsc],
  },
  {
    tag: "HSC",
    level: "Higher Secondary (12th)",
    degree: "HSC — Higher Secondary Course",
    school: "Government Higher Secondary School, Poonthottam",
    place: "Tamil Nadu, India",
    period: "2019 – 2021",
    score: "81%",
    details: ["490.42 / 600 · General Education · May 2021"],
    docs: [docs.hsc],
  },
  {
    tag: "SSLC",
    level: "Secondary (10th)",
    degree: "SSLC — Secondary School Leaving Certificate",
    school: "Government Higher Secondary School, Poonthottam",
    place: "Tamil Nadu, India",
    period: "2018 – 2019",
    score: "74%",
    details: ["370 / 500"],
    docs: [docs.sslc],
  },
];
