export function AboutDetailCard({ title, children }) {
  return (
    <article className="about-detail-card profile-card" tabIndex={0}>
      {title && <h3 className="profile-card-title">{title}</h3>}
      <div className="about-detail-body">{children}</div>
    </article>
  );
}

export function Education() {
  return (
    <section className="profile-section" id="education" aria-labelledby="education-title">
      <div className="profile-inner">
        <h2 className="profile-section-title" id="education-title" data-scroll-reveal>My <span>Education</span></h2>
        <AboutDetailCard>
          <ul className="about-detail-list">
            <li><span className="about-detail-date">2023 – Present</span><h4>Bachelor of Science in Information Technology</h4><p>Specializing in Web and Mobile Application Development</p><p className="about-detail-institution">FEU Institute of Technology</p></li>
            <li><span className="about-detail-date">2021 – 2023</span><h4>Senior High School · STEM</h4><p>Science, Technology, Engineering, and Mathematics</p><p className="about-detail-institution">Saint Joseph School of Gagalangin</p><span className="about-detail-badge">Graduated with honors · General Average: 94.04</span></li>
          </ul>
        </AboutDetailCard>
      </div>
    </section>
  );
}

export function Organization() {
  return (
    <section className="profile-section" id="organization" aria-labelledby="organization-title">
      <div className="profile-inner">
        <h2 className="profile-section-title" id="organization-title" data-scroll-reveal>My <span>Organization</span></h2>
        <AboutDetailCard>
          <div className="organization-profile">
            <div className="organization-monogram" aria-hidden="true">AITS<span>FEU TECH</span></div>
            <div><h4>Alliance of Information Technology Students</h4><p className="about-detail-institution">FEU Institute of Technology</p><p>Manila, National Capital Region, Philippines</p></div>
          </div>
        </AboutDetailCard>
      </div>
    </section>
  );
}

export default function AboutDetails() {
  return (
    <div className="about-details" aria-label="Certifications">
      <AboutDetailCard title="Certifications">
        <ul className="about-detail-list">
          <li><span className="about-detail-date">March 18, 2026</span><h4>Devnet Associate</h4><p>Cisco</p></li>
          <li><span className="about-detail-date">December 15, 2025</span><h4>CCNA: Enterprise Networking, Security, and Automation</h4><p>Cisco</p></li>
          <li><span className="about-detail-date">March 3, 2025</span><h4>PMI Project Management Ready</h4><p>Project Management Institute</p></li>
          <li><span className="about-detail-date">February 15, 2025</span><h4>Certificate of Officership</h4><p>Alliance of Information Technology Students</p></li>
        </ul>
      </AboutDetailCard>
    </div>
  );
}
