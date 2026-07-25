import { useEffect, useMemo, useState } from "react";

const samples = {
  collision: {
    name: "Vehicle collision",
    claimId: "CP-2041",
    document: "Claim CP-2041. Jordan Lee reports a rear-end collision on 2026-03-14. Vehicle damage estimate: $8,450. Police report attached. No bodily injury reported.",
    files: ["incident_statement.txt", "police_report.pdf"],
    fields: [
      { label: "Claim number", value: "CP-2041", confidence: 0.99, evidence: "Claim CP-2041" },
      { label: "Claimant", value: "Jordan Lee", confidence: 0.97, evidence: "Jordan Lee reports" },
      { label: "Incident date", value: "2026-03-14", confidence: 0.98, evidence: "collision on 2026-03-14" },
      { label: "Claimed amount", value: "$8,450", confidence: 0.96, evidence: "damage estimate: $8,450" },
    ],
    summary: "Rear-end vehicle collision with documented property damage, police-report support, and no stated bodily injury.",
    complexity: "Medium",
    probability: "0.74",
    route: "Adjuster review",
    reasons: ["PROPERTY_DAMAGE_OVER_THRESHOLD", "POLICE_REPORT_PRESENT", "NO_INJURY_SIGNAL"],
    reviewFlags: ["Confirm repair estimate", "Verify policy coverage"],
  },
  water: {
    name: "Residential water damage",
    claimId: "CP-2198",
    document: "Claim CP-2198. Morgan Patel reports a burst supply line on 2026-04-02. Estimated mitigation and repair total is $18,900. Photos and contractor estimate supplied. Temporary housing requested.",
    files: ["loss_notice.pdf", "contractor_estimate.pdf", "damage_photos.zip"],
    fields: [
      { label: "Claim number", value: "CP-2198", confidence: 0.99, evidence: "Claim CP-2198" },
      { label: "Claimant", value: "Morgan Patel", confidence: 0.98, evidence: "Morgan Patel reports" },
      { label: "Incident date", value: "2026-04-02", confidence: 0.97, evidence: "on 2026-04-02" },
      { label: "Claimed amount", value: "$18,900", confidence: 0.95, evidence: "repair total is $18,900" },
    ],
    summary: "Residential water-loss claim involving a burst supply line, substantial repair estimate, supporting documentation, and a temporary-housing request.",
    complexity: "High",
    probability: "0.88",
    route: "Escalate",
    reasons: ["HIGH_ESTIMATED_LOSS", "ADDITIONAL_LIVING_EXPENSE", "MULTI_DOCUMENT_REVIEW"],
    reviewFlags: ["Validate temporary-housing eligibility", "Review contractor scope"],
  },
  glass: {
    name: "Low-value glass damage",
    claimId: "CP-2233",
    document: "Claim CP-2233. Avery Kim reports a cracked windshield on 2026-05-11. Replacement quote is $620. No collision, injury, or additional damage reported. Photo and quote attached.",
    files: ["windshield_claim.txt", "replacement_quote.pdf"],
    fields: [
      { label: "Claim number", value: "CP-2233", confidence: 0.99, evidence: "Claim CP-2233" },
      { label: "Claimant", value: "Avery Kim", confidence: 0.98, evidence: "Avery Kim reports" },
      { label: "Incident date", value: "2026-05-11", confidence: 0.98, evidence: "on 2026-05-11" },
      { label: "Claimed amount", value: "$620", confidence: 0.97, evidence: "quote is $620" },
    ],
    summary: "Low-value windshield damage claim with a replacement quote, supporting photo, and no reported injury or related collision damage.",
    complexity: "Low",
    probability: "0.91",
    route: "Low touch",
    reasons: ["LOW_ESTIMATED_LOSS", "SINGLE_DAMAGE_TYPE", "SUPPORTING_QUOTE_PRESENT"],
    reviewFlags: ["Confirm deductible"],
  },
};

const stages = ["Intake", "Document", "Extraction", "Summary", "Triage", "Audit"];

