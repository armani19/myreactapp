import { useEffect, useRef, useState } from 'react';
import './Projects.css';

const screens = [
  { title: 'Log Item Record', label: 'Item reporting', file: 'log-item-record-cutout.png', description: 'Students can register a lost or found item, add its details and location, and upload a photo.' },
  { title: 'Violation Record', label: 'Case management', file: 'violation-record-cutout.png', description: 'Students can view submitted violation reports, including incident details and office findings. Reports are read-only and cannot be edited by students.' },
  { title: 'Lost & Found', label: 'Lost & found', file: 'lost-and-found-cutout.png', description: 'Students can view and review items reported lost, including the item category, date, location, and finder information.' },
  { title: 'Create Incident Report', label: 'Incident reporting', file: 'incident-report-cutout.png', description: 'Students can submit and document a security incident, including its category, severity, date, location, description, and optional photo evidence.' },
];

const details = [
  { label: 'Overview', heading: 'Connected offices. Clearer student services.', text: 'A centralized operations platform for FEU student discipline and guidance referrals, with AI-assisted asset resolution. Designed to connect student-facing workflows with the offices that support them.', points: ['Student discipline & guidance referrals', 'Lost-and-found reporting & asset resolution', 'Mobile interfaces built around everyday tasks'] },
  { label: 'My role', heading: 'From first wireframe to a working experience.', text: 'As Frontend Developer, UI/UX Designer, and Quality Assurance contributor, I designed the web interface in Figma and developed the mobile frontend using Microsoft Power Apps.', points: ['Interactive prototypes during discovery and pre-production', 'User-centered web and mobile interface design', 'Feature validation through User Acceptance Testing (UAT)'] },
  { label: 'Collaboration', heading: 'Built with the people who would use it.', text: 'Worked with the Guidance Counseling Office, Office of Student Discipline, and IT Support Office to gather requirements, plan workflows, demonstrate the system, and validate features for a platform designed to support over 15,000 FEU Manila students.', points: ['Requirements gathering & system demonstrations', 'Documentation, proofreading & approval routing', 'Task delegation, deliverables & capstone compliance'] },
];

