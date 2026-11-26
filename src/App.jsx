import { useCallback, useState } from 'react';
import Bouquet from './components/Bouquet';
import ColorController from './components/ColorController';
import MusicPlayer from './components/MusicPlayer';
import NoteModal from './components/NoteModal';
import { colors, roses, decorRoses, branches } from './data/bouquetData';

export default function App() {
  const [color, setColor] = useState(colors[0]);
  const [rose, setRose] = useState(null);
  const [note, setNote] = useState(null);

  // Aynı gül tekrar tıklanınca seçim kalkar (müzik kapanır).
  const chooseRose = useCallback(r => setRose(prev => (prev?.id === r.id ? null : r)), []);
  const closeRose = useCallback(() => setRose(null), []);
  const closeNote = useCallback(() => setNote(null), []);

  return <main>
    <Bouquet roses={roses} decorRoses={decorRoses} branches={branches} palette={color}
      onRose={chooseRose} onBranch={setNote} activeId={rose?.id} />
    <ColorController colors={colors} selected={color} onChange={setColor} />
    <MusicPlayer rose={rose} onClose={closeRose} />
    <NoteModal branch={note} onClose={closeNote} />
  </main>;
}
