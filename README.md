# Interactive Rose Bouquet

Vite + React ile oluşturulmuş, statik barındırmaya uygun etkileşimli gül buketi.

## Çalıştırma

```bash
npm install
npm run dev
npm run build
```

`npm run build`, Render Static Site için `dist/` klasörünü üretir. Render ayarları:

- Build command: `npm run build`
- Publish directory: `dist`

## İçerik yönetimi

Tüm gül, müzik, dal notu ve renk verileri `src/data/bouquetData.js` içindedir. Her gülün `audio` alanına, örneğin `/assets/music/song-1.mp3`, yazın ve MP3 dosyasını `public/assets/music/` dizinine koyun. Ses dosyası sağlanmadığında oynatıcı bunu açıkça belirtir; var olmayan bir dosyayı çalmayı denemez.

## Görsel yapı

Buket fotoğraf değil, tamamen vektörel (SVG) çizimdir:

- `Rose.jsx`: gül başları. Renkleri `--petal`, `--shadow`, `--light` CSS değişkenlerinden alır.
- `Foliage.jsx`, `Branch.jsx`, `Ribbon.jsx`: saplar, yapraklar, dallar, kurdele. Rengi **sabit**tir.
- `ParticleSystem.jsx`: parçacıklar buketi saran iki ışık çizgisi (`STREAMS`) boyunca akar.
- Renk seçilince yalnızca güller ve parçacıklar değişir; arka plan ve yeşil kısımlar değişmez.
