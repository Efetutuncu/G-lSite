// Renkler: SADECE güller ve parçacıklar bu paleti kullanır.
// Arka plan, dallar, yapraklar ve kurdele sabit kalır.
export const colors = [
  { id:'red',      name:'Kırmızı',  petal:'#c91a33', shadow:'#4a000d', light:'#ff7d8c' },
  { id:'pink',     name:'Pembe',    petal:'#ee6f95', shadow:'#7a1238', light:'#ffd3df' },
  { id:'white',    name:'Beyaz',    petal:'#f1ece6', shadow:'#8f7f78', light:'#ffffff' },
  { id:'peach',    name:'Şeftali',  petal:'#f09c7c', shadow:'#8a3322', light:'#ffe3cb' },
  { id:'yellow',   name:'Sarı',     petal:'#f2c63f', shadow:'#7d5d08', light:'#fff4a8' },
  { id:'lavender', name:'Lavanta',  petal:'#b38bd4', shadow:'#47235f', light:'#ecdcff' },
  { id:'orange',   name:'Turuncu',  petal:'#ee7429', shadow:'#6e2200', light:'#ffd290' },
  { id:'burgundy', name:'Bordo',    petal:'#7a1230', shadow:'#25000a', light:'#e0607a' }
];

// audio alanlarına /assets/music/song-1.mp3 gibi gerçek dosya yollarınızı ekleyin.
// x,y: gülün buket içindeki merkezi (viewBox 1000x760) · scale: boyut · rot: gülün kendi dönüşü
export const roses = [
  { id:1, name:'Yakınlık',  songName:'Birinci şarkı',  audio:'', x:362, y:200, scale:1.05, rot:12,  delay:.75 },
  { id:2, name:'Sessizlik', songName:'İkinci şarkı',   audio:'', x:505, y:122, scale:1.0,  rot:40,  delay:.95 },
  { id:3, name:'Umut',      songName:'Üçüncü şarkı',   audio:'', x:652, y:205, scale:1.0,  rot:-20, delay:1.12 },
  { id:4, name:'Hatıra',    songName:'Dördüncü şarkı', audio:'', x:262, y:335, scale:.95,  rot:25,  delay:1.3 },
  { id:5, name:'Işık',      songName:'Beşinci şarkı',  audio:'', x:505, y:278, scale:1.22, rot:-8,  delay:1.48 },
  { id:6, name:'Kalp',      songName:'Altıncı şarkı',  audio:'', x:748, y:338, scale:.95,  rot:55,  delay:1.65 },
  { id:7, name:'Daima',     songName:'Yedinci şarkı',  audio:'', x:505, y:428, scale:1.0,  rot:30,  delay:1.82 }
];

// Boşlukları dolduran süs gülleri: tıklanmaz, müzik çalmaz.
export const decorRoses = [
  { id:'d1', x:392, y:378, scale:.7,  rot:70,  delay:2.0 },
  { id:'d2', x:618, y:378, scale:.7,  rot:-35, delay:2.1 },
  { id:'d3', x:250, y:215, scale:.6,  rot:15,  delay:2.2 },
  { id:'d4', x:762, y:222, scale:.6,  rot:50,  delay:2.3 },
  { id:'d5', x:410, y:62,  scale:.52, rot:-10, delay:2.4 },
  { id:'d6', x:605, y:60,  scale:.52, rot:30,  delay:2.5 }
];

// Tıklanınca not açan yapraklı dallar. Hepsi kurdelenin düğümünden (500,625) çıkar.
export const branches = [
  { id:1, d:'M500 625 C470 545 320 470 185 365', note:'Sana her baktığımda, dünyanın biraz daha güzel bir yer olduğuna inanıyorum.' },
  { id:2, d:'M500 625 C430 500 320 330 240 170', note:'Bazı anlar sözcük istemez. Bu buket, o anların sessiz hatırası.' },
  { id:3, d:'M500 625 C525 470 470 280 425 50',  note:'Gülüşün, en karanlık günün bile içinde yanan zarif bir ışık.' },
  { id:4, d:'M500 625 C575 480 705 330 775 155', note:'Yanında olduğum her an, saklamak isteyeceğim kadar kıymetli.' },
  { id:5, d:'M500 625 C560 545 705 480 835 375', note:'Bu küçük not, sana söylemek isteyip cümleye sığdıramadıklarım için.' }
];
