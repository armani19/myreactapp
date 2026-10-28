export default function Internships() {
  return (
    <section className="profile-section internships-section" id="internships" aria-labelledby="internships-title">
      <div className="profile-inner">
        <h2 className="profile-section-title" id="internships-title" data-scroll-reveal>Open for <span>Internships</span></h2>
        <article className="internship-card" data-scroll-reveal>
          <div className="internship-card-heading"><span className="internship-status"><span aria-hidden="true" />Seeking Opportunities</span></div>
          <p className="internship-intro">Fourth-year BSIT student specializing in Web and Mobile Application Development at FEU Institute of Technology, seeking opportunities to contribute to real-world IT projects and gain professional industry experience.</p>
          <dl className="internship-facts">
            <div><dt>Internship Period</dt><dd>Dec 2026 – Jul 2027</dd></div>
            <div><dt>Internship Type</dt><dd>Academic OJT</dd></div>
            <div><dt>Work Setup</dt><dd>Onsite / Hybrid</dd></div>
          </dl>
          <div className="internship-interests"><h4>Positions of Interest</h4><ul>{['Frontend Developer', 'Project Management', 'Software Quality Assurance', 'IT Support', 'UI/UX Design', 'Systems Analyst'].map(position => <li key={position}>{position}</li>)}</ul></div>
          <div className="cv-callout">
            <div className="cv-callout-copy">
              <span className="cv-kicker">MY CV · AT A GLANCE</span>
              <h3>Take a closer look at my work.</h3>
              <p>View my CV now, or save a PDF copy for later.</p>
            </div>
            <div className="cv-actions">
              <a className="cv-button cv-button-view" href={`${process.env.PUBLIC_URL}/assets/cv/ArmaniMagnificoCV.jpg`} target="_blank" rel="noopener noreferrer" aria-label="View CV image in a new tab">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>
                <span>View CV</span><span className="cv-button-arrow" aria-hidden="true">↗</span>
              </a>
              <a className="cv-button cv-button-download" href={`${process.env.PUBLIC_URL}/assets/cv/ArmaniMagnificoCV.pdf`} download="ArmaniMagnificoCV.pdf">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m-4-4 4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
                <span>Download PDF</span><span className="cv-button-arrow" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="internship-actions"><a className="button button-yellow" href="https://mail.google.com/mail/?view=cm&fs=1&to=armanimagnifico4195@gmail.com" target="_blank" rel="noreferrer">Email Me</a><a href="https://www.linkedin.com/in/armanimagnifico" target="_blank" rel="noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a></div>
        </article>
      </div>
    </section>
  );
}
