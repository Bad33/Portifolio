import { useMemo, useState } from "react";

const points = [
  { id: "A1", x: 16, y: 25, density: 58, anomaly: 32, label: "North transit" },
  { id: "A2", x: 31, y: 18, density: 72, anomaly: 64, label: "Civic center" },
  { id: "A3", x: 48, y: 26, density: 45, anomaly: 81, label: "River crossing" },
  { id: "A4", x: 69, y: 19, density: 83, anomaly: 49, label: "East market" },
  { id: "A5", x: 83, y: 32, density: 38, anomaly: 75, label: "Industrial edge" },
  { id: "B1", x: 20, y: 51, density: 64, anomaly: 43, label: "West school" },
  { id: "B2", x: 39, y: 46, density: 91, anomaly: 70, label: "Central district" },
  { id: "B3", x: 58, y: 53, density: 76, anomaly: 88, label: "Medical corridor" },
  { id: "B4", x: 77, y: 58, density: 52, anomaly: 62, label: "East residential" },
  { id: "C1", x: 17, y: 78, density: 41, anomaly: 57, label: "Southwest park" },
  { id: "C2", x: 43, y: 76, density: 67, anomaly: 46, label: "South station" },
  { id: "C3", x: 67, y: 80, density: 55, anomaly: 79, label: "Southeast depot" },
];

const origins = {
  central: { x: 50, y: 49, label: "Central district" },
  north: { x: 32, y: 20, label: "North sector" },
  east: { x: 73, y: 55, label: "East sector" },
};

export default function SpatialLab({ expanded = false }) {
  const [threshold, setThreshold] = useState(58);
  const [radius, setRadius] = useState(38);
  const [signal, setSignal] = useState("combined");
  const [originKey, setOriginKey] = useState("central");
  const [selectedId, setSelectedId] = useState("B3");
  const [dispatched, setDispatched] = useState(false);
  const origin = origins[originKey];

  const evaluated = useMemo(() => points.map((point) => {
    const distance = Math.hypot(point.x - origin.x, point.y - origin.y);
    const score = signal === "density" ? point.density : signal === "anomaly" ? point.anomaly : Math.round(point.density * 0.45 + point.anomaly * 0.55);
    return { ...point, distance, score, active: distance <= radius && score >= threshold };
  }), [origin, radius, signal, threshold]);

  const active = evaluated.filter((point) => point.active);
  const selected = evaluated.find((point) => point.id === selectedId) || evaluated[0];
  const estimatedRecipients = active.reduce((total, point) => total + Math.round(point.density * 34), 0);

  return (
    <div className={`demo-panel spatial-demo ${expanded ? "demo-panel--expanded spatial-demo--expanded" : ""}`}>
      <div className="spatial-toolbar">
        <div><span className="demo-label">Simulated emergency-alert prototype</span><strong>{active.length} zones qualify for alert</strong></div>
        <div className="spatial-selects">
          <select value={originKey} onChange={(event) => { setOriginKey(event.target.value); setDispatched(false); }} aria-label="Choose simulated alert origin">
            {Object.entries(origins).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}
          </select>
          <select value={signal} onChange={(event) => { setSignal(event.target.value); setDispatched(false); }} aria-label="Choose geospatial signal">
            <option value="combined">Combined risk</option>
            <option value="density">Population density</option>
            <option value="anomaly">Anomaly score</option>
          </select>
        </div>
      </div>

      <div className="spatial-workbench">
        <div className="sim-map" aria-label="Simulated city alert coverage map">
          <svg viewBox="0 0 100 100" role="img" aria-label="Abstract simulated city network with alert radius and qualifying zones">
            <path className="map-road" d="M4 28 C26 32 41 20 96 27" />
            <path className="map-road" d="M7 65 C30 56 60 63 94 51" />
            <path className="map-road" d="M28 5 C30 28 37 61 34 95" />
            <path className="map-road" d="M69 4 C62 30 66 62 73 96" />
            <circle className="alert-radius" cx={origin.x} cy={origin.y} r={radius} />
            <circle className="alert-origin" cx={origin.x} cy={origin.y} r="2.6" />
            {evaluated.map((point) => (
              <g key={point.id} className={`map-point ${point.active ? "active" : ""} ${point.id === selected.id ? "selected" : ""}`} onClick={() => setSelectedId(point.id)} role="button" aria-label={`${point.label}, score ${point.score}`}>
                <circle cx={point.x} cy={point.y} r={point.active ? 3.1 : 2.35} />
                <text x={point.x + 3.5} y={point.y - 3}>{point.id}</text>
              </g>
            ))}
          </svg>
          <div className="map-legend"><span><i className="legend-origin" /> Alert origin</span><span><i className="legend-active" /> Qualifying zone</span><span><i /> Below threshold</span></div>
        </div>

        <aside className="zone-inspector" aria-live="polite">
          <span className="content-label">Zone inspector</span>
          <h4>{selected.label}</h4>
          <dl>
            <div><dt>Signal score</dt><dd>{selected.score}</dd></div>
            <div><dt>Distance index</dt><dd>{selected.distance.toFixed(1)}</dd></div>
            <div><dt>Density</dt><dd>{selected.density}</dd></div>
            <div><dt>Anomaly</dt><dd>{selected.anomaly}</dd></div>
          </dl>
          <p className={selected.active ? "qualifies" : "does-not-qualify"}>{selected.active ? "Included in alert audience" : "Outside current alert rule"}</p>
        </aside>
      </div>

      <div className="spatial-controls">
        <label>Alert radius <output>{radius}</output><input type="range" min="18" max="62" value={radius} onChange={(event) => { setRadius(Number(event.target.value)); setDispatched(false); }} /></label>
        <label>Minimum signal score <output>{threshold}</output><input type="range" min="25" max="90" value={threshold} onChange={(event) => { setThreshold(Number(event.target.value)); setDispatched(false); }} /></label>
      </div>

      <div className="alert-summary">
        <div><span>Qualified zones</span><strong>{active.length}</strong></div>
        <div><span>Estimated recipients</span><strong>{estimatedRecipients.toLocaleString()}</strong></div>
        <div><span>Channels</span><strong>SMS · App · Signage</strong></div>
        <button type="button" className="primary-small" disabled={!active.length} onClick={() => setDispatched(true)}>{dispatched ? "Simulated alert dispatched" : "Dispatch simulated alert"}</button>
      </div>
      {dispatched && <div className="dispatch-message" aria-live="polite">Demo event logged: {active.length} zones selected around {origin.label}; no real notification was sent.</div>}
      <small className="demo-disclaimer">Simulated data and an abstract city network only. This is a portfolio interaction inspired by the repository’s emergency-alert concept, not a real geographic or public-safety system.</small>
    </div>
  );
}
