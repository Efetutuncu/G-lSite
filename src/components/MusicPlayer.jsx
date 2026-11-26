import { useEffect, useRef, useState } from 'react';

const fmt = (value) => {
  const s = Math.max(0, Math.floor(value || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

export default function MusicPlayer({ rose, onClose }) {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  // Yeni gül seçilince şarkıyı baştan başlat (ses dosyası varsa).
  useEffect(() => {
    setPlaying(false); setCurrent(0); setDuration(0); setFailed(false);
    const el = audio.current;
    if (!el || !rose?.audio) return;
    el.load();
    el.play().catch(() => {});
  }, [rose]);

  if (!rose) return null;

  const toggle = () => {
    const el = audio.current;
    if (!el || !rose.audio) return;
    if (el.paused) el.play().catch(() => setFailed(true)); else el.pause();
  };
  const seek = (event) => {
    const value = Number(event.target.value);
    if (audio.current) audio.current.currentTime = value;
    setCurrent(value);
  };

  return <div className="player">
    <audio ref={audio} src={rose.audio || undefined} loop
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onError={() => rose.audio && setFailed(true)}
      onTimeUpdate={e => setCurrent(e.currentTarget.currentTime)}
      onLoadedMetadata={e => setDuration(e.currentTarget.duration)} />
    <button onClick={toggle} className="play" aria-label="Oynat veya duraklat">{playing ? 'Ⅱ' : '▶'}</button>
    <div className="track">
      <strong>{rose.songName}</strong>
      <input aria-label="Şarkı konumu" type="range" min="0" max={duration || 1} step="0.1" value={current} onChange={seek} />
      <small>{fmt(current)} <span>{fmt(duration)}</span></small>
    </div>
    <button className="player-close" onClick={onClose} aria-label="Müzik oynatıcıyı kapat">×</button>
    {!rose.audio && <em>Ses dosyası eklenmedi</em>}
    {rose.audio && failed && <em>Ses dosyası açılamadı</em>}
  </div>;
}
