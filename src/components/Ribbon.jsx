// Krem-altın saten kurdele: hangi gül rengiyle de uyumlu, rengi sabit.
export function RibbonDefs() {
  return <linearGradient id="gRibbon" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stopColor="#f4e8cc" />
    <stop offset=".5" stopColor="#c9a566" />
    <stop offset="1" stopColor="#7d5e2c" />
  </linearGradient>;
}

export default function Ribbon() {
  return <g className="ribbon" fill="url(#gRibbon)" stroke="#5a4220" strokeOpacity=".5" strokeWidth="1">
    <path d="M497 626 C470 670 430 700 392 736 L418 746 C450 714 487 682 511 636Z" />
    <path d="M503 626 C530 670 570 700 608 736 L582 746 C550 714 513 682 489 636Z" />
    <path d="M500 625 C455 578 383 586 391 624 C398 652 462 642 500 625Z" />
    <path d="M500 625 C545 578 617 586 609 624 C602 652 538 642 500 625Z" />
    <path d="M500 625 C470 603 420 600 405 620" fill="none" stroke="#fff" strokeOpacity=".4" />
    <path d="M500 625 C530 603 580 600 595 620" fill="none" stroke="#fff" strokeOpacity=".4" />
    <ellipse cx="500" cy="625" rx="14" ry="12" />
  </g>;
}
