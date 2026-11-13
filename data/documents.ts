/** A viewable / downloadable PDF stored in /public/certificates */
export type Doc = { title: string; file: string };
const f = (name: string) => `/certificates/${name}.pdf`;

export const docs = {
  mcaSem1: { title: "MCA Semester 1 Grade Sheet", file: f("mca-semester-1-grade-sheet") },
  mcaSem2: { title: "MCA Semester 2 Grade Sheet", file: f("mca-semester-2-grade-sheet") },
  mcaSem4: { title: "MCA Semester 4 Grade Sheet", file: f("PG_4_SEM") },
  mcaCumulative: { title: "MCA Cumulative Grade Sheet", file: f("PG_CUMULATIVE") },
  bsc: { title: "B.Sc. Provisional Certificate", file: f("bsc-provisional-certificate") },
  hsc: { title: "HSC Mark Certificate", file: f("hsc-marksheet") },
  sslc: { title: "SSLC Mark Certificate", file: f("sslc-marksheet") },
  ongc: { title: "ONGC Certificate of Appreciation", file: f("ongc-certificate-of-appreciation") },
  genai: { title: "GenAI Powered Data Analytics Job Simulation", file: f("tata-genai-data-analytics") },
  cyber: { title: "Cybersecurity Analyst Job Simulation", file: f("tata-cybersecurity-analyst") },
  jigyasa: { title: "JIGYASA 2025 — Paper Presentation", file: f("jigyasa-2025-paper-presentation") },
  colossal: { title: "NEXUS-2K24 — Colossal Connections", file: f("nexus-2k24-colossal-connections") },
  quizzy: { title: "NEXUS-2K24 — Quizzy Dizzy", file: f("nexus-2k24-quizzy-dizzy") },
  quizQuest: { title: "Quiz Quest — PTU Computer & Multimedia Club", file: f("ptu-quiz-quest-2026") },
  typing: { title: "Senior Grade English Typewriting", file: f("senior-typewriting-certificate") },
} satisfies Record<string, Doc>;
