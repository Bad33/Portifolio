import { useMemo, useState } from "react";

const modelMetrics = {
  BM25: {
    label: "Lexical baseline",
    metrics: ["0.7760", "0.7433", "0.9375", "0.6555"],
    note: "Transparent lexical baseline. It retrieves useful material, but vocabulary mismatch can push direct evidence lower in the ranking.",
  },
  Dense: {
    label: "Selected ranking",
    metrics: ["0.9688", "0.9062", "1.0000", "0.8866"],
    note: "Best accepted aggregate ranking on the reviewed benchmark and retained after the reranker comparison.",
  },
  Reranker: {
    label: "Cross-encoder comparison",
    metrics: ["0.9271", "0.8250", "1.0000", "0.7893"],
    note: "Improves over BM25 and preserves direct-evidence coverage, but trails the accepted dense baseline.",
  },
};

const evidence = {
  eu_a9_core: {
    title: "Article 9 — lifecycle risk-management system",
    source: "EU AI Act",
    locator: "Article 9 · risk management",
    grade: "Direct evidence",
    snippet: "The relevant provision describes an iterative risk-management process that is maintained and updated throughout the high-risk AI system lifecycle.",
    provenance: "eu-ai-act-2024-1689 · reviewed logical source",
  },
  eu_a9_testing: {
    title: "Article 9 — testing and mitigation",
    source: "EU AI Act",
    locator: "Article 9 · testing requirements",
    grade: "Direct evidence",
    snippet: "The provision connects testing with identifying appropriate risk-management measures and checking that the system performs consistently for its intended purpose.",
    provenance: "eu-ai-act-2024-1689 · reviewed logical source",
  },
  eu_context: {
    title: "High-risk provider obligations",
    source: "EU AI Act",
    locator: "Provider obligations · supporting context",
    grade: "Supporting context",
    snippet: "Related obligations provide context for documentation, monitoring, and controls surrounding high-risk AI systems.",
    provenance: "eu-ai-act-2024-1689 · contextual passage",
  },
  rmf_govern: {
    title: "GOVERN as a cross-cutting function",
    source: "NIST AI RMF 1.0",
    locator: "GOVERN function",
    grade: "Direct evidence",
    snippet: "GOVERN establishes organization-wide policies, accountability, and risk-management structures that support the other AI RMF functions continuously.",
    provenance: "nist-ai-rmf-1.0 · reviewed logical source",
  },
  rmf_lifecycle: {
    title: "Risk management across the lifecycle",
    source: "NIST AI RMF 1.0",
    locator: "Lifecycle application",
    grade: "Direct evidence",
    snippet: "The framework treats governance as an ongoing activity that connects organizational responsibilities to AI design, deployment, use, and monitoring.",
    provenance: "nist-ai-rmf-1.0 · reviewed logical source",
  },
  rmf_measure: {
    title: "MEASURE and monitoring context",
    source: "NIST AI RMF 1.0",
    locator: "MEASURE function · context",
    grade: "Supporting context",
    snippet: "Measurement and monitoring practices provide operational context for governance decisions and risk responses.",
    provenance: "nist-ai-rmf-1.0 · contextual passage",
  },
  gpt_anthro: {
    title: "Anthropomorphization risk",
    source: "GPT-4o System Card",
    locator: "Anthropomorphization and emotional reliance",
    grade: "Direct evidence",
    snippet: "Human-like audio interaction can increase the tendency to attribute human qualities to a model and may affect reliance or trust calibration.",
    provenance: "openai-gpt-4o-system-card-2024-08-08 · reviewed source",
  },
  gpt_memory: {
    title: "Memory-related reliance considerations",
    source: "GPT-4o System Card",
    locator: "Memory and user interaction",
    grade: "Direct evidence",
    snippet: "Persistent contextual capabilities can make interactions feel more continuous, which may amplify emotional attachment or misplaced confidence.",
    provenance: "openai-gpt-4o-system-card-2024-08-08 · reviewed source",
  },
  gpt_safety: {
    title: "Broader model safety evaluation",
    source: "GPT-4o System Card",
    locator: "Safety evaluation · context",
    grade: "Background",
    snippet: "The system card documents broader evaluation methods and limitations that frame how individual risks should be interpreted.",
    provenance: "openai-gpt-4o-system-card-2024-08-08 · contextual passage",
  },
};

