export default function ColorController({ colors, selected, onChange }) {
  return <div className="color-controller" role="group" aria-label="Gül rengi">
    {colors.map(c => <button key={c.id} onClick={() => onChange(c)}
      className={selected.id === c.id ? 'selected' : ''} aria-pressed={selected.id === c.id}
      style={{ '--swatch': c.petal }} aria-label={c.name} title={c.name} />)}
  </div>;
}
