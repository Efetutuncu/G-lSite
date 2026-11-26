import { useEffect, useMemo, useRef } from 'react';
import { mulberry32 } from '../utils/geometry';

// Her yere dağılmış, çok küçük ve yavaş süzülen ışık noktaları.
// Küçük olanlar daha yavaş ve soluk (uzakta), büyükler biraz daha hızlı (yakında) — derinlik hissi verir.
// Renkleri --light / --petal değişkenlerinden gelir, yani seçilen gül rengini izler.
const COUNT = 90;
const X_MIN = -80, X_MAX = 1080, Y_MIN = -30, Y_MAX = 790;

export default function ParticleSystem() {
  const root = useRef(null);

  const dots = useMemo(() => {
    const rand = mulberry32(11);
    return Array.from({ length: COUNT }, () => {
      const depth = Math.pow(rand(), 2.2);            // çoğu küçük, azı büyük
      return {
        x: X_MIN + rand() * (X_MAX - X_MIN),
        y: Y_MIN + rand() * (Y_MAX - Y_MIN),
        size: 0.9 + depth * 2.3,
        rise: 5 + depth * 14,                         // saniyede yukarı süzülme
        sway: 6 + rand() * 16,
        freq: 0.25 + rand() * 0.5,
        phase: rand() * 6.28,
        blink: 0.6 + rand() * 1.6,
        alpha: 0.55 + depth * 0.4 + rand() * 0.1
      };
    });
  }, []);

  useEffect(() => {
    const svg = root.current;
    if (!svg) return undefined;
    const nodes = [...svg.querySelectorAll('g[data-dot]')];
    const span = Y_MAX - Y_MIN;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const draw = (time) => {
      const sec = time / 1000;
      nodes.forEach((node, i) => {
        const d = dots[i];
        const travelled = (((d.y - d.rise * sec - Y_MIN) % span) + span) % span;
        const y = Y_MIN + travelled;
        const x = d.x + Math.sin(sec * d.freq + d.phase) * d.sway;
        const edge = Math.min(1, travelled / 70, (span - travelled) / 70);   // ucu uca yumuşak belirme
        const twinkle = 0.55 + 0.45 * Math.sin(sec * d.blink + d.phase * 2);
        node.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
        node.style.opacity = (d.alpha * edge * twinkle).toFixed(3);
      });
    };

    draw(0);
    if (reduce) return undefined;
    let raf;
    const step = (now) => { draw(now); raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [dots]);

  return <g className="particles" ref={root} aria-hidden="true" pointerEvents="none">
    {dots.map((d, i) => <g key={i} data-dot style={{ opacity: 0 }}>
      {d.size > 1.5 && <circle className="particle-halo" r={d.size * 2.4} />}
      <circle className="particle-core" r={d.size} />
    </g>)}
  </g>;
}
