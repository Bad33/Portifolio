import { useState } from "react";
import { experience } from "../data/experience";
import SectionHeader from "./SectionHeader";

export default function ExperienceTimeline() {
  const [active, setActive] = useState(0);
  return (
    <section className="content-section section-shell" id="experience">
      <SectionHeader
        index="04"
        eyebrow="Engineering experience"
        title="Research depth. Production discipline."
        body="A career path across scientific software, university platforms, municipal systems, and applied data science."
      />
      <div className="experience-layout reveal">
        <div className="experience-list" role="tablist" aria-label="Experience roles">
          {experience.map((item, index) => (
            <button key={`${item.company}-${item.role}`} type="button" className={active === index ? "active" : ""} onClick={() => setActive(index)}>
              <span>{item.period}</span><strong>{item.role}</strong><small>{item.company}</small>
            </button>
          ))}
        </div>
        <article className="experience-detail">
          <p>{experience[active].period} · {experience[active].location}</p>
          <h3>{experience[active].role}</h3>
          <h4>{experience[active].company}</h4>
          <span>{experience[active].summary}</span>
          <ul>{experience[active].outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
        </article>
      </div>
    </section>
  );
}
