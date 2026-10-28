import { useEffect, useRef } from 'react';
import './SeaMonsterFooter.css';

const arms = [
  {
    name: 'far-left',
    shape: 'M-30 510 C18 469 74 456 91 408 C112 349 49 316 63 257 C72 217 113 175 107 112 C146 166 105 211 111 266 C120 327 169 350 155 410 C145 453 91 478 76 510 Z',
    cups: [[92, 367, 5], [101, 388, 5], [91, 410, 4]],
  },
  {
    name: 'left',
    shape: 'M139 510 C185 459 232 437 218 378 C205 324 162 315 177 261 C190 213 242 184 244 127 C271 184 228 229 229 269 C230 309 287 349 277 402 C269 447 231 480 220 510 Z',
    cups: [[216, 322, 5], [225, 342, 5], [233, 362, 4]],
  },
  {
    name: 'middle',
    shape: 'M430 510 C482 474 536 442 516 381 C500 329 462 293 490 239 C517 188 576 158 566 75 C612 143 559 205 551 249 C540 311 599 355 588 411 C581 454 543 485 528 510 Z',
    cups: [[526, 318, 5], [536, 340, 5], [547, 362, 4]],
  },
  {
    name: 'right',
    shape: 'M1003 510 C957 469 918 444 930 393 C942 341 1001 323 988 272 C980 235 946 199 960 145 C933 198 957 237 952 282 C947 329 892 354 892 408 C892 455 924 482 936 510 Z',
    cups: [[950, 352, 5], [941, 372, 5], [936, 393, 4]],
  },
  {
    name: 'far-right',
    shape: 'M1362 510 C1304 473 1269 441 1285 393 C1301 345 1361 317 1345 260 C1333 220 1295 181 1311 105 C1271 171 1302 229 1295 271 C1288 312 1230 344 1228 403 C1226 456 1272 486 1285 510 Z',
    cups: [[1312, 347, 6], [1302, 369, 5], [1295, 391, 4]],
  },
];

export default function SeaMonsterFooter() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    const footer = layer.closest('footer');
    const motionPreference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let frame;
    const update = () => {
      const rect = footer.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / Math.max(rect.height, 1)));
      const reveal = motionPreference?.matches ? Number(progress > 0) : progress;
      layer.style.setProperty('--monster-progress', progress.toFixed(3));
      layer.style.setProperty('--monster-rise', `${Math.round((1 - reveal) * 235)}px`);
      layer.style.setProperty('--monster-opacity', (reveal * .9).toFixed(3));
      layer.dataset.active = progress > 0;
      frame = undefined;
    };
    const schedule = () => { if (frame === undefined) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motionPreference?.addEventListener?.('change', schedule);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    observer?.observe(footer);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motionPreference?.removeEventListener?.('change', schedule);
    };
  }, []);

  return (
    <div ref={layerRef} className="sea-monster-footer" aria-hidden="true">
      <svg viewBox="0 0 1360 510" preserveAspectRatio="xMidYMax slice" focusable="false">
        <defs>
          <linearGradient id="monster-body" x1="0" y1="0" x2=".6" y2="1">
            <stop offset="0" stopColor="#1c6381" stopOpacity=".72" />
            <stop offset=".42" stopColor="#103b61" stopOpacity=".86" />
            <stop offset="1" stopColor="#06162e" stopOpacity=".98" />
          </linearGradient>
        </defs>
        {arms.map((arm, index) => (
          <g className={`monster-rise monster-${arm.name}`} key={arm.name} style={{ '--arm-index': index }}>
            <g className="monster-sway">
              <path className="monster-shape" d={arm.shape} />
              {arm.cups.map(([x, y, radius]) => <circle className="monster-cup" cx={x} cy={y} r={radius} key={`${x}-${y}`} />)}
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
