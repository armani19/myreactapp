import { useEffect, useRef, useState } from 'react';
import './OceanBackground.css';

export default function OceanBackground({ className = '' }) {
  const layerRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
      observer.observe(layerRef.current);
    }
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    let frame;
    const updateDepth = () => {
      const travel = document.documentElement.scrollHeight - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;
      layerRef.current?.style.setProperty('--ocean-depth', Math.pow(progress, .7).toFixed(4));
      frame = undefined;
    };
    const schedule = () => { if (frame === undefined) frame = requestAnimationFrame(updateDepth); };
    updateDepth();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    resizeObserver?.observe(document.documentElement);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div ref={layerRef} className={`ocean-background ${className}`} data-active={visible && pageVisible} aria-hidden="true">
      <div className="ocean-surface-glow" />
      <div className="ocean-rays">{Array.from({ length: 5 }, (_, index) => <span className="ocean-animated" key={index} style={{ '--ray-index': index }} />)}</div>
      <div className="ocean-depth-shade" />
      <div className="ocean-fish-school">{Array.from({ length: 8 }, (_, index) => (
        <span className={`ocean-fish ocean-animated${index % 2 ? ' fish-reverse' : ''}`} key={index} style={{ '--fish-index': index }}>
          <svg className="fish-body ocean-animated" viewBox="0 0 100 46" focusable="false">
            <path d="M24 23C40 0 69 3 86 23C69 43 40 46 24 23Z" />
            <path className="fish-tail ocean-animated" d="M29 23L5 6L10 23L5 40Z" />
            <path d="M44 9L53 0L64 10ZM44 36L54 46L65 35Z" />
          </svg>
        </span>
      ))}</div>
      <div className="ocean-bubbles">{Array.from({ length: 16 }, (_, index) => <span className="ocean-animated" key={index} style={{ '--bubble-index': index }} />)}</div>
    </div>
  );
}
