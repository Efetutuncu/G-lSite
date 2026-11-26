import { mulberry32 } from '../utils/geometry';

// Yeşil kısımlar (gül sapları, yapraklar, cipsophila) SABİT renklidir;
// renk seçiciden etkilenmez.

export function FoliageDefs() {
  return <>
    <linearGradient id="gLeaf" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#4a8f5a" />
      <stop offset=".55" stopColor="#2a6a3c" />
      <stop offset="1" stopColor="#173f26" />
    </linearGradient>
    <g id="leaf">
      <path d="M0 0 C11 -14 11 -36 0 -56 C-11 -36 -11 -14 0 0Z" />
      <path className="leaf-rib" fill="none" d="M0 -2 L0 -48" />
    </g>
  </>;
}

// Gül başlarının arkasında kalan, kenarlardan taşan büyük yapraklar.
const LEAVES = [
  { x: 470, y: 470, r: -118, s: 1.9 }, { x: 540, y: 470, r: 118, s: 1.9 },
  { x: 440, y: 440, r: -80,  s: 1.9 }, { x: 570, y: 440, r: 80,  s: 1.9 },
  { x: 420, y: 500, r: -140, s: 1.6 }, { x: 590, y: 500, r: 140, s: 1.6 },
  { x: 330, y: 420, r: -55,  s: 1.7 }, { x: 680, y: 420, r: 55,  s: 1.7 },
  { x: 300, y: 270, r: -35,  s: 1.7 }, { x: 710, y: 270, r: 35,  s: 1.7 },
  { x: 410, y: 130, r: -20,  s: 1.4 }, { x: 600, y: 130, r: 20,  s: 1.4 },
  { x: 500, y: 540, r: -170, s: 1.3 }, { x: 510, y: 540, r: 170, s: 1.3 }
];

export function Leaves() {
  return <g className="leaves" fill="url(#gLeaf)">
    {LEAVES.map((l, i) => <use key={i} href="#leaf" transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`} />)}
  </g>;
}

// Her gülün sapı kurdele düğümünün altından çıkar.
export function Stems({ roses }) {
  return <g className="stems" fill="none" strokeLinecap="round">
    {roses.map((rose, i) => {
      const startX = 500 + (i - (roses.length - 1) / 2) * 9;
      const d = `M${startX} 728 C${500 + (startX - 500) * .3} 620 ${rose.x + (500 - rose.x) * .25} ${rose.y + 170} ${rose.x} ${rose.y + 30}`;
      return <g key={rose.id}>
        <path d={d} stroke="#173b23" strokeWidth="9" />
        <path d={d} stroke="#3d7d4c" strokeWidth="2.2" opacity=".55" transform="translate(-1.5 0)" />
      </g>;
    })}
  </g>;
}

// Dolgu çiçekleri: kremsi küçük noktalar.
export function Gypsophila() {
  const rand = mulberry32(2024);
  const stalks = Array.from({ length: 70 }, () => {
    const angle = rand() * Math.PI * 2;
    const radius = 0.62 + rand() * 0.5;
    const tx = 500 + Math.cos(angle) * 320 * radius;
    const ty = 290 + Math.sin(angle) * 250 * radius;
    const bx = 500 + (tx - 500) * 0.72;
    const by = 330 + (ty - 330) * 0.72;
    const dots = Array.from({ length: 4 }, () => ({
      dx: (rand() - .5) * 16, dy: (rand() - .5) * 16, r: 1.8 + rand() * 1.6
    }));
    return { tx, ty, bx, by, dots };
  });
  return <g className="gypsophila">
    {stalks.map((s, i) => <g key={i}>
      <line x1={s.bx} y1={s.by} x2={s.tx} y2={s.ty} stroke="#3d6f48" strokeWidth="1" />
      {s.dots.map((d, j) => <circle key={j} cx={s.tx + d.dx} cy={s.ty + d.dy} r={d.r} fill="#f6ece2" opacity=".92" />)}
    </g>)}
  </g>;
}
