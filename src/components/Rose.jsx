// Gül başı tamamen vektörel çizilir. Renkler CSS değişkenlerinden (--petal, --shadow, --light)
// gelir; bu yüzden renk değişince gülün kendisi boyanır, üstüne katman bindirilmez.

const OUTER = [0, 1, 2, 3, 4, 5].map(k => k * 60 + 8);
const MID = [0, 1, 2, 3, 4].map(k => k * 72 + 40);
const INNER = [0, 1, 2, 3].map(k => k * 90 + 20);

// Bir kez tanımlanır, bütün güller <use> ile paylaşır.
export function RoseDefs() {
  return <>
    <linearGradient id="gOuter" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" className="s-petal" />
      <stop offset=".5" className="s-petal" />
      <stop offset="1" className="s-shadow" />
    </linearGradient>
    <linearGradient id="gMid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" className="s-petal" />
      <stop offset=".35" className="s-petal" />
      <stop offset="1" className="s-shadow" />
    </linearGradient>
    <linearGradient id="gInner" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" className="s-light" stopOpacity=".3" />
      <stop offset=".2" className="s-petal" />
      <stop offset="1" className="s-shadow" />
    </linearGradient>
    <radialGradient id="gCore">
      <stop offset="0" className="s-shadow" stopOpacity=".9" />
      <stop offset="1" className="s-shadow" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="gLight" cx=".32" cy=".26" r=".85">
      <stop offset="0" stopColor="#fff" stopOpacity=".16" />
      <stop offset=".55" stopColor="#fff" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="gDrop">
      <stop offset=".45" stopColor="#000" stopOpacity=".55" />
      <stop offset="1" stopColor="#000" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="gSepal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#2f6a3e" />
      <stop offset="1" stopColor="#163a22" />
    </linearGradient>

    {/* Tek taç yaprak: dolgu + kenar parlaması + damar */}
    <g id="petal">
      <path className="petal-body" d="M0 0 C-30 -4 -50 -30 -36 -54 C-26 -70 -8 -72 0 -66 C8 -72 26 -70 36 -54 C50 -30 30 -4 0 0Z" />
      <path className="petal-rim" fill="none" d="M-35 -54 C-26 -68 -8 -70 0 -64 C8 -70 26 -68 35 -54" />
      <path className="petal-vein" fill="none" d="M0 -8 C3 -26 2 -42 0 -58" />
    </g>
    <path id="sepal" d="M0 0 C8 -9 8 -24 0 -36 C-8 -24 -8 -9 0 0Z" />
  </>;
}

function Head({ rot }) {
  return <>
    <ellipse cx="0" cy="10" rx="76" ry="68" fill="url(#gDrop)" />
    {/* Çanak yapraklar (yeşil, sabit) */}
    {[148, 180, 212].map(a => <use key={a} href="#sepal" fill="url(#gSepal)" transform={`rotate(${a}) translate(0 -38) scale(1.15)`} />)}
    <g transform={`rotate(${rot})`}>
      <g className="layer">{OUTER.map(a => <use key={a} href="#petal" fill="url(#gOuter)" transform={`rotate(${a}) translate(0 -4)`} />)}</g>
      <g className="layer">{MID.map(a => <use key={a} href="#petal" fill="url(#gMid)" transform={`rotate(${a}) translate(0 -3) scale(.74)`} />)}</g>
      <g className="layer">{INNER.map(a => <use key={a} href="#petal" fill="url(#gInner)" transform={`rotate(${a}) translate(0 -2) scale(.46)`} />)}</g>
      <circle r="17" fill="url(#gCore)" />
      <path className="swirl" fill="none" d="M-4 3 C-9 -6 1 -12 7 -6 C12 0 6 8 -3 7 M-9 4 C-13 -8 -2 -17 9 -12" />
    </g>
    {/* Işık yönü gülle birlikte dönmesin diye dönüşün dışında */}
    <circle r="72" fill="url(#gLight)" />
  </>;
}

export default function Rose({ rose, active, onSelect }) {
  const { x, y, scale, rot = 0, delay = 0 } = rose;
  if (rose.decor) {
    return <g className="rose decor" transform={`translate(${x} ${y})`} pointerEvents="none" aria-hidden="true">
      <g className="rose-sway" style={{ '--sway-delay': `${-delay * 3}s` }}>
        <g className="rose-body" style={{ '--delay': `${delay}s` }}>
          <g transform={`scale(${scale})`}><Head rot={rot} /></g>
        </g>
      </g>
    </g>;
  }
  const hitRadius = Math.max(54, scale * 64);
  const select = (event) => { event.stopPropagation(); onSelect(rose); };
  const onKey = (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(event); }
  };

  return <g className={`rose${active ? ' active' : ''}`} transform={`translate(${x} ${y})`}
    onClick={select} onKeyDown={onKey} role="button" tabIndex="0"
    aria-label={`${rose.name}: ${rose.songName}`} aria-pressed={active}>
    <title>{rose.name}</title>
    <g className="rose-sway" style={{ '--sway-delay': `${-delay * 3}s` }}>
      <g className="rose-body" style={{ '--delay': `${delay}s` }}>
        <g transform={`scale(${scale})`}><Head rot={rot} /></g>
      </g>
    </g>
    <circle className="rose-hit" r={hitRadius} />
  </g>;
}
