import { useEffect, useRef } from 'react';
import './CursorGlow.css';

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame;
    let cursorX = 0;
    let cursorY = 0;
    const hide = () => {
      cancelAnimationFrame(frame);
      frame = undefined;
      glow.style.opacity = '0';
    };
    const move = event => {
      if (event.pointerType !== 'mouse') { hide(); return; }
      cursorX = event.clientX;
      cursorY = event.clientY;
      if (frame !== undefined) return;
      frame = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        glow.style.opacity = '1';
        frame = undefined;
      });
    };
    const detach = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', hide);
      document.removeEventListener('pointerleave', hide);
      cancelAnimationFrame(frame);
      frame = undefined;
      hide();
    };
    const configure = () => {
      detach();
      if (!preference.matches) return;
      window.addEventListener('pointermove', move, { passive: true });
      window.addEventListener('blur', hide);
      document.addEventListener('pointerleave', hide);
    };
    configure();
    preference.addEventListener('change', configure);
    return () => {
      detach();
      preference.removeEventListener('change', configure);
    };
  }, []);

  return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />;
}
