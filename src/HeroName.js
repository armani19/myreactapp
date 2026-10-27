import { useEffect, useId, useState } from 'react';
import './HeroName.css';

export default function HeroName({ name }) {
  const filterId = `water-reflection-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  return (
    <div className="hero-name" style={{ '--reflection-filter': `url(#${filterId})` }}>
      <svg className="reflection-definitions" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId} x="-10%" y="-30%" width="120%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency=".012 .08" numOctaves="1" seed="5" result="ripples">
              {!reducedMotion && <animate attributeName="baseFrequency" values=".012 .08;.018 .12;.012 .08" dur="8s" repeatCount="indefinite" />}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="ripples" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <h1 id="hero-title">{name}<span className="hero-name-reflection" aria-hidden="true">{name}</span></h1>
    </div>
  );
}
