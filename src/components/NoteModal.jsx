import { useEffect } from 'react';

export default function NoteModal({ branch, onClose }) {
  useEffect(() => {
    if (!branch) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [branch, onClose]);

  if (!branch) return null;
  return <div className="note-backdrop" onClick={onClose}>
    <article className="note" onClick={e => e.stopPropagation()}>
      <button className="close-note" onClick={onClose} aria-label="Notu kapat">×</button>
      <div className="note-line">Özel bir not</div>
      <p>{branch.note}</p>
      <footer>♥</footer>
    </article>
  </div>;
}
