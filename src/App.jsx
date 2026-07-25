import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ImpactStrip from "./components/ImpactStrip";
import ProjectShowcase from "./components/ProjectShowcase";
import Capabilities from "./components/Capabilities";
import ResearchSection from "./components/ResearchSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import GitHubPulse from "./components/GitHubPulse";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function getInitialTheme() {
  const stored = localStorage.getItem("portfolio-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (event) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="app-shell">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <div className="cursor-light" aria-hidden="true" />
      <Navigation theme={theme} onToggleTheme={() => setTheme((value) => value === "dark" ? "light" : "dark")} />
      <main>
        <Hero />
        <ImpactStrip />
        <ProjectShowcase />
        <Capabilities />
        <ResearchSection />
        <ExperienceTimeline />
        <GitHubPulse />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
