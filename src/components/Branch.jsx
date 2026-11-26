import { useMemo } from 'react';
import { parseCubic, cubicPoint, cubicAngle, mulberry32 } from '../utils/geometry';

// Tıklanınca not açan yapraklı dal. Rengi sabittir (yeşil + krem).
export default function Branch({ branch, onSelect }) {
  const { leaves, blossoms, tip } = useMemo(() => {
    const curve = parseCubic(branch.d);
    const rand = mulberry32(branch.id * 977);
    const leaves = [.3, .42, .54, .66, .78, .9].map((t, i) => {
      const [x, y] = cubicPoint(curve, t);
      const side = i % 2 ? 1 : -1;
      return { x, y, rot: cubicAngle(curve, t) + 90 + side * 52, s: 0.8 + (1 - t) * 0.25 };
    });
    const tip = cubicPoint(curve, 1);
    const blossoms = Array.from({ length: 12 }, () => {
      const a = rand() * Math.PI * 2, d = 6 + rand() * 24;
      return { x: tip[0] + Math.cos(a) * d, y: tip[1] + Math.sin(a) * d, r: 2 + rand() * 1.8 };
    });
    return { leaves, blossoms, tip };
  }, [branch.d, branch.id]);

  const open = (event) => { event.stopPropagation(); onSelect(branch); };
  const onKey = (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(event); }
  };

  return <g className="branch" role="button" tabIndex="0" aria-label="Gizli notu aç" onClick={open} onKeyDown={onKey}>
    <title>Notu aç</title>
    <g className="branch-art">
      <path d={branch.d} className="branch-stem" />
      <path d={branch.d} className="branch-stem-hi" />
      <g fill="url(#gLeaf)">
        {leaves.map((l, i) => <use key={i} href="#leaf" transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`} />)}
      </g>
      {blossoms.map((b, i) => <g key={i}>
        <line x1={tip[0]} y1={tip[1]} x2={b.x} y2={b.y} stroke="#3d6f48" strokeWidth="1" />
        <circle cx={b.x} cy={b.y} r={b.r} fill="#f6ece2" />
      </g>)}
      <circle className="note-pulse" cx={tip[0]} cy={tip[1]} r="5" />
    </g>
    <path d={branch.d} className="branch-hit" />
    <circle cx={tip[0]} cy={tip[1]} r="28" className="branch-hit-dot" />
  </g>;
}
