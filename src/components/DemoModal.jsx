import { useEffect } from "react";
import { Icon } from "./Icons";

export default function DemoModal({ project, projects, Demo, onClose, onChange }) {
  useEffect(() => {
    if (!project) return undefined;
    document.body.classList.add("demo-open");
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("demo-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project || !Demo) return null;

  return (
    <div className="demo-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
        <header className="demo-modal-header">
          <div>
            <span>Interactive portfolio demo</span>
            <h2 id="demo-modal-title">{project.title}</h2>
            <p>{project.demoDescription}</p>
          </div>
          <button type="button" className="demo-modal-close" onClick={onClose} aria-label="Close project demo">
            <Icon name="close" />
          </button>
        </header>

        <nav className="demo-modal-tabs" aria-label="Switch project demo">
          {projects.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === project.id ? "active" : ""}
              onClick={() => onChange(item.id)}
            >
              <span>{item.number}</span>
              {item.title}
            </button>
          ))}
        </nav>

        <div className="demo-modal-body">
          <Demo expanded />
        </div>

        <footer className="demo-modal-footer">
          <div className="tag-list">
            {project.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="demo-modal-actions">
            {project.github && (
              <a className="button button--secondary button--small" href={project.github} target="_blank" rel="noreferrer">
                <Icon name="github" /> View source
              </a>
            )}
            <button type="button" className="button button--primary button--small" onClick={onClose}>Return to portfolio</button>
          </div>
        </footer>
      </section>
    </div>
  );
}
