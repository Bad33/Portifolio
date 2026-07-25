import { useEffect, useState } from "react";
import { Icon } from "./Icons";

const fallback = [
  { name: "policyproof", description: "Reproducible retrieval and citation-verification research system", html_url: "https://github.com/Bad33/policyproof", stargazers_count: 0, forks_count: 0, language: "Python", updated_at: null },
  { name: "claimpilot", description: "Explainable AI claims triage and document intelligence platform", html_url: "https://github.com/Bad33/claimpilot", stargazers_count: 0, forks_count: 0, language: "Python", updated_at: null },
  { name: "Spatial-alert-prototype", description: "Geospatial risk and alert exploration prototype", html_url: "https://github.com/Bad33/Spatial-alert-prototype", stargazers_count: 0, forks_count: 0, language: "Python", updated_at: null },
];

const repoNames = fallback.map((repo) => repo.name);

export default function GitHubPulse() {
  const [repos, setRepos] = useState(fallback);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    Promise.all(repoNames.map(async (name) => {
      const response = await fetch(`https://api.github.com/repos/Bad33/${name}`, { signal: controller.signal });
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
      return response.json();
    }))
      .then((data) => { setRepos(data); setState("live"); })
      .catch((error) => { if (error.name !== "AbortError") setState("fallback"); });
    return () => controller.abort();
  }, []);

  return (
    <section className="github-pulse section-shell reveal" aria-labelledby="github-pulse-title">
      <div className="pulse-heading">
        <div><span className={`live-dot ${state}`} /><p>{state === "live" ? "Live GitHub metadata" : state === "loading" ? "Connecting to GitHub" : "Cached portfolio snapshot"}</p><h2 id="github-pulse-title">Public engineering activity</h2></div>
        <a href="https://github.com/Bad33" target="_blank" rel="noreferrer">Open profile <Icon name="arrow" /></a>
      </div>
      <div className="repo-grid">
        {repos.map((repo) => (
          <a key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer" className="repo-card">
            <div><Icon name="github" /><span>{repo.language || "Code"}</span></div>
            <h3>{repo.name}</h3>
            <p>{repo.description || fallback.find((item) => item.name === repo.name)?.description}</p>
            <footer><span>★ {repo.stargazers_count}</span><span>⑂ {repo.forks_count}</span>{repo.updated_at && <span>Updated {new Date(repo.updated_at).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</span>}</footer>
          </a>
        ))}
      </div>
    </section>
  );
}
