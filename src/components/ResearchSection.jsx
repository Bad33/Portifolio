import { useMemo, useState } from "react";
import { publications, scholarUrl } from "../data/publications";
import { Icon } from "./Icons";
import SectionHeader from "./SectionHeader";

const areas = ["All", ...new Set(publications.map((publication) => publication.area))];

export default function ResearchSection() {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => filter === "All" ? publications : publications.filter((publication) => publication.area === filter), [filter]);

  return (
    <section className="content-section section-shell" id="research">
      <SectionHeader
        index="03"
        eyebrow="Peer-reviewed research"
        title="Engineering shaped by research questions."
        body="Collaborative work spanning clinical machine learning, pharmacovigilance, and geographic access to cancer clinical trials."
      />
      <div className="research-toolbar reveal">
        <div className="filter-row" role="group" aria-label="Filter publications">
          {areas.map((area) => <button key={area} type="button" className={filter === area ? "active" : ""} onClick={() => setFilter(area)}>{area}</button>)}
        </div>
        <a href={scholarUrl} target="_blank" rel="noreferrer"><Icon name="scholar" /> Google Scholar <Icon name="external" size={15} /></a>
      </div>
      <div className="publication-list">
        {filtered.map((publication) => (
          <a className="publication-row reveal" href={publication.href} target="_blank" rel="noreferrer" key={publication.title}>
            <div><span>{publication.year}</span><small>{publication.area}</small></div>
            <div><h3>{publication.title}</h3><p>{publication.note}</p><small>{publication.venue}</small></div>
            <Icon name="external" />
          </a>
        ))}
      </div>
    </section>
  );
}
