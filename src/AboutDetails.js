import { useState } from 'react';

export function AboutDetailCard({ id, title, children }) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  return (
    <article
      className={`about-detail-card${open ? ' is-expanded' : ''}`}
      onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(true); }}
      onPointerLeave={() => { if (!pinned) setOpen(false); }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget) && !pinned) setOpen(false);
      }}
    >
      <button
        className="about-detail-trigger"
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-content`}
        onClick={() => { setPinned(!pinned); setOpen(!pinned); }}
        onKeyDown={event => {
          if (event.key === 'Escape') { setPinned(false); setOpen(false); }
        }}
      >
        <span className="about-detail-title">{title}</span>
        <span className="about-detail-controls"><span className="about-detail-hint">{pinned ? 'Click to close' : open ? 'Click to keep open' : 'Explore details'}</span><span className="about-detail-plus" aria-hidden="true">+</span></span>
      </button>
      <div className="about-detail-content" id={`${id}-content`} aria-hidden={!open} inert={!open}>
        <div className="about-detail-clip"><div className="about-detail-body">{children}</div></div>
      </div>
    </article>
  );
}

export default function AboutDetails() {
  return (
    <div className="about-details" aria-label="Education, certifications, and organization">
      <AboutDetailCard id="education" title="Education">
        <ul className="about-detail-list">
          <li><span className="about-detail-date">2023 – Present</span><h4>Bachelor of Science in Information Technology</h4><p>Specializing in Web and Mobile Application Development</p><p className="about-detail-institution">FEU Institute of Technology</p></li>
          <li><span className="about-detail-date">2021 – 2023</span><h4>Senior High School · STEM</h4><p>Science, Technology, Engineering, and Mathematics</p><p className="about-detail-institution">Saint Joseph School of Gagalangin</p><span className="about-detail-badge">Graduated with honors · General Average: 94.04</span></li>
        </ul>
      </AboutDetailCard>
      <AboutDetailCard id="certifications" title="Certifications">
        <ul className="about-detail-list">
          <li><span className="about-detail-date">March 18, 2026</span><h4>Devnet Associate</h4><p>Cisco</p></li>
          <li><span className="about-detail-date">December 15, 2025</span><h4>CCNA: Enterprise Networking, Security, and Automation</h4><p>Cisco</p></li>
          <li><span className="about-detail-date">March 3, 2025</span><h4>PMI Project Management Ready</h4><p>Project Management Institute</p></li>
          <li><span className="about-detail-date">February 15, 2025</span><h4>Certificate of Officership</h4><p>Alliance of Information Technology Students</p></li>
        </ul>
      </AboutDetailCard>
      <AboutDetailCard id="organization" title="Organization">
        <div className="organization-monogram" aria-hidden="true">AITS<span>FEU TECH</span></div>
        <h4>Alliance of Information Technology Students</h4>
        <p className="about-detail-institution">FEU Institute of Technology</p>
        <p>Manila, National Capital Region, Philippines</p>
      </AboutDetailCard>
    </div>
  );
}
