// "M x y C x1 y1 x2 y2 x y" biçimindeki tek kübik Bézier yolunu çözer.
export function parseCubic(d) {
  const n = d.match(/-?\d*\.?\d+/g).map(Number);
  return { p0: [n[0], n[1]], p1: [n[2], n[3]], p2: [n[4], n[5]], p3: [n[6], n[7]] };
}

export function cubicPoint({ p0, p1, p2, p3 }, t) {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, e = t * t * t;
  return [
    a * p0[0] + b * p1[0] + c * p2[0] + e * p3[0],
    a * p0[1] + b * p1[1] + c * p2[1] + e * p3[1]
  ];
}

// Yönün açısı (derece). 0 = sağa, 90 = aşağı.
export function cubicAngle(curve, t) {
  const [x1, y1] = cubicPoint(curve, Math.max(0, t - 0.01));
  const [x2, y2] = cubicPoint(curve, Math.min(1, t + 0.01));
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
}

// Her açılışta aynı sonucu veren sahte rastgele sayı üreteci.
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
