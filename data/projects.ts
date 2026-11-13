export type FlowStep = { icon: string; label: string };
export type Category = "AI/ML" | "Web Development" | "Android";
export type Project = {
  slug: string;
  title: string;
  type: string;
  categories: Category[];
  year: string;
  summary: string;
  tech: string[];
  result?: string;
  overview: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  results?: string[];
  github?: string; // verified repository URL
  live?: string; // add a verified live demo URL here
  /** Screenshots live in public/images/<folder> and are picked up automatically. */
  folder: string;
  frame: "pc" | "phone";
  /** Floating pill in the 3D card scene */
  pill: { label: string; meta: string };
  /** Bottom-right badge — only facts taken from the resume */
  metric: { value: string; label: string };
  /** "How it works" steps shown inside the 3D scene */
  flow?: string[];
    /** 3D animated flow (icon key + short label) */
  steps?: FlowStep[];
};

export const filters: ("All" | Category)[] = ["All", "AI/ML", "Web Development", "Android"];

export const projects: Project[] = [
  {
    slug: "ongc-document-intelligence",
    title: "ONGC Document Intelligence System",
    type: "AI / RAG / Document Intelligence",
    categories: ["AI/ML", "Web Development"],
    year: "2026",
    github: "https://github.com/Bathri0001/ONGC_DRISHTI",
    folder: "ONGC",
    frame: "pc",
    pill: { label: "RAG // QDRANT", meta: "5 FILE TYPES" },
    metric: { value: "~60%", label: "less retrieval time" },
        steps: [
      { icon: "shield", label: "Secure login" },
      { icon: "upload", label: "Upload documents" },
      { icon: "database", label: "Store in Qdrant" },
      { icon: "scissors", label: "Chunking" },
      { icon: "search", label: "Search document" },
      { icon: "bot", label: "AI assistant chatbot" },
    ],
    flow: ["Upload documents", "Chunk + embed", "Qdrant vector search", "LLM answer"],
    summary:
      "An AI-powered document intelligence application combining language models, document processing, retrieval-augmented generation, and vector search to improve technical document discovery.",
    tech: ["Python", "LLMs", "RAG", "Qdrant", "Vector Search"],
    result: "~60% less manual retrieval time",
    overview:
      "Built during my AI internship at ONGC (Infocom Services, Cauvery Asset), this website lets engineering teams search technical documents in natural language instead of browsing them manually.",
    problem: "Technical knowledge was spread across many documents in different formats, so finding the right information relied on manual retrieval.",
    solution:
      "An LLM-powered RAG pipeline that processes PDF, PPTX, XLSX, DOCX and image files, indexes them with Qdrant vector search, and retrieves relevant content to answer queries.",
    architecture: ["Document upload & file-type handling", "Content extraction & chunking", "Embedding generation", "Qdrant vector index", "Semantic retrieval", "LLM answer generation"],
    results: ["Five supported file types (PDF, PPTX, XLSX, DOCX, images)", "Vector search across 100+ documents", "~60% reduction in manual document retrieval time", "Improved query relevance across 4+ engineering divisions"],
  },
  {
    slug: "trend-fusion",
    title: "Trend Fusion",
    type: "MERN Website",
    categories: ["Web Development"],
    year: "2025",
    github: "https://github.com/Bathri0001/TREND_FUSION",
    folder: "TF",
    frame: "pc",
    pill: { label: "MERN // FULL-STACK", meta: "MERN STACK" },
    metric: { value: "MERN", label: "full-stack build" },
        steps: [
      { icon: "layers", label: "MERN stack" },
      { icon: "shield", label: "Login" },
      { icon: "market", label: "Current market & media data" },
      { icon: "trend", label: "Trendings" },
      { icon: "news", label: "News" },
    ],
    flow: ["React UI", "Express API", "MongoDB"],
    summary: "A full-stack MERN website built with MongoDB, Express.js, React and Node.js.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    overview: "Trend Fusion is a full-stack website built on the MERN stack (MongoDB, Express.js, React, Node.js). See the GitHub repository for the complete source code and features.",
  },
  {
    slug: "food-recommendation-system",
    title: "Personalized Food Recommendation System",
    type: "AI / Machine Learning Website",
    categories: ["AI/ML", "Web Development"],
    year: "2025",
    github: "https://github.com/Bathri0001",
    folder: "Dine-mate",
    frame: "pc",
    pill: { label: "BERT // SHAP", meta: "EXPLAINABLE AI" },
    metric: { value: "XAI", label: "transparent suggestions" },
        steps: [
      { icon: "shield", label: "Secure login" },
      { icon: "climate", label: "Climate & allergy inputs (20k data)" },
      { icon: "food", label: "Top-rated foods (clean & preprocess)" },
      { icon: "suggest", label: "Suggestions (KNN + SVD)" },
      { icon: "trophy", label: "Top matching foods" },
      { icon: "gauge", label: "Model evaluation (admin)" },
    ],
    flow: ["Preferences", "BERT + SVT", "SHAP explains why", "Suggestions"],
    summary: "A recommendation engine combining collaborative filtering and BERT-based NLP, with explainable AI for transparent, health- and environment-aware food suggestions.",
    tech: ["Python", "BERT", "SVT", "SHAP"],
    overview: "A recommendation website that explains why each food suggestion is made.",
    problem: "Recommendation systems are often black boxes and rarely consider health or environmental impact.",
    solution: "SVT collaborative filtering is combined with BERT-based NLP, and SHAP-based explainable AI (XAI) makes each suggestion transparent.",
    architecture: ["User preference input", "SVT collaborative filtering", "BERT-based NLP", "Recommendation ranking", "SHAP explanations"],
    results: ["Transparent, explainable suggestions", "Health- and environment-aware recommendations"],
  },
  {
    slug: "university-finance-system",
    title: "University Finance Administration System",
    type: "Web Application",
    categories: ["Web Development"],
    year: "2024",
    github: "https://github.com/Bathri0001",
    folder: "UFAS",
    frame: "pc",
    pill: { label: "FINANCE // RBAC", meta: "3 USER ROLES" },
    metric: { value: "3", label: "user roles with RBAC" },
        steps: [
      { icon: "shield", label: "Authorized login" },
      { icon: "wallet", label: "Allocate budgets" },
      { icon: "receipt", label: "Track expenses" },
      { icon: "database", label: "Save data in DB" },
      { icon: "bill", label: "Generate bills" },
      { icon: "report", label: "Generate reports" },
    ],
    flow: ["Role-based login", "Fees & budget", "Dynamic SQL reports", "Receipts"],
    summary: "A university finance administration application supporting fee collection, budget allocation, financial reporting, role-based access control, and automated receipt generation.",
    tech: ["PHP", "MySQL", "JavaScript", "Spring Boot", "RBAC"],
    overview: "A web application that digitizes finance workflows for a university.",
    problem: "Fee collection, budgeting and reporting needed a structured digital workflow with controlled access.",
    solution: "Role-based access control for 3 user roles, automated receipt generation via dynamic SQL queries, and a PHP backend.",
    architecture: ["Role-based login (RBAC)", "PHP backend", "MySQL database", "Dynamic SQL reporting", "Receipt generation"],
    results: ["Digitized fee collection, budget allocation and financial reporting", "3 user roles with RBAC", "Automated receipt generation"],
  },
  {
    slug: "ptu-iqac-app",
    title: "PTU IQAC App",
    type: "Official IQAC App — Puducherry Technological University",
    categories: ["Android"],
    year: "2026",
    github: "https://github.com/Bathri0001",
    folder: "PTU",
    frame: "phone",
    pill: { label: "PTU // IQAC", meta: "OFFICIAL APP" },
    metric: { value: "Official", label: "PTU IQAC app" },
        steps: [
      { icon: "shield", label: "Authorized login" },
      { icon: "bell", label: "Notifications & events" },
      { icon: "calendar", label: "Create meetings" },
      { icon: "review", label: "Review" },
      { icon: "report", label: "Create reports" },
      { icon: "feedback", label: "Submit feedbacks" },
    ],
    summary: "The official IQAC (Internal Quality Assurance Cell) app for Puducherry Technological University.",
    tech: [],
    overview: "The official IQAC app for Puducherry Technological University (PTU).",
  },
  {
    slug: "adaptive-iq-predictor",
    title: "Adaptive IQ Predictor",
    type: "Android Application",
    categories: ["Android", "AI/ML"],
    year: "2026",
    github: "https://github.com/Bathri0001/Adaptiveiqpredictor",
    folder: "IQ",
    frame: "phone",
    pill: { label: "IRT // DECISION TREE", meta: "ROOM DB + FIREBASE" },
    metric: { value: "~87%", label: "accuracy · 1,000+ tests" },
        steps: [
      { icon: "shield", label: "Login" },
      { icon: "profile", label: "Create / update profile" },
      { icon: "brain", label: "Attend test (Decision Tree + IRT)" },
      { icon: "gauge", label: "Next question difficulty" },
      { icon: "results", label: "View results" },
      { icon: "compare", label: "Compare users" },
      { icon: "verify", label: "Validate difficulty %" },
    ],
    flow: ["Answer", "Decision Tree + IRT", "Next question", "Room DB → Firebase"],
    summary: "An adaptive IQ testing application combining a Decision Tree and Item Response Theory approach, with parameterized question generation and offline database storage synchronized through Firebase.",
    tech: ["Android", "Java", "Decision Tree", "IRT", "Firebase", "Room DB"],
    result: "~87% accuracy across 1,000+ test cases",
    overview: "An Android app that adapts the difficulty of each question to the test-taker using a hybrid Decision Tree + IRT model.",
    problem: "Fixed question sets repeat and cannot adjust to a test-taker's ability.",
    solution: "A hybrid Decision Tree + IRT model selects questions adaptively, while parameterized question generation (PQG) produces unlimited non-repeating questions. Room DB stores data offline and syncs through Firebase.",
    architecture: ["Android UI (Java)", "Decision Tree + IRT engine", "Parameterized question generator", "Room DB (offline)", "Firebase sync"],
    results: ["~87% accuracy across 1,000+ test cases", "Unlimited non-repeating questions", "Offline storage with Firebase sync"],
  },
];
