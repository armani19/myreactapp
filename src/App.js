import { useEffect, useRef, useState } from 'react';
import './App.css';
import fishGroup from './assets/fish-group.png';

const navItems = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
];

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
          <p className="intro-role">UX / UX Designer<br />Web Designer</p>
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
  const heroStageRef = useRef(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [headerOnDark, setHeaderOnDark] = useState(true);
  const [connectOpen, setConnectOpen] = useState(false);
  const connectMenuRef = useRef(null);

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
    const heroStage = heroStageRef.current;
    if (!heroStage) return undefined;
    let scrollSnapTimeout;
    let isSnapping = false;

    const snapLandingPage = (event) => {
      const landingHeight = heroStage.offsetHeight;
      const aboutSection = document.getElementById('about');
      const headerHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
      ) || 76;
      const aboutTarget = aboutSection
        ? Math.max(0, aboutSection.offsetTop - headerHeight)
        : landingHeight;
      const currentScroll = window.scrollY;
      const isWithinLanding = currentScroll >= 0 && currentScroll <= aboutTarget;
      const scrollingDown = event.deltaY > 0;
      const scrollingUp = event.deltaY < 0;

      if (!isWithinLanding || isSnapping || (!scrollingDown && !scrollingUp)) return;
      if (scrollingDown && currentScroll < aboutTarget - 2) {
        event.preventDefault();
      } else if (scrollingUp && currentScroll <= aboutTarget + 2 && currentScroll > 0) {
        event.preventDefault();
      } else {
        return;
      }

      isSnapping = true;
      window.scrollTo({
        top: scrollingDown ? aboutTarget : 0,
        behavior: 'smooth',
      });
      window.clearTimeout(scrollSnapTimeout);
      scrollSnapTimeout = window.setTimeout(() => {
        isSnapping = false;
      }, 750);
    };

    window.addEventListener('wheel', snapLandingPage, { passive: false });

    return () => {
      window.removeEventListener('wheel', snapLandingPage);
      window.clearTimeout(scrollSnapTimeout);
    };
  }, []);

  useEffect(() => {
    const darkSections = new Set(['hero', 'ocean']);

    const updateHeaderTheme = () => {
      const header = headerRef.current;
      if (!header) return;

      const headerCenter = header.getBoundingClientRect().height / 2;
      const sectionUnderHeader = [...document.querySelectorAll('main section')].find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= headerCenter && bounds.bottom > headerCenter;
      });

      setHeaderOnDark(sectionUnderHeader ? darkSections.has(sectionUnderHeader.className) : false);
    };

    updateHeaderTheme();
    window.addEventListener('scroll', updateHeaderTheme, { passive: true });
    window.addEventListener('resize', updateHeaderTheme);

    return () => {
      window.removeEventListener('scroll', updateHeaderTheme);
      window.removeEventListener('resize', updateHeaderTheme);
    };
  }, []);

  return (
    <div className="site-shell">
      <IntroAnimation onComplete={() => setIntroComplete(true)} />
      <header
        ref={headerRef}
        className={`site-header${introComplete ? ' site-header-visible' : ''}${headerOnDark ? ' site-header-dark' : ''}`}
      >
        <a className="brand" href="#top" aria-label="Back to top">A.M.</a>
        <nav aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
      </header>

      <main id="top">
        <div ref={heroStageRef} className="hero-stage">
          <section className="hero" aria-labelledby="hero-title">
            <img className="fish-group" src={fishGroup} alt="A school of fish" />
            <div className="hero-content">
              <p className="eyebrow">HELLO, I'M</p>
              <h1 id="hero-title">ARMANI MAGNIFICO</h1>
              <p className="hero-description">System Design &amp; Software Engineering | Frontend Developer |<br />Quality Assurance Specialist | 4th year IT Student</p>
              <div className="hero-stats" aria-label="Specialties">
                <div><strong>3</strong><span>Projects</span></div>
                <div><strong>UI/UX</strong><span>Primary</span></div>
                <div><strong>Full Stack</strong><span>Exploring</span></div>
              </div>
              <div className="hero-actions">
                <a className="button button-yellow" href="#projects">Projects</a>
                <div
                  className={`connect-menu${connectOpen ? ' connect-menu-open' : ''}`}
                  ref={connectMenuRef}
                  onMouseEnter={() => setConnectOpen(true)}
                  onMouseLeave={() => setConnectOpen(false)}
                  onFocus={() => setConnectOpen(true)}
                >
                  <button
                    className="button button-white connect-trigger"
                    type="button"
                    aria-expanded={connectOpen}
                    aria-controls="connect-options"
                    onClick={() => setConnectOpen((isOpen) => !isOpen)}
                  >
                    Let's Connect!
                  </button>
                  <div className="connect-popout" id="connect-options" aria-hidden={!connectOpen}>
                    <p className="connect-label">Find me online</p>
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

        <section className="intro" id="about" aria-label="About Armani">
          <div className="copy-block about-copy">
            <h2>About Me</h2>
            <p>I'm a fourth-year Information Technology student at FEU Institute of Technology specializing in Web and Mobile Application Development. I enjoy turning ideas and real-world problems into digital solutions that are intuitive, functional, and meaningful to the people who use them.</p>
          </div>
          <div className="copy-block interests-copy">
            <h2>What Interests Me</h2>
            <p>I'm particularly interested in system design, software engineering, frontend development, and quality assurance. I value understanding how a system works as a whole. From identifying user needs and designing workflows to development, testing, and continuous improvement.</p>
          </div>
          <div className="copy-block beyond-copy" id="experience">
            <h2>Beyond Programming</h2>
            <p>Outside of programming, my experience in student leadership and project coordination has taught me the importance of accountability, collaboration, and being willing to take initiative when needed. I approach every project as an opportunity to learn, improve my craft, and become a more well-rounded IT professional.</p>
          </div>
        </section>

        <section className="ocean" id="projects" aria-label="Portfolio projects">
          <div className="water-texture" />
        </section>
        <section className="empty-lower" id="skills" aria-label="Skills" />
      </main>
    </div>
  );
}

export default App;
