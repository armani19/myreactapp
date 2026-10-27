const credentialAsset = name => `${process.env.PUBLIC_URL}/assets/credentials/${name}`;

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
          <ul className="education-list">
            <li><img className="school-logo" src={credentialAsset('feu-tech.png')} alt="FEU Institute of Technology logo" width="72" height="84" loading="lazy" /><div><h4>Bachelor of Science in Information Technology</h4><p>Specializing in Web and Mobile Application Development</p><p className="about-detail-institution">FEU Institute of Technology</p></div><span className="credential-date">2023 – Present</span></li>
            <li><img className="school-logo" src={credentialAsset('saint-joseph-cutout.png')} alt="Saint Joseph School of Gagalangin logo" width="76" height="76" loading="lazy" /><div><h4>Senior High School · STEM</h4><p>Science, Technology, Engineering, and Mathematics</p><p className="about-detail-institution">Saint Joseph School of Gagalangin</p><span className="about-detail-badge">Graduated with honors · General Average: 94.04</span></div><span className="credential-date">2021 – 2023</span></li>
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
            <img className="organization-logo" src={credentialAsset('aits-cutout.png')} alt="Alliance of Information Technology Students logo" width="100" height="100" loading="lazy" />
            <div><h4>Alliance of Information Technology Students</h4><p className="about-detail-institution">FEU Institute of Technology</p><p>Manila, National Capital Region, Philippines</p></div>
          </div>
        </AboutDetailCard>
      </div>
    </section>
  );
}

export function Certifications() {
  const certifications = [
    { name: 'Devnet Associate', issuer: 'Cisco', date: 'March 18, 2026', badge: 'devnet-associate.png' },
    { name: 'CCNA: Enterprise Networking, Security, and Automation', issuer: 'Cisco', date: 'December 15, 2025', badge: 'ccna-ensa.png' },
    { name: 'PMI Project Management Ready', issuer: 'Project Management Institute', date: 'March 3, 2025', badge: 'pmi-ready.png' },
    { name: 'Certificate of Officership', issuer: 'Alliance of Information Technology Students', date: 'February 15, 2025' },
  ];
  return (
    <section className="profile-section" id="certifications" aria-labelledby="certifications-title">
      <div className="profile-inner">
        <h2 className="profile-section-title" id="certifications-title" data-scroll-reveal>My <span>Certifications</span></h2>
        <AboutDetailCard>
          <ul className="certification-list">{certifications.map(certification => (
            <li key={certification.name}>
              {certification.badge && <img className="certification-badge" src={credentialAsset(certification.badge)} alt={`${certification.name} badge`} width="76" height="76" loading="lazy" />}
              <div className="credential-info"><h4>{certification.name}</h4><p>{certification.issuer}</p></div>
              <span className="credential-date">{certification.date}</span>
            </li>
          ))}</ul>
        </AboutDetailCard>
      </div>
    </section>
  );
}
