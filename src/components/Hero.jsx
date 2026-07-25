import { Icon } from "./Icons";

const nodes = [
  { label: "Evidence", x: 52, y: 18, tone: "violet" },
  { label: "Evaluation", x: 77, y: 39, tone: "cyan" },
  { label: "Retrieval", x: 58, y: 68, tone: "violet" },
  { label: "Models", x: 26, y: 72, tone: "cyan" },
  { label: "Data", x: 19, y: 35, tone: "violet" },
  { label: "Decision", x: 47, y: 43, tone: "core" },
];

export default function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-copy reveal">
        <div className="availability"><span /> Open to AI engineering and research software roles</div>
        <p className="hero-kicker">AI Engineer · Research Software Engineer</p>
        <h1>
          I build AI systems that can <span>show their work.</span>
        </h1>
        <p className="hero-lede">
          Evaluated retrieval, explainable ML workflows, scientific software, and production applications—designed for reliability, traceability, and measurable impact.
        </p>
        <div className="hero-actions">
          <a className="button button--primary" href="#work">Explore featured systems <Icon name="arrow" /></a>
          <a className="button button--secondary" href="/resume/Nikhil-Chaudhary-Resume.pdf" download>
            <Icon name="download" /> Download résumé
          </a>
        </div>
        <div className="hero-links" aria-label="Professional profiles">
          <a href="https://github.com/Bad33" target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a>
          <a href="https://www.linkedin.com/in/nikhilchaudhary14ry" target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn</a>
          <a href="https://scholar.google.com/citations?user=I4RhtJoAAAAJ&hl=en" target="_blank" rel="noreferrer"><Icon name="scholar" /> Google Scholar</a>
        </div>
      </div>

      <div className="hero-visual reveal" aria-label="Interactive AI system map">
        <div className="visual-orbit visual-orbit--one" />
        <div className="visual-orbit visual-orbit--two" />
        <svg className="network-lines" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M19 35 47 43 52 18M47 43 77 39M47 43 58 68M47 43 26 72M77 39 58 68M19 35 26 72" />
        </svg>
        {nodes.map((node) => (
          <div
            key={node.label}
            className={`system-node system-node--${node.tone}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <span>{node.label}</span>
          </div>
        ))}
        <div className="visual-readout">
          <span className="readout-label">System objective</span>
          <strong>Grounded, evaluated, auditable</strong>
          <div className="readout-bars"><i /><i /><i /><i /></div>
        </div>
      </div>
    </section>
  );
}
