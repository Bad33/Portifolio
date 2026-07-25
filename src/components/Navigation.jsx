import { useEffect, useState } from "react";
import { Icon } from "./Icons";

const links = [
  ["work", "Work"],
  ["capabilities", "Capabilities"],
  ["research", "Research"],
  ["experience", "Experience"],
  ["contact", "Contact"],
];

export default function Navigation({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <div className="nav-shell">
        <a className="brand" href="#top" onClick={close} aria-label="Nikhil Chaudhary home">
          <span className="brand-mark">NC</span>
          <span className="brand-copy">
            <strong>Nikhil Chaudhary</strong>
            <small>AI systems · research software</small>
          </span>
        </a>

        <nav className={`nav-links ${open ? "nav-links--open" : ""}`} aria-label="Primary navigation">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={close}>{label}</a>
          ))}
          <a className="nav-resume" href="/resume/Nikhil-Chaudhary-Resume.pdf" target="_blank" rel="noreferrer">
            Résumé <Icon name="external" size={15} />
          </a>
        </nav>

        <div className="nav-actions">
          <button className="icon-button" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <button className="icon-button mobile-menu" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
