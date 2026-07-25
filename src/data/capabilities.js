export const capabilities = [
  {
    code: "01",
    title: "Evaluated AI systems",
    body: "Retrieval, reranking, RAG evaluation, evidence grounding, abstention, provenance, and reproducible model comparisons.",
    tools: ["PyTorch", "ONNX", "BM25", "Dense retrieval", "Evaluation"],
  },
  {
    code: "02",
    title: "Explainable ML products",
    body: "Operational workflows that expose evidence, confidence, reason codes, review flags, and audit history instead of returning black-box labels.",
    tools: ["scikit-learn", "LLM workflows", "FastAPI", "PostgreSQL"],
  },
  {
    code: "03",
    title: "Research software",
    body: "Scientific computing, deterministic artifacts, data provenance, benchmarking, numerical validation, and user-facing documentation.",
    tools: ["Python", "C#/.NET", "SQLite", "CI/CD", "Git"],
  },
  {
    code: "04",
    title: "Production engineering",
    body: "Full-stack systems, API design, SQL-backed applications, Docker workflows, migration work, debugging, and deployment.",
    tools: ["Angular", "React", ".NET", "REST APIs", "Docker"],
  },
];
