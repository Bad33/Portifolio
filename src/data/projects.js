export const projects = [
  {
    id: "policyproof",
    number: "01",
    title: "PolicyProof",
    eyebrow: "Flagship research engineering system",
    status: "In active development",
    summary:
      "A reproducible retrieval and citation-verification system for public AI-governance documents, built around deterministic evaluation, provenance, abstention, and evidence sufficiency.",
    impact:
      "Turns retrieval quality and source grounding into inspectable, versioned engineering artifacts instead of opaque demo outputs.",
    tags: ["Python", "PyTorch", "ONNX", "BM25", "Dense Retrieval", "GitHub Actions"],
    metrics: [
      { label: "Recall@10", value: "0.9688" },
      { label: "MRR@10", value: "0.9062" },
      { label: "Evidence hit@10", value: "1.0000" },
      { label: "Automated tests", value: "699+" },
    ],
    bullets: [
      "Hash-bound corpora, passages, benchmarks, model assets, and result artifacts",
      "Deterministic BM25, dense retrieval, hybrid candidate generation, and reranker comparison",
      "Leakage-safe evidence-sufficiency protocol with blinded annotation workflows",
    ],
    github: "https://github.com/Bad33/policyproof",
    demo: "policyproof",
    demoTitle: "Retrieval and evidence explorer",
    demoDescription: "Choose a policy query, compare BM25, dense, and reranker orderings, then inspect representative evidence and provenance.",
  },
  {
    id: "claimpilot",
    number: "02",
    title: "ClaimPilot",
    eyebrow: "Explainable AI workflow platform",
    status: "Portfolio-ready system",
    summary:
      "An insurance claims document-intelligence platform that extracts structured fields, produces grounded summaries, predicts complexity, recommends routing, and records an audit trail.",
    impact:
      "Demonstrates how LLM assistance, classical ML, rules, evidence, and human review can work together in an operational workflow.",
    tags: ["FastAPI", "PostgreSQL", "OpenAI API", "scikit-learn", "React", "Docker"],
    metrics: [
      { label: "Workflow", value: "6 stages" },
      { label: "Explainability", value: "Evidence-backed" },
      { label: "Fallback", value: "Deterministic" },
      { label: "Output", value: "Auditable" },
    ],
    bullets: [
      "PDF/TXT intake with normalized text and document metadata",
      "Confidence-scored extraction with source snippets and reason codes",
      "ML complexity prediction plus rule-based routing and audit events",
    ],
    github: "https://github.com/Bad33/claimpilot",
    demo: "claimpilot",
    demoTitle: "End-to-end claims workflow",
    demoDescription: "Run a synthetic claim through intake, extraction, grounded summarization, triage, and an auditable decision package.",
  },
  {
    id: "structural",
    number: "03",
    title: "Structural Analysis Platform",
    eyebrow: "Scientific and engineering software",
    status: "Delivered for engineering use",
    summary:
      "A C#/.NET desktop application that automated structural load calculations for elevated steel water-tank projects and packaged the workflow for non-technical engineering users.",
    impact:
      "Reduced repetitive manual calculations while preserving numerical validation and a deployable Windows workflow.",
    tags: ["C#", ".NET", "SQLite", "Scientific Computing", "Numerical Validation", "Windows"],
    metrics: [
      { label: "Time reduction", value: "~60%" },
      { label: "Validation", value: "Benchmarked" },
      { label: "Storage", value: "SQLite" },
      { label: "Delivery", value: "Installer" },
    ],
    bullets: [
      "Automated gravity, wind, seismic, and engineering load workflows",
      "Validated outputs against verified calculation benchmarks",
      "Delivered a self-contained installer for engineering users",
    ],
    github: null,
    demo: "structural",
    demoTitle: "Sanitized load-case simulator",
    demoDescription: "Change tank geometry and illustrative loading inputs to explore the interaction pattern of the delivered engineering application.",
  },
  {
    id: "spatial-alert",
    number: "04",
    title: "Spatial Alert",
    eyebrow: "Geospatial machine-learning prototype",
    status: "Prototype",
    summary:
      "A spatial risk exploration prototype combining location-aware signals, clustering, and alert-oriented visualization.",
    impact:
      "Explores how geospatial ML outputs can be transformed into understandable, actionable risk surfaces.",
    tags: ["Python", "Geospatial Data", "Clustering", "Anomaly Detection", "Visualization"],
    metrics: [
      { label: "Interface", value: "Map-first" },
      { label: "Signals", value: "Multi-source" },
      { label: "Analysis", value: "Clustered" },
      { label: "Status", value: "Prototype" },
    ],
    bullets: [
      "Location-aware risk layers and threshold-driven alert exploration",
      "Clustering and anomaly-oriented analysis",
      "Visual communication designed for non-model users",
    ],
    github: "https://github.com/Bad33/Spatial-alert-prototype",
    demo: "spatial",
    demoTitle: "Simulated emergency-alert map",
    demoDescription: "Move the alert origin, tune radius and risk thresholds, inspect zones, and dispatch a completely simulated alert event.",
  },
];