const queries = [
  {
    id: "eu-risk",
    label: "EU AI Act — Article 9",
    question: "What must the risk-management system for high-risk AI systems include, and how must it be maintained across the lifecycle?",
    scope: "eu-ai-act-2024-1689",
    rankings: {
      BM25: ["eu_context", "eu_a9_core", "eu_a9_testing"],
      Dense: ["eu_a9_core", "eu_a9_testing", "eu_context"],
      Reranker: ["eu_a9_core", "eu_context", "eu_a9_testing"],
    },
  },
  {
    id: "rmf-govern",
    label: "NIST AI RMF — GOVERN",
    question: "How does the GOVERN function shape organizational AI risk management, and why must it operate continuously?",
    scope: "nist-ai-rmf-1.0",
    rankings: {
      BM25: ["rmf_measure", "rmf_govern", "rmf_lifecycle"],
      Dense: ["rmf_govern", "rmf_lifecycle", "rmf_measure"],
      Reranker: ["rmf_govern", "rmf_measure", "rmf_lifecycle"],
    },
  },
  {
    id: "gpt-reliance",
    label: "GPT-4o — emotional reliance",
    question: "Why might human-like audio and memory-related capabilities increase emotional reliance or miscalibrated trust?",
    scope: "openai-gpt-4o-system-card-2024-08-08",
    rankings: {
      BM25: ["gpt_safety", "gpt_anthro", "gpt_memory"],
      Dense: ["gpt_anthro", "gpt_memory", "gpt_safety"],
      Reranker: ["gpt_anthro", "gpt_safety", "gpt_memory"],
    },
  },
];

const metricLabels = ["Recall@10", "MRR@10", "Evidence hit@10", "nDCG@10"];

export default function PolicyProofLab({ expanded = false }) {
  const [activeModel, setActiveModel] = useState("Dense");
  const [queryId, setQueryId] = useState(queries[0].id);
  const query = queries.find((item) => item.id === queryId);
  const ranking = useMemo(() => query.rankings[activeModel].map((id, index) => ({ ...evidence[id], id, rank: index + 1 })), [query, activeModel]);
  const [selectedId, setSelectedId] = useState(ranking[0].id);
  const selected = ranking.find((item) => item.id === selectedId) || ranking[0];
  const model = modelMetrics[activeModel];

  const changeQuery = (event) => {
    const next = queries.find((item) => item.id === event.target.value);
    setQueryId(next.id);
    setSelectedId(next.rankings[activeModel][0]);
  };

  const changeModel = (name) => {
    setActiveModel(name);
    setSelectedId(query.rankings[name][0]);
  };

  return (
    <div className={`demo-panel policy-demo ${expanded ? "demo-panel--expanded" : ""}`}>
      <div className="demo-toolbar policy-toolbar">
        <div>
          <span className="demo-label">Deterministic retrieval explorer</span>
          <strong>Inspect ranking and provenance</strong>
        </div>
        <select value={queryId} onChange={changeQuery} aria-label="Choose PolicyProof query">
          {queries.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
      </div>

      <div className="query-card">
        <span>Evaluation query</span>
        <p>{query.question}</p>
        <small>Document scope: {query.scope}</small>
      </div>

      <div className="segmented policy-model-tabs" role="group" aria-label="Choose retrieval model">
        {Object.keys(modelMetrics).map((name) => (
          <button key={name} type="button" className={activeModel === name ? "active" : ""} onClick={() => changeModel(name)}>{name}</button>
        ))}
      </div>

      <div className="policy-workbench">
        <section className="ranking-list" aria-label={`${activeModel} retrieved evidence`}>
          <div className="workbench-heading">
            <span>Top evidence</span>
            <strong>{model.label}</strong>
          </div>
          {ranking.map((item) => (
            <button key={item.id} type="button" className={selected.id === item.id ? "active" : ""} onClick={() => setSelectedId(item.id)}>
              <span className="rank-number">#{item.rank}</span>
              <span className="rank-copy"><strong>{item.title}</strong><small>{item.source} · {item.grade}</small></span>
            </button>
          ))}
        </section>

        <section className="evidence-inspector" aria-live="polite">
          <div className="workbench-heading"><span>Evidence inspector</span><strong>{selected.grade}</strong></div>
          <h4>{selected.title}</h4>
          <p>{selected.snippet}</p>
          <dl>
            <div><dt>Source</dt><dd>{selected.source}</dd></div>
            <div><dt>Locator</dt><dd>{selected.locator}</dd></div>
            <div><dt>Provenance</dt><dd>{selected.provenance}</dd></div>
            <div><dt>Selected rank</dt><dd>#{selected.rank} using {activeModel}</dd></div>
          </dl>
        </section>
      </div>

      <div className="model-summary-row">
        <div className="model-summary-copy"><span className="model-badge"><i /> {model.label}</span><p>{model.note}</p></div>
        <div className="metric-grid compact-metrics">
          {model.metrics.map((metric, index) => (
            <div key={metricLabels[index]} className="lab-metric">
              <span>{metricLabels[index]}</span>
              <strong>{metric}</strong>
              <div className="metric-track"><i style={{ width: `${Math.min(Number(metric) * 100, 100)}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      {expanded && (
        <div className="pipeline-mini policy-pipeline" aria-label="PolicyProof pipeline">
          {["Verified corpus", "Token-safe passages", "Deterministic ranking", "Evidence sufficiency"].map((step, index) => (
            <div key={step} className="pipeline-step"><span>{String(index + 1).padStart(2, "0")}</span>{step}</div>
          ))}
        </div>
      )}

      <small className="demo-disclaimer">Browser demonstration using representative, portfolio-safe evidence previews and accepted aggregate metrics. It does not execute the ONNX models or provide legal advice.</small>
    </div>
  );
}
