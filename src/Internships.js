import { useEffect, useRef, useState } from 'react';
import GitHubActivity from './GitHubActivity';

export default function Internships() {
  const [cvOpen, setCvOpen] = useState(false);
  const dialogRef = useRef(null);
  const viewButtonRef = useRef(null);

  useEffect(() => {
    if (!cvOpen) return undefined;
    const dialog = dialogRef.current;
    const viewButton = viewButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      viewButton?.focus();
    };
  }, [cvOpen]);

  return (
    <section className="profile-section internships-section" id="internships" aria-labelledby="internships-title">
      <div className="profile-inner">
        <h2 className="profile-section-title" id="internships-title" data-scroll-reveal>My <span>Internship</span></h2>
        <article className="internship-card" data-scroll-reveal>
          <div className="internship-card-heading">
            <div className="internship-company"><img src={`${process.env.PUBLIC_URL}/assets/baytech-logo.svg`} alt="Baytech Corp. logo" /><div><span className="internship-eyebrow">My upcoming placement</span><h3>Baytech Corp.</h3><p>Quality Assurance Intern · Ortigas, Pasig</p></div></div>
            <span className="internship-status"><span aria-hidden="true" />Starting December 2026</span>
          </div>
          <p className="internship-intro">I’ll be joining Baytech Corp. as a Quality Assurance Intern this December, completing 520 required internship hours in Ortigas, Pasig.</p>
          <dl className="internship-facts">
            <div><dt>Role</dt><dd>Quality Assurance Intern</dd></div>
            <div><dt>Starts</dt><dd>December 2026</dd></div>
            <div><dt>Required hours</dt><dd>520 hours</dd></div>
          </dl>
          <div className="internship-location"><div className="internship-location-copy"><span className="internship-eyebrow">Office location</span><h4>Find Baytech in Ortigas</h4><p>Meralco Avenue, San Antonio, Pasig, 1605 Metro Manila, Philippines</p><a href="https://www.google.com/maps/search/?api=1&query=Baytech%20BPO%2C%20Meralco%20Avenue%2C%20San%20Antonio%2C%20Pasig%2C%20Metro%20Manila" target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a></div><iframe title="Google Map of Baytech Corp. on Meralco Avenue, Pasig" src="https://www.google.com/maps?q=Baytech%20BPO%2C%20Meralco%20Avenue%2C%20San%20Antonio%2C%20Pasig%2C%20Metro%20Manila&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
          <div className="cv-callout">
            <div className="cv-callout-copy">
              <span className="cv-kicker">MY CV · AT A GLANCE</span>
              <h3>Take a closer look at my work.</h3>
              <p>View my CV now, or save a PDF copy for later.</p>
            </div>
            <div className="cv-actions">
              <button ref={viewButtonRef} type="button" className="cv-button cv-button-view" onClick={() => setCvOpen(true)} aria-haspopup="dialog" aria-controls="cv-dialog">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>
                <span>View CV</span><span className="cv-button-arrow" aria-hidden="true">↗</span>
              </button>
              <a className="cv-button cv-button-download" href={`${process.env.PUBLIC_URL}/assets/cv/ArmaniMagnificoCV.pdf`} download="ArmaniMagnificoCV.pdf">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m-4-4 4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
                <span>Download PDF</span><span className="cv-button-arrow" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </article>
        <GitHubActivity />
      </div>
      <dialog ref={dialogRef} id="cv-dialog" className="cv-lightbox" aria-labelledby="cv-dialog-title" onCancel={event => { event.preventDefault(); setCvOpen(false); }} onClose={() => setCvOpen(false)} onClick={event => { if (event.target === event.currentTarget) setCvOpen(false); }}>
        <div className="cv-lightbox-top"><h3 id="cv-dialog-title">Armani Magnifico CV</h3><button type="button" onClick={() => setCvOpen(false)} aria-label="Close CV viewer" autoFocus>×</button></div>
        <img src={`${process.env.PUBLIC_URL}/assets/cv/ArmaniMagnificoCV.jpg`} alt="Armani Magnifico CV" width="1448" height="2048" />
      </dialog>
    </section>
  );
}

