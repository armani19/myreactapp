import { useEffect, useState } from 'react';

export const sections = [
  ['Home', 'home'], ['About', 'about'], ['Projects', 'projects'],
  ['Experience', 'experience'], ['Tech Stack', 'skills'],
  ['Education', 'education'], ['Certifications', 'certifications'], ['Organization', 'organization'], ['Contact', 'contact'],
];

export default function SectionNavigation() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    let frame;
    const update = () => {
      const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 76;
      const readingLine = headerHeight + Math.min(window.innerHeight * .25, 180);
      let current = 'home';
      sections.forEach(([, id]) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= readingLine) current = id;
      });
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = 'contact';
      setActive(current);
      frame = undefined;
    };
    const schedule = () => { if (frame === undefined) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
    };
  }, []);

  return (
    <nav className="section-navigation" aria-label="Primary navigation">
      {sections.map(([label, id]) => (
        <a key={id} href={`#${id}`} aria-label={label} aria-current={active === id ? 'location' : undefined}>
          <span className="nav-dot" aria-hidden="true" />
          <span className="nav-label" aria-hidden="true">{label}</span>
        </a>
      ))}
    </nav>
  );
}
