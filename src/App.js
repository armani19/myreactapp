import { useEffect, useRef } from 'react';
import './App.css';
import fishGroup from './assets/fish-group.png';

const navItems = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
];

function IntroAnimation() {
  return (
    <div className="intro-animation" aria-label="Introducing Armani Magnifico" role="status">
      <div className="intro-wipe" />
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

function App() {
  const headerRef = useRef(null);
  const heroStageRef = useRef(null);

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
    const heroStage = heroStageRef.current;
    if (!heroStage) return undefined;

    const updateHeroProgress = () => {
      const progress = Math.min(
        Math.max(-heroStage.getBoundingClientRect().top / window.innerHeight, 0),
        1,
      );
      heroStage.style.setProperty('--hero-slide-progress', progress.toString());
    };

    updateHeroProgress();
    window.addEventListener('scroll', updateHeroProgress, { passive: true });
    window.addEventListener('resize', updateHeroProgress);

    return () => {
      window.removeEventListener('scroll', updateHeroProgress);
      window.removeEventListener('resize', updateHeroProgress);
    };
  }, []);

  return (
    <div className="site-shell">
      <IntroAnimation />
      <header ref={headerRef} className="site-header">
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
                <a className="button button-white" href="mailto:armani@example.com">Let's Connect!</a>
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
