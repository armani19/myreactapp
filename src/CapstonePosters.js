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
  return (
    <section className="profile-section posters-section" id="posters" aria-labelledby="posters-title">
      <div className="profile-inner">
        <h2 className="profile-section-title" id="posters-title" data-scroll-reveal>Capstone <span>Posters</span></h2>
        <div className="engagements-grid posters-grid">
          {posters.map(poster => {
            const source = `${process.env.PUBLIC_URL}/assets/posters/${poster.file}`;
            return (
              <article className="engagement-card" key={poster.file} data-scroll-reveal>
                <a className="engagement-photo poster-photo" href={source} target="_blank" rel="noreferrer" aria-label={`View ${poster.title} in full size`}>
                  <img src={source} alt={poster.alt} width="1587" height="2245" loading="lazy" />
                </a>
                <div className="engagement-copy">
                  <time dateTime="2026-10-11">October 11, 2026</time>
                  <h3>{poster.title}</h3>
                  <span className="engagement-category">{poster.category}</span>
                  <p>{poster.description}</p>
                  <a className="poster-link" href={source} target="_blank" rel="noreferrer" aria-label={`Open full-size ${poster.title}`}>View full poster <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
