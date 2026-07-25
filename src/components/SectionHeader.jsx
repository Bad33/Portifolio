export default function SectionHeader({ index, eyebrow, title, body }) {
  return (
    <div className="section-heading reveal">
      <div className="section-index">{index}</div>
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
        {body && <span>{body}</span>}
      </div>
    </div>
  );
}
