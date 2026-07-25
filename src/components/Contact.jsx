import { Icon } from "./Icons";

export default function Contact() {
  return (
    <section className="contact-section section-shell" id="contact">
      <div className="contact-card reveal">
        <p>Available for AI engineering, ML systems, and research software roles</p>
        <h2>Need an engineer who cares about both the model and the evidence?</h2>
        <span>I am open to relocation and interested in teams building reliable AI products, evaluation infrastructure, scientific applications, or data-intensive software.</span>
        <div className="contact-actions">
          <a className="button button--primary" href="mailto:chaudharyn582@gmail.com"><Icon name="mail" /> Email me</a>
          <a className="button button--secondary" href="https://www.linkedin.com/in/nikhilchaudhary14ry" target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn</a>
          <a className="button button--secondary" href="/resume/Nikhil-Chaudhary-Resume.pdf" target="_blank" rel="noreferrer"><Icon name="external" /> View résumé</a>
        </div>
        <div className="contact-meta"><span>Kansas City, Missouri · Open to relocation</span><span>(+1) 605-691-0292</span></div>
      </div>
    </section>
  );
}
