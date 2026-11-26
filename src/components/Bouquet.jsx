import Rose, { RoseDefs } from './Rose';
import Branch from './Branch';
import ParticleSystem from './ParticleSystem';
import Ribbon, { RibbonDefs } from './Ribbon';
import { FoliageDefs, Leaves, Stems, Gypsophila } from './Foliage';

export default function Bouquet({ roses, decorRoses = [], branches, palette, onRose, onBranch, activeId }) {
  // Yalnızca gül ve parçacıklar bu değişkenleri okur.
  const paletteVars = { '--petal': palette.petal, '--shadow': palette.shadow, '--light': palette.light };
  // Güller arkadan öne (yukarıdan aşağıya) çizilir.
  const decor = decorRoses.map(r => ({ ...r, decor: true }));
  const ordered = [...roses, ...decor].sort((a, b) => a.y - b.y);

  return <div className="bouquet-wrap" style={paletteVars}>
    <svg className="bouquet" viewBox="0 0 1000 760" aria-label="Etkileşimli gül buketi">
      <defs>
        <RoseDefs />
        <FoliageDefs />
        <RibbonDefs />
      </defs>

      <g className="bouquet-wind">
        <Stems roses={[...roses, ...decor]} />
        <Leaves />
        <Gypsophila />
        {branches.map(branch => <Branch key={branch.id} branch={branch} onSelect={onBranch} />)}
        <Ribbon />
        {ordered.map(rose => <Rose key={rose.id} rose={rose} active={activeId === rose.id} onSelect={onRose} />)}
      </g>

      <ParticleSystem />
    </svg>
  </div>;
}
