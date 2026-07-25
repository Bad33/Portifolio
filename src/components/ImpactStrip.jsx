const metrics = [
  ["2+", "Years engineering"],
  ["699+", "Automated tests"],
  ["4", "Peer-reviewed works"],
  ["~60%", "Faster engineering workflow"],
  ["10K+", "Production users supported"],
];

export default function ImpactStrip() {
  return (
    <section className="impact-wrap" aria-label="Career impact metrics">
      <div className="impact-strip section-shell reveal">
        {metrics.map(([value, label]) => (
          <div className="impact-metric" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
