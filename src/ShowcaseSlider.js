import { Children, useId, useRef, useState } from 'react';
import './ShowcaseSlider.css';

const number = value => String(value).padStart(2, '0');

export default function ShowcaseSlider({ children, label, titles, variant = 'events' }) {
  const slides = Children.toArray(children);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const trackId = useId();

  const goTo = index => {
    const track = trackRef.current;
    const slide = track.children[index];
    if (!slide) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: slide.offsetLeft - track.children[0].offsetLeft, behavior: reducedMotion ? 'instant' : 'smooth' });
  };

  const updateActive = () => {
    const track = trackRef.current;
    const start = track.children[0].offsetLeft;
    let closest = 0;
    Array.from(track.children).forEach((slide, index) => {
      if (Math.abs(slide.offsetLeft - start - track.scrollLeft) < Math.abs(track.children[closest].offsetLeft - start - track.scrollLeft)) closest = index;
    });
    setActive(closest);
  };

  return (
    <div className={`showcase showcase-${variant}`} role="group" aria-roledescription="carousel" aria-label={label}>
      <div className="showcase-masthead">
        <span className="showcase-edition"><span aria-hidden="true" />{variant === 'works' ? 'A COLLECTION OF MY ARTISTIC WORKS' : 'MOMENTS IN MOTION'}</span>
        <span className="showcase-hint">Scroll to explore <span aria-hidden="true">↗</span></span>
      </div>
      <div className="showcase-track" id={trackId} ref={trackRef} onScroll={updateActive} tabIndex={0} aria-label={`${label} slides`} onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        const destinations = { ArrowRight: Math.min(active + 1, slides.length - 1), ArrowLeft: Math.max(active - 1, 0), Home: 0, End: slides.length - 1 };
        if (destinations[event.key] !== undefined) {
          event.preventDefault();
          goTo(destinations[event.key]);
        }
      }}>
        {slides.map((slide, index) => (
          <div className="showcase-slide" key={slide.key} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${titles[index]}`}>
            <span className="showcase-frame-number" aria-hidden="true">{number(index + 1)}</span>
            {slide}
          </div>
        ))}
      </div>
      <div className="showcase-footer">
        <div className="showcase-position" aria-live="polite" aria-atomic="true"><strong>{number(active + 1)}</strong><span>/ {number(slides.length)}</span></div>
        <div className="showcase-markers" aria-label="Choose a slide">
          {slides.map((slide, index) => <button key={slide.key} type="button" className={active === index ? 'is-active' : ''} aria-label={`Show ${titles[index]}`} aria-current={active === index ? 'true' : undefined} aria-controls={trackId} onClick={() => goTo(index)}><span /></button>)}
        </div>
        <div className="showcase-arrows">
          <button type="button" aria-label={`Previous ${label} slide`} aria-controls={trackId} disabled={active === 0} onClick={() => goTo(active - 1)}>←</button>
          <button type="button" aria-label={`Next ${label} slide`} aria-controls={trackId} disabled={active === slides.length - 1} onClick={() => goTo(active + 1)}>→</button>
        </div>
      </div>
    </div>
  );
}