export default function ClaimPilotLab({ expanded = false }) {
  const [sampleKey, setSampleKey] = useState("collision");
  const [stage, setStage] = useState(0);
  const [autoRun, setAutoRun] = useState(false);
  const sample = useMemo(() => samples[sampleKey], [sampleKey]);

  useEffect(() => {
    if (!autoRun) return undefined;
    if (stage >= stages.length - 1) {
      setAutoRun(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setStage((value) => value + 1), 720);
    return () => window.clearTimeout(timer);
  }, [autoRun, stage]);

  const choose = (key) => {
    setSampleKey(key);
    setStage(0);
    setAutoRun(false);
  };

  const startWorkflow = () => {
    setStage(0);
    setAutoRun(true);
  };

  return (
    <div className={`demo-panel claim-demo ${expanded ? "demo-panel--expanded" : ""}`}>
      <div className="demo-toolbar">
        <div>
          <span className="demo-label">Explainable claims sandbox</span>
          <strong>{sample.name}</strong>
        </div>
        <select value={sampleKey} onChange={(event) => choose(event.target.value)} aria-label="Choose sample claim">
          {Object.entries(samples).map(([key, value]) => <option key={key} value={key}>{value.name}</option>)}
        </select>
      </div>

      <div className="workflow-runner">
        <div className="workflow-progress"><i style={{ width: `${((stage + 1) / stages.length) * 100}%` }} /></div>
        <button type="button" className="primary-small" onClick={startWorkflow} disabled={autoRun}>{autoRun ? "Running workflow…" : "Run full workflow"}</button>
      </div>

      <div className="stage-nav claim-stage-nav" role="tablist" aria-label="Claim workflow stages">
        {stages.map((item, index) => (
          <button key={item} type="button" className={stage === index ? "active" : index < stage ? "complete" : ""} onClick={() => { setStage(index); setAutoRun(false); }}>
            <span>{index + 1}</span>{item}
          </button>
        ))}
      </div>

      <div className="stage-content claim-stage-content" aria-live="polite">
        {stage === 0 && (
          <div className="intake-card">
            <span className="content-label">Claim intake</span>
            <div className="claim-record-grid">
              <div><span>Claim ID</span><strong>{sample.claimId}</strong></div>
              <div><span>Status</span><strong>New intake</strong></div>
              <div><span>Documents</span><strong>{sample.files.length}</strong></div>
            </div>
            <ul>{sample.files.map((file) => <li key={file}>{file}<small>ready</small></li>)}</ul>
          </div>
        )}
        {stage === 1 && <div><span className="content-label">Normalized source text</span><p className="document-text">{sample.document}</p><small>Text retained with document and claim identifiers for downstream evidence linking.</small></div>}
        {stage === 2 && (
          <div className="field-list expanded-field-list">
            {sample.fields.map((field) => (
              <div key={field.label}>
                <span>{field.label}</span><strong>{field.value}</strong><small>{field.confidence.toFixed(2)} confidence</small>
                <p>Evidence: “{field.evidence}”</p>
                <div className="confidence-track"><i style={{ width: `${field.confidence * 100}%` }} /></div>
              </div>
            ))}
          </div>
        )}
        {stage === 3 && <div><span className="content-label">Grounded claim summary</span><p className="summary-box">{sample.summary}</p><div className="summary-evidence"><span>Evidence coverage</span><strong>{sample.fields.length} cited fields</strong></div><small>Uses deterministic fallback content in this browser demonstration.</small></div>}
        {stage === 4 && (
          <div className="triage-result">
            <div><span>Complexity</span><strong>{sample.complexity}</strong><small>Model probability {sample.probability}</small></div>
            <div><span>Recommended route</span><strong>{sample.route}</strong><small>Rules + model output</small></div>
            <ul>{sample.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
            <div className="review-flags"><span>Human-review flags</span>{sample.reviewFlags.map((flag) => <p key={flag}>{flag}</p>)}</div>
          </div>
        )}
        {stage === 5 && (
          <div className="audit-log">
            {stages.slice(0, 5).map((item, index) => <div key={item}><span>{`10:0${index + 1}:2${index}`}</span><strong>{item} completed</strong><small>trace_id=cp_demo_{sampleKey}_{index + 1}</small></div>)}
            <div><span>10:06:42</span><strong>Decision package ready for human review</strong><small>route={sample.route.toLowerCase().replaceAll(" ", "_")}</small></div>
          </div>
        )}
      </div>

      <div className="demo-controls">
        <button type="button" onClick={() => { setStage((value) => Math.max(0, value - 1)); setAutoRun(false); }} disabled={stage === 0}>Previous</button>
        <button type="button" className="primary-small" onClick={() => { setStage((value) => Math.min(stages.length - 1, value + 1)); setAutoRun(false); }} disabled={stage === stages.length - 1}>Run next stage</button>
      </div>
      <small className="demo-disclaimer">Synthetic claim data only. The browser demo does not call OpenAI, persist personal data, or make a real insurance decision.</small>
    </div>
  );
}
