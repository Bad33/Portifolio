import { capabilities } from "../data/capabilities";
import SectionHeader from "./SectionHeader";

export default function Capabilities() {
  return (
    <section className="content-section section-shell" id="capabilities">
      <SectionHeader
        index="02"
        eyebrow="AI engineering capabilities"
        title="From model behavior to production behavior."
        body="My work sits at the boundary between machine learning, research rigor, backend engineering, and the people who need to trust the result."
      />
      <div className="capability-grid">
        {capabilities.map((item) => (
          <article className="capability-card reveal" key={item.title}>
            <div className="capability-code">{item.code}</div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <div>{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
