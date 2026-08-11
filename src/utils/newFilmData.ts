export interface FilmTypeOption {
  id: string;
  name: string;
  iso: number;
  description: string;
  primaryColor: string;
  darkColor: string;
  serialPrefix: string;
}

export interface FilmPurposeOption {
  id: string;
  label: string;
}

export interface FrameOption {
  count: number;
  label: string;
  subLabel: string;
}

export const FILM_TYPE_OPTIONS: FilmTypeOption[] = [
  {
    id: 'ft-summer-glow',
    name: 'summer glow',
    iso: 400,
    description: 'derin lacivert tonlar',
    primaryColor: '#18243B', // Rich Navy Blue (Lacivert)
    darkColor: '#4A7CA6',
    serialPrefix: 'SG',
  },
  {
    id: 'ft-golden-hour',
    name: 'golden hour',
    iso: 200,
    description: 'sıcak gün ışığı',
    primaryColor: '#FFF1B0', // Yellow
    darkColor: '#E6A800',
    serialPrefix: 'GH',
  },
  {
    id: 'ft-soft-sunday',
    name: 'soft sunday',
    iso: 200,
    description: 'soluk ve sakin tonlar',
    primaryColor: '#C6F6D5', // Green
    darkColor: '#2F855A',
    serialPrefix: 'SS',
  },
  {
    id: 'ft-midnight-flash',
    name: 'midnight flash',
    iso: 800,
    description: 'gece ve flaş çekimleri',
    primaryColor: '#231F33', // Dark mürdüm
    darkColor: '#CBEBFC',
    serialPrefix: 'MF',
  },
  {
    id: 'ft-bw-monochrome',
    name: 'black & white',
    iso: 400,
    description: 'kontrastlı siyah beyaz',
    primaryColor: '#FFFDF9', // Cream & Black
    darkColor: '#1C1A24',
    serialPrefix: 'BW',
  },
];

export const FILM_PURPOSES: FilmPurposeOption[] = [
  { id: 'p1', label: 'aylık film' },
  { id: 'p2', label: 'gezi' },
  { id: 'p3', label: 'özel gün' },
  { id: 'p4', label: 'arkadaşlarla' },
  { id: 'p5', label: 'günlük anılar' },
  { id: 'p6', label: 'başka' },
];

export const FRAME_OPTIONS: FrameOption[] = [
  { count: 3, label: '3 EXP', subLabel: 'QUICK TEST • 3 karelik deneme filmi' },
  { count: 30, label: '30 EXP', subLabel: 'STANDARD ROLL • önerilen' },
  { count: 36, label: '36 EXP', subLabel: 'FULL ROLL • uzun süreli' },
  { count: 24, label: '24 EXP', subLabel: 'SHORT ROLL • gezi/hafta sonu' },
  { count: 12, label: '12 EXP', subLabel: 'MINI ROLL • özel gün' },
];

export const MOCK_START_DATES: string[] = [
  '1 ağustos 2026',
  '5 ağustos 2026',
  '10 ağustos 2026',
];