function ScreenPreview({ screen }) {
  return <img className={`project-screenshot${screen.file === 'incident-report-cutout.png' ? ' incident-cutout' : ''}`} src={`${process.env.PUBLIC_URL}/assets/projects/${screen.file}`} alt={`${screen.title} mobile interface design`} />;
}
export default function Projects() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [activeDetail, setActiveDetail] = useState(0);
  const [direction, setDirection] = useState(1);
  const swipeStartRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef(null);
  const dialogRef = useRef(null);
  const expandRef = useRef(null);
  const tabRefs = useRef([]);
  const screen = screens[activeScreen];
  const detail = details[activeDetail];
  const moveScreen = (step) => {
    setDirection(step < 0 ? -1 : 1);
    setActiveScreen(current => (current + step + screens.length) % screens.length);
  };
  const selectScreen = (index) => {
    setDirection(index < activeScreen ? -1 : 1);
    setActiveScreen(index);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!('IntersectionObserver' in window)) { section.classList.add('projects-visible'); return undefined; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { section.classList.add('projects-visible'); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (expanded) {
      const expandButton = expandRef.current;
      dialog.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { dialog.close(); document.body.style.overflow = previousOverflow; expandButton?.focus(); };
    }
    return undefined;
  }, [expanded]);

  return (
    <section className="projects-section" id="projects" ref={sectionRef} aria-labelledby="projects-title">
      <div className="projects-water" aria-hidden="true" />
      <div className="projects-inner">
        <div className="projects-heading project-reveal"><h2 id="projects-title">My <span>Projects</span><span className="projects-period">.</span></h2></div>
        <article className="featured-project project-reveal">
          <div className="project-story">
            <div className="project-meta"><span className="project-type">MOBILE</span></div>
            <h3>FEU Centralized<br />Operations Platform</h3>
            <p className="project-subtitle">Student discipline. Guidance referrals.<br />AI-assisted asset resolution.</p>
            <div className="project-tools"><span>Figma</span><span>Microsoft Power Apps</span><span>UI/UX</span><span>Quality Assurance</span></div>
            <div className="project-tabs" role="tablist" aria-label="Project information">
              {details.map((item, index) => <button ref={el => { tabRefs.current[index] = el; }} key={item.label} id={`project-tab-${index}`} type="button" role="tab" aria-selected={activeDetail === index} aria-controls={`project-panel-${index}`} tabIndex={activeDetail === index ? 0 : -1} onClick={() => setActiveDetail(index)} onKeyDown={event => {
                let next;
                if (event.key === 'ArrowRight') next = (index + 1) % details.length;
                if (event.key === 'ArrowLeft') next = (index + details.length - 1) % details.length;
                if (event.key === 'Home') next = 0;
                if (event.key === 'End') next = details.length - 1;
                if (next !== undefined) { event.preventDefault(); setActiveDetail(next); tabRefs.current[next].focus(); }
              }}>{item.label}</button>)}
            </div>
            <div key={activeDetail} className="project-detail" id={`project-panel-${activeDetail}`} role="tabpanel" aria-labelledby={`project-tab-${activeDetail}`} tabIndex={0}>
              <h4>{detail.heading}</h4><p>{detail.text}</p><ul>{detail.points.map(point => <li key={point}>{point}</li>)}</ul>
            </div>
            <div className="project-footnote"><strong>15,000+</strong><span>FEU Manila students the platform<br />was designed to support</span></div>
          </div>
          <div className="project-gallery" role="region" aria-label="Project design gallery" aria-roledescription="carousel" style={{ '--screen-direction': direction }} onKeyDown={event => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault();
              moveScreen(event.key === 'ArrowRight' ? 1 : -1);
            }
          }}>
            <div className="gallery-topline"><span>INTERFACE EXPLORER</span><span>0{activeScreen + 1} / {String(screens.length).padStart(2, '0')}</span></div>
            <div className="phone-stage" onTouchStart={event => {
              const touch = event.touches[0];
              swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
            }} onTouchEnd={event => {
              const start = swipeStartRef.current;
              swipeStartRef.current = null;
              if (!start) return;
              const touch = event.changedTouches[0];
              const dx = touch.clientX - start.x;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(touch.clientY - start.y)) moveScreen(dx < 0 ? 1 : -1);
            }} onTouchCancel={() => { swipeStartRef.current = null; }}><div className="phone-orbit" aria-hidden="true" /><button ref={expandRef} type="button" className="phone-preview" onClick={() => setExpanded(true)} aria-label={`Enlarge ${screen.title} design`}><div className="phone-image-transition" key={activeScreen}><ScreenPreview screen={screen} index={activeScreen} /></div><span className="phone-expand">Explore design ↗</span></button></div>
            <div className="gallery-thumbnails" aria-label="Choose an interface">
              {screens.map((item, index) => <button type="button" key={item.title} aria-label={`Preview ${item.title}`} aria-pressed={activeScreen === index} onClick={() => selectScreen(index)}><img className={item.file === 'incident-report-cutout.png' ? 'incident-cutout' : undefined} src={`${process.env.PUBLIC_URL}/assets/projects/${item.file}`} alt="" width="468" height="949" loading="lazy" /><span>{item.label}</span></button>)}
            </div>
            <div className="gallery-caption" aria-live="polite"><div key={screen.title}><p className="gallery-label">{screen.label}</p><h4>{screen.title}</h4><p>{screen.description}</p></div></div>

          </div>
        </article>
      </div>
      <dialog ref={dialogRef} className="project-lightbox" style={{ '--screen-direction': direction }} aria-labelledby="lightbox-title" onCancel={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); moveScreen(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); moveScreen(-1); } }}>
        <div className="lightbox-top"><h3 id="lightbox-title">{screen.title}</h3><button type="button" onClick={() => setExpanded(false)} aria-label="Close design viewer" autoFocus>✕</button></div>
        <div className="lightbox-image" key={activeScreen}><ScreenPreview screen={screen} index={activeScreen} /></div>
        <div className="lightbox-controls"><button type="button" onClick={() => moveScreen(-1)} aria-label="Previous enlarged design">←</button><span>{activeScreen + 1} / {screens.length}</span><button type="button" onClick={() => moveScreen(1)} aria-label="Next enlarged design">→</button></div>
      </dialog>
    </section>
  );
}
