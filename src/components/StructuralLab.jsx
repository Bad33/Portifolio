import { useMemo, useState } from "react";

const loadCases = {
  wind: "Service wind",
  seismic: "Seismic",
  combined: "Combined envelope",
};

export default function StructuralLab({ expanded = false }) {
  const [height, setHeight] = useState(80);
  const [diameter, setDiameter] = useState(32);
  const [wind, setWind] = useState(105);
  const [seismic, setSeismic] = useState(0.18);
  const [loadCase, setLoadCase] = useState("combined");

  const result = useMemo(() => {
    const slenderness = height / diameter;
    const gravity = Math.round(diameter * diameter * 1.35);
    const windDemand = Math.round((wind / 100) ** 2 * height * diameter * 0.82);
    const seismicDemand = Math.round(seismic * gravity * height * 0.44);
    const selectedDemand = loadCase === "wind" ? windDemand : loadCase === "seismic" ? seismicDemand : Math.round(Math.max(windDemand, seismicDemand) * 1.12);
    const overturning = Math.round(selectedDemand * height / 10);
    const demandRatio = Math.min(selectedDemand / 4200, 1.35);
    const band = demandRatio > 1 ? "Review" : demandRatio > 0.72 ? "Elevated" : demandRatio > 0.45 ? "Moderate" : "Baseline";
    return { slenderness: slenderness.toFixed(2), gravity, windDemand, seismicDemand, selectedDemand, overturning, demandRatio, band };
  }, [height, diameter, wind, seismic, loadCase]);

  return (
    <div className={`demo-panel structural-demo ${expanded ? "demo-panel--expanded structural-demo--expanded" : ""}`}>
      <div className="structural-visual" aria-label="Illustrative elevated water tank and lateral load diagram">
        <div className="visual-case-label"><span>Active load case</span><strong>{loadCases[loadCase]}</strong></div>
        <div className="wind-lines"><i/><i/><i/></div>
        <div className="force-arrow force-arrow--top"><span>{loadCase === "seismic" ? "Fi" : "Fw"}</span></div>
        <div className="force-arrow force-arrow--base"><span>V</span></div>
        <div className="tank" style={{ width: `${Math.max(90, diameter * 4)}px`, top: `${Math.max(24, 92 - height / 2)}px` }}>
          <div className="tank-cap" />
          <div className="tank-body" />
          <div className="tank-base" />
        </div>
        <div className="pedestal" style={{ height: `${Math.max(120, height * 2)}px` }} />
        <div className="ground-line" />
        <div className="moment-arc"><span>M</span></div>
      </div>

      <div className="structural-controls">
        <div className="demo-toolbar structural-toolbar">
          <div><span className="demo-label">Sanitized engineering workflow</span><strong>Load-case explorer</strong></div>
          <select value={loadCase} onChange={(event) => setLoadCase(event.target.value)} aria-label="Choose load case">
            {Object.entries(loadCases).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
          </select>
        </div>
        <label>Tank height <output>{height} ft</output><input type="range" min="50" max="120" value={height} onChange={(event) => setHeight(Number(event.target.value))} /></label>
        <label>Tank diameter <output>{diameter} ft</output><input type="range" min="20" max="48" value={diameter} onChange={(event) => setDiameter(Number(event.target.value))} /></label>
        <label>Reference wind speed <output>{wind} mph</output><input type="range" min="80" max="140" value={wind} onChange={(event) => setWind(Number(event.target.value))} /></label>
        <label>Illustrative seismic coefficient <output>{seismic.toFixed(2)}</output><input type="range" min="0.08" max="0.36" step="0.01" value={seismic} onChange={(event) => setSeismic(Number(event.target.value))} /></label>

        <div className="load-breakdown">
          <div><span>Gravity index</span><i><b style={{ width: `${Math.min(result.gravity / 32, 100)}%` }} /></i><strong>{result.gravity}</strong></div>
          <div><span>Wind index</span><i><b style={{ width: `${Math.min(result.windDemand / 38, 100)}%` }} /></i><strong>{result.windDemand}</strong></div>
          <div><span>Seismic index</span><i><b style={{ width: `${Math.min(result.seismicDemand / 38, 100)}%` }} /></i><strong>{result.seismicDemand}</strong></div>
        </div>

        <div className="structural-results">
          <div><span>Slenderness</span><strong>{result.slenderness}</strong></div>
          <div><span>Relative lateral demand</span><strong>{result.selectedDemand}</strong></div>
          <div><span>Overturning index</span><strong>{result.overturning}</strong></div>
          <div><span>Illustrative band</span><strong>{result.band}</strong></div>
        </div>
        <div className="demand-gauge"><span>Portfolio demand indicator</span><div><i style={{ width: `${Math.min(result.demandRatio * 100, 100)}%` }} /></div><strong>{Math.round(result.demandRatio * 100)}%</strong></div>
      </div>
      <small className="demo-disclaimer">Illustrative, non-design indices only. This demo shows the interaction pattern of the delivered engineering software without exposing proprietary formulas or producing a structural design result.</small>
    </div>
  );
}
