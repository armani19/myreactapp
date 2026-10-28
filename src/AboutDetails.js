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
        <h2 className="profile-section-title" id="education-title" data-scroll-reveal><span>Education</span></h2>
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
        <h2 className="profile-section-title" id="organization-title" data-scroll-reveal><span>Organization</span></h2>
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
    { name: 'DevNet Associate', issuer: 'Cisco', date: 'March 18, 2026', badge: 'devnet-associate.png', description: 'Covers software development, APIs, networking, and infrastructure automation through hands-on labs.', credly: 'https://www.credly.com/earner/earned/badge/f85abd99-8b23-4e3f-98e6-a38cb227485f' },
    { name: 'CCNA: Enterprise Networking, Security, and Automation', issuer: 'Cisco', date: 'December 15, 2025', badge: 'ccna-ensa.png', description: 'Builds skills in scalable networks, routing, security, virtualization, and network automation.', credly: 'https://www.credly.com/earner/earned/badge/e541f10f-1a42-4dcf-af29-a9c9b4c5bde8' },
    { name: 'PMI Project Management Ready', issuer: 'Project Management Institute', date: 'March 3, 2025', badge: 'pmi-ready.png', description: 'Validates foundational project management, business analysis, and traditional and agile methods.', credly: 'https://www.credly.com/earner/earned/badge/fbd4c6a0-46cc-4dc8-bb00-9463577bbd7d' },
    { name: 'Operating Systems Basics', issuer: 'Cisco', badge: 'operating-systems-basics.png', description: 'Covers operating system fundamentals, basic security, and mobile device connectivity.', credly: 'https://www.credly.com/earner/earned/badge/838320cf-bf55-4d95-bb3b-a1fdb269c965' },
    { name: 'Certificate of Officership', issuer: 'Alliance of Information Technology Students', date: 'February 15, 2025', badge: 'aits-cutout.png', logo: true, description: 'Recognizes service as Director for Sports in the student organization.' },
  ];
  return (
    <section className="profile-section" id="certifications" aria-labelledby="certifications-title">
      <div className="profile-inner">
        <h2 className="profile-section-title" id="certifications-title" data-scroll-reveal><span>Certifications</span></h2>
        <AboutDetailCard>
          <ul className="certification-list">{certifications.map(certification => (
            <li key={certification.name}>
              {certification.badge && <img className="certification-badge" src={credentialAsset(certification.badge)} alt={certification.logo ? 'Alliance of Information Technology Students logo' : `${certification.name} badge`} width="76" height="76" loading="lazy" />}
              <div className="credential-info">
                <h4>{certification.name}</h4>
                <p className="about-detail-institution">{certification.issuer}</p>
                <p className="certification-description">{certification.description}</p>
                <div className="certification-meta">
                  {certification.date && <span className="credential-date">Issued {certification.date}</span>}
                  {certification.credly && <a className="certification-link" href={certification.credly} target="_blank" rel="noopener noreferrer" aria-label={`View ${certification.name} badge on Credly`}>View badge on Credly <span aria-hidden="true">↗</span></a>}
                </div>
              </div>
            </li>
          ))}</ul>
        </AboutDetailCard>
      </div>
    </section>
  );
}
