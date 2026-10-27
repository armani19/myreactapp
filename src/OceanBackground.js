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

  return <div ref={layerRef} className={`ocean-background ${className}`} data-active={visible && pageVisible} aria-hidden="true" />;
}
