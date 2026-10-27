const engagements = [
  {
    title: 'TICaP21 Project Colloquium',
    date: 'October 24, 2026', dateTime: '2026-10-24', category: 'Welcome Remarks',
    description: 'Delivered the welcome remarks as a speaker at the TICaP21 Project Colloquium.',
    photo: 'events/ticap21-colloquium.jpg',
    alt: 'Armani delivering welcome remarks at the TICaP21 Project Colloquium',
  },
  {
    title: 'DEVCON Hermes Agent Hackathon',
    date: 'October 2, 2026', dateTime: '2026-10-02', category: 'Project Presentation',
    description: 'Presented our project, Suki PromiseGuard, on stage at the DEVCON Hermes Agent Hackathon.',
    photo: 'events/devcon-hermes.jpg',
    alt: 'Armani at the DEVCON Hermes Agent Hackathon',
  },
  {
    title: 'Capstone Final Defense',
    date: 'July 26, 2026', dateTime: '2026-07-26', category: 'Officially On Board for TICaP21',
    description: 'Successfully passed the final defense for our FEU CDGRS capstone and officially came on board for TICaP21.',
    photo: 'projects/feu-cdgrs-team.jpg',
    alt: 'The FEU CDGRS capstone team celebrating their successful final defense and TICaP21 onboarding',
  },
];

export default function Engagements() {
  return (
    <section className="profile-section engagements-section" id="events" aria-labelledby="engagements-title">
      <div className="profile-inner">
        <h2 className="profile-section-title" id="engagements-title" data-scroll-reveal>Engagements <span>&amp; Events</span></h2>
        <div className="engagements-grid">
          {engagements.map(event => (
            <article className="engagement-card" key={event.dateTime} data-scroll-reveal tabIndex={0}>
              <div className="engagement-photo"><img src={`${process.env.PUBLIC_URL}/assets/${event.photo}`} alt={event.alt} loading="lazy" /></div>
              <div className="engagement-copy">
                <time dateTime={event.dateTime}>{event.date}</time>
                <h3>{event.title}</h3>
                <span className="engagement-category">{event.category}</span>
                <p>{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
