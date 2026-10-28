import { useEffect, useRef, useState } from 'react';
import ShowcaseSlider from './ShowcaseSlider';

const posters = [
  {
    title: 'Capstone Project Poster',
    category: 'FEU COMPASS · Project Design',
    description: 'The project poster I designed for our FEU CDGRS capstone, highlighting discipline case tracking, guidance referrals, and AI-assisted asset matching.',
    file: '4eyes-project-poster.png',
    alt: 'Yellow 4EYES capstone project poster for FEU COMPASS',
  },
  {
    title: 'Capstone Research Poster',
    category: 'FEU COMPASS · Research Design',
    description: 'The research poster I designed for our capstone, presenting the study’s objectives, methodology, results, and recommendations.',
    file: '4eyes-research-poster.png',
    alt: 'Green 4EYES capstone research poster for FEU COMPASS',
  },
];

export default function CapstonePosters() {
  const [selectedPoster, setSelectedPoster] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const openPoster = (poster, event) => {
    triggerRef.current = event.currentTarget;
    setSelectedPoster(poster);
  };

  useEffect(() => {
    if (!selectedPoster) return undefined;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [selectedPoster]);

  return (
    <section className="profile-section posters-section" id="posters" aria-labelledby="posters-title">
      <div className="profile-inner">
        <h2 className="profile-section-title" id="posters-title" data-scroll-reveal>Creative <span>Works</span></h2>
        <ShowcaseSlider label="Creative Works" titles={posters.map(poster => poster.title)} variant="works">
          {posters.map(poster => {
            const source = `${process.env.PUBLIC_URL}/assets/posters/${poster.file}`;
            return (
              <article className="engagement-card" key={poster.file}>
                <button type="button" className="engagement-photo poster-photo" onClick={event => openPoster(poster, event)} aria-haspopup="dialog" aria-label={`View ${poster.title} in full size`}>
                  <img src={source} alt={poster.alt} width="1587" height="2245" loading="lazy" />
                </button>
                <div className="engagement-copy">
                  <time dateTime="2026-10-11">October 11, 2026</time>
                  <h3>{poster.title}</h3>
                  <span className="engagement-category">{poster.category}</span>
                  <p>{poster.description}</p>
                  <button type="button" className="poster-link" onClick={event => openPoster(poster, event)} aria-haspopup="dialog" aria-label={`Open full-size ${poster.title}`}>View full poster <span aria-hidden="true">↗</span></button>
                </div>
              </article>
            );
          })}
        </ShowcaseSlider>
      </div>
      <dialog ref={dialogRef} className="project-lightbox poster-lightbox" aria-labelledby="poster-dialog-title" onCancel={event => { event.preventDefault(); setSelectedPoster(null); }} onClose={() => setSelectedPoster(null)} onClick={event => { if (event.target === event.currentTarget) setSelectedPoster(null); }}>
        {selectedPoster && <>
          <div className="lightbox-top">
            <h3 id="poster-dialog-title">{selectedPoster.title}</h3>
            <button type="button" onClick={() => setSelectedPoster(null)} aria-label="Close poster viewer" autoFocus>×</button>
          </div>
          <img className="poster-expanded-image" src={`${process.env.PUBLIC_URL}/assets/posters/${selectedPoster.file}`} alt={selectedPoster.alt} width="1587" height="2245" />
        </>}
      </dialog>
    </section>
  );
}
