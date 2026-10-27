import { useEffect, useRef, useState } from 'react';
import './App.css';
import Projects from './Projects';
import Engagements from './Engagements';
import CapstonePosters from './CapstonePosters';
import { Education, Organization, Certifications } from './AboutDetails';
import OceanBackground from './OceanBackground';
import SectionNavigation from './SectionNavigation';
import Internships from './Internships';
import HeroName from './HeroName';
import CursorGlow from './CursorGlow';
import './PortfolioLayout.css';

const skillLogos = {
  JavaScript: 'javascript', PHP: 'php', Python: 'python',
  'C++': 'cplusplus', 'Tailwind CSS': 'tailwindcss', HTML5: 'html5',
  CSS3: 'css3', React: 'react', 'CodeIgniter 4': 'codeigniter',
  Git: 'git', GitHub: 'github', 'Visual Studio Code': 'vscode',
  Vite: 'vite', Figma: 'figma', 'Microsoft Power Apps': 'powerapps',
  Canva: 'canva',
};

const skillLogoUrl = (skill) => {
  const slug = skillLogos[skill];
  return `${process.env.PUBLIC_URL}/skill-icons/${slug}.svg`;
};

function IntroAnimation({ onComplete }) {
  return (
    <div
      className="intro-animation"
      aria-label="Introducing Armani Magnifico"
      role="status"
      onAnimationEnd={(event) => {
        if (event.animationName === 'intro-fade-out') onComplete();
      }}
    >
      <div className="intro-card intro-card-primary">
        <div className="intro-card-content">
          <p className="intro-name">ARMANI MAGNIFICO</p>
          <p className="intro-role">Frontend Developer<br />Quality Assurance</p>
        </div>
      </div>
      <div className="intro-card intro-card-mark">
        <div className="intro-card-content">
          <p className="intro-mark">A.M.</p>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ type }) {
  if (type === 'gmail') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="#EA4335" d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Z" />
        <path fill="#fff" d="M5.4 7.3v9.4h2.2v-6.6l4.4 3.4 4.4-3.4v6.6h2.2V7.3l-6.6 5.1-6.6-5.1Z" />
      </svg>
    );
  }

  if (type === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="#0A66C2" d="M3 3h18v18H3V3Z" />
        <path fill="#fff" d="M7.1 9.2H4.9v7.7h2.2V9.2Zm-1.1-1A1.3 1.3 0 1 0 6 5.6a1.3 1.3 0 0 0 0 2.6ZM9 16.9h2.2v-4.3c0-1.1.2-2.1 1.5-2.1 1.2 0 1.2 1.1 1.2 2.1v4.3h2.2v-4.7c0-2.3-.5-4-3-4-1.2 0-2 .6-2.3 1.2h-.1v-1H9v8.5Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.1-1.45-1.1-1.45-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.33 1.09 2.9.83.09-.64.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.57 9.57 0 0 1 12 8.01c.85 0 1.71.12 2.51.37 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.69-4.59 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function App() {
  const headerRef = useRef(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const connectMenuRef = useRef(null);

  const closeConnectMenu = () => setConnectOpen(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${header.getBoundingClientRect().height}px`,
      );
    };

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (connectMenuRef.current && !connectMenuRef.current.contains(event.target)) {
        setConnectOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setConnectOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (!introComplete) return undefined;
    const revealItems = document.querySelectorAll('.hero-content > *, [data-about-reveal], [data-scroll-reveal], .about-detail-card, [data-leadership-reveal], .skills-inner > h2, .skills-group, .footer-feature, .footer-column, .footer-legal');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window) || motionPreference.matches) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    revealItems.forEach((item, index) => {
      item.classList.add('scroll-reveal');
      item.style.setProperty('--reveal-delay', `${(index % 3) * 85}ms`);
      observer.observe(item);
    });
    const showAll = () => {
      if (motionPreference.matches) {
        revealItems.forEach(item => item.classList.add('is-visible'));
        observer.disconnect();
      }
    };
    motionPreference.addEventListener('change', showAll);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener('change', showAll);
      revealItems.forEach(item => item.classList.remove('scroll-reveal', 'is-visible'));
    };
  }, [introComplete]);

  return (
    <div className={`site-shell${introComplete ? ' intro-complete' : ''}`}>
      <OceanBackground className="site-ocean" />
      <CursorGlow />
      <IntroAnimation onComplete={() => setIntroComplete(true)} />
      <header
        ref={headerRef}
        className={`site-header site-header-dark${introComplete ? ' site-header-visible' : ''}`}
      >
        <a className="brand" href="#top" aria-label="Back to top">A.M.</a>
        <SectionNavigation />
      </header>

      <main id="top">
        <div className="hero-stage">
          <section className="hero" id="home" aria-labelledby="hero-title">
            <div className="hero-content">
              <p className="eyebrow">HELLO, I'M</p>
              <HeroName name="ARMANI MAGNIFICO" />
              <p className="hero-description">Frontend Developer | Project Management | Quality Assurance | System Design<span className="hero-student">4th year IT - WMA Student</span></p>
              <div className="hero-stats" aria-label="Specialties">
                <div><strong>Frontend Developer</strong><span>Primary</span></div>
                <div><strong>Quality Assurance</strong><span>Primary</span></div>
                <div><strong>Full Stack</strong><span>Exploring</span></div>
              </div>
              <div className="hero-actions">
                <a className="button button-yellow" href="#projects">Projects</a>
                <div
                  className={`connect-menu${connectOpen ? ' connect-menu-open' : ''}`}
                  ref={connectMenuRef}
                >
                  <button
                    className="button button-white connect-trigger"
                    type="button"
                    aria-expanded={connectOpen}
                    aria-controls="connect-options"
                    onClick={() => {
                      if (connectOpen) closeConnectMenu();
                      else setConnectOpen(true);
                    }}
                  >
                    Contact Me
                  </button>
                  <div className="connect-popout" id="connect-options" aria-hidden={!connectOpen}>
                    <div className="connect-links">
                      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=armanimagnifico4195@gmail.com" target="_blank" rel="noreferrer" aria-label="Email Armani through Gmail">
                        <SocialIcon type="gmail" />
                        <span>Gmail</span>
                      </a>
                      <a href="https://www.linkedin.com/in/armanimagnifico" target="_blank" rel="noreferrer" aria-label="Armani on LinkedIn">
                        <SocialIcon type="linkedin" />
                        <span>LinkedIn</span>
                      </a>
                      <a href="https://github.com/armani19" target="_blank" rel="noreferrer" aria-label="Armani on GitHub">
                        <SocialIcon type="github" />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="intro about-section" id="about" aria-label="About Armani">
          <div className="about-heading" data-about-reveal>
            <h2>About <span>Me</span></h2>
          </div>
          <article className="about-story" data-about-reveal>
            <div className="about-portrait"><img src={`${process.env.PUBLIC_URL}/assets/armani-about.jpg`} alt="Armani Magnifico" width="480" height="720" loading="lazy" /></div>
            <div className="about-story-copy">
              <p>I am a <strong>fourth-year Information Technology student</strong> at FEU Institute of Technology, specializing in <em>Web and Mobile Application Development</em>, with a strong interest in software engineering, frontend development, and quality assurance.</p>
              <p>Through academic projects, client collaboration, and student leadership, I have gained practical experience in <strong>system design, UI/UX development, software testing, and project coordination</strong> while continuously striving to grow as an IT professional.</p>
            </div>
          </article>
        </section>

        <Projects />
        <Engagements />
        <CapstonePosters />
        <section className="leadership-section" id="experience" aria-labelledby="leadership-title">
          <div className="leadership-inner">
            <h2 id="leadership-title" data-leadership-reveal>Leadership <span>Experience</span></h2>
            <article className="leadership-secondary" data-leadership-reveal aria-labelledby="sports-title">
              <div className="leadership-secondary-heading">
                <span className="leadership-secondary-period">August 2024 — July 2025</span>
                <h3 id="sports-title">Director for Sports <span>Information Technology</span></h3>
                <p>Alliance of Information Technology Students (AITS) · FEU Institute of Technology</p>
              </div>
              <ul>
                <li>Represented the Information Technology student body in planning meetings, proposal reviews, debriefings, and university sports events throughout the 2024–2025 academic year.</li>
                <li>Assisted 75+ BSIT teams across three Intramurals seasons by managing registration, eligibility verification, and participation requirements.</li>
                <li>Collaborated with the Student Coordinating Council, FEU Tech organizations, and university offices to deliver Sports Clinics, Intramurals, and the Inter-Campus Tamaraw Games across four FEU campuses.</li>
                <li>Maintained team records and event documentation to streamline participant tracking, verification, and event operations.</li>
              </ul>
            </article>
            <article className="leadership-secondary" data-leadership-reveal aria-labelledby="ticap-title">
              <div className="leadership-secondary-heading">
                <span className="leadership-secondary-period">August 2026 — Present</span>
                <h3 id="ticap-title">Secretariat <span>Technology Innovation in Capstone Project (TICaP)</span></h3>
              </div>
              <ul>
                <li>Prepared and organized official documents for office use.</li>
                <li>Monitored project submissions and tracked each group’s submission status.</li>
                <li>Recorded meeting discussions, decisions, and action items in meeting records.</li>
              </ul>
            </article>
          </div>
        </section>
        <section className="skills-section" id="skills" aria-labelledby="skills-title">
          <div className="skills-inner">
            <h2 id="skills-title">Tech <span>Stack</span></h2>
            <div className="skills-groups">
              {[
                ['Frontend development', 'HTML5', 'CSS3', 'React', 'Tailwind CSS'],
                ['Backend development', 'JavaScript', 'PHP', 'Python', 'CodeIgniter 4', 'C++'],
                ['Development & collaboration', 'Git', 'GitHub', 'Visual Studio Code', 'Vite'],
                ['Design & prototyping', 'Figma', 'Microsoft Power Apps', 'Canva'],
              ].map(([category, ...skills]) => <div className="skills-group" key={category}>
                <div className="skills-group-heading"><h3>{category}</h3></div>
                <div className="skills-pills">{skills.map(skill => <span key={skill}>{skill}<img src={skillLogoUrl(skill)} alt="" aria-hidden="true" loading="lazy" /></span>)}</div>
              </div>)}
            </div>
          </div>
        </section>
        <Education />
        <Certifications />
        <Organization />
        <Internships />
      </main>
      <footer className="site-footer" id="contact" aria-label="Contact and site navigation">
        <div className="footer-inner">
          <div className="footer-columns">
            <div className="footer-column"><h3>Get in touch</h3><a href="https://mail.google.com/mail/?view=cm&fs=1&to=armanimagnifico4195@gmail.com" target="_blank" rel="noreferrer">armanimagnifico4195@gmail.com</a></div>
              <div className="footer-column"><h3>Connect</h3><a href="https://www.linkedin.com/in/armanimagnifico" target="_blank" rel="noreferrer"><SocialIcon type="linkedin" /> LinkedIn</a><a href="https://github.com/armani19" target="_blank" rel="noreferrer"><SocialIcon type="github" /> GitHub</a></div>
              <div className="footer-column"><h3>What I do</h3><p>System Design<br />Frontend Development<br />Quality Assurance<br />Project Management</p></div>
              <div className="footer-column"><h3>Exploring</h3><p>Backend Development<br />Full Stack Development</p></div>
          </div>
            <div className="footer-legal">© {new Date().getFullYear()} Armani Magnifico</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
