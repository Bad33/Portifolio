import { useCallback, useState } from "react";
import { projects } from "../data/projects";
import { Icon } from "./Icons";
import PolicyProofLab from "./PolicyProofLab";
import ClaimPilotLab from "./ClaimPilotLab";
import StructuralLab from "./StructuralLab";
import SpatialLab from "./SpatialLab";
import DemoModal from "./DemoModal";
import SectionHeader from "./SectionHeader";

const demos = {
  policyproof: PolicyProofLab,
  claimpilot: ClaimPilotLab,
  structural: StructuralLab,
  spatial: SpatialLab,
};

export default function ProjectShowcase() {
  const [activeId, setActiveId] = useState("policyproof");
  const [demoId, setDemoId] = useState(null);
  const active = projects.find((project) => project.id === activeId);
  const Demo = demos[active.demo];
  const demoProject = projects.find((project) => project.id === demoId);
  const ModalDemo = demoProject ? demos[demoProject.demo] : null;
  const closeDemo = useCallback(() => setDemoId(null), []);

  return (
    <section className="content-section section-shell" id="work">
      <SectionHeader
        index="01"
        eyebrow="Selected work"
        title="AI systems you can actually explore."
        body="Open any project demo to inspect the workflow, change inputs, and see how the system responds. All public demos use synthetic or reviewed portfolio-safe data."
      />

      <div className="project-selector reveal" role="tablist" aria-label="Featured projects">
        {projects.map((project) => (
          <button key={project.id} type="button" className={project.id === activeId ? "active" : ""} onClick={() => setActiveId(project.id)} role="tab" aria-selected={project.id === activeId}>
            <span>{project.number}</span>
            <strong>{project.title}</strong>
            <small>{project.status}</small>
          </button>
        ))}
      </div>

      <article className="project-stage reveal" key={active.id}>
        <div className="project-narrative">
          <div className="project-topline"><span>{active.eyebrow}</span><i>{active.status}</i></div>
          <h3>{active.title}</h3>
          <p className="project-summary">{active.summary}</p>
          <p className="project-impact"><strong>Why it matters:</strong> {active.impact}</p>
          <div className="project-metrics">
            {active.metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}
          </div>
          <ul className="project-bullets">
            {active.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
          <div className="tag-list">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="project-actions">
            <button className="button button--primary button--small demo-launch-button" type="button" onClick={() => setDemoId(active.id)}>
              <Icon name="play" /> Launch interactive demo
            </button>
            {active.github && <a className="button button--secondary button--small" href={active.github} target="_blank" rel="noreferrer"><Icon name="github" /> View source</a>}
          </div>
        </div>
        <div className="project-demo">
          <div className="demo-preview-heading">
            <div>
              <span>Live browser preview</span>
              <strong>{active.demoTitle}</strong>
            </div>
            <button type="button" onClick={() => setDemoId(active.id)}>Open full demo <Icon name="expand" /></button>
          </div>
          <Demo />
        </div>
      </article>

      <DemoModal
        project={demoProject}
        projects={projects}
        Demo={ModalDemo}
        onClose={closeDemo}
        onChange={setDemoId}
      />
    </section>
  );
}
