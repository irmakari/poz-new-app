export type FilmStatus = 'active' | 'completed' | 'developing';

export interface FilmPhoto {
  id: string;
  frameNumber: number;
  code: string; // e.g. "01A"
  sceneTitle: string; // "gün batımı"
  dateStr: string; // "03.07"
  isExposed: boolean;
  bgColors: [string, string];
  iconName: 'photo' | 'camera' | 'sparkle' | 'star' | 'sun' | 'films';
}

export interface FilmNote {
  id: string;
  text: string;
  dateStr: string;
  frameCode?: string;
  bgColor?: string;
}

export interface FilmSong {
  id: string;
  title: string;
  artist: string;
  dateStr: string;
}

export interface FilmMood {
  mood: string;
  count: number;
  color: string;
}

export interface FilmItem {
  id: string;
  title: string;
  dateLabel: string; // e.g. "temmuz 2026"
  type: string; // "35mm · iso 400"
  iso: number;
  frameCount: number;
  currentFrames?: number;
  remainingFrames?: number;
  isoTag?: string;
  typeTag?: string;
  badgeLabel?: string;
  badgeColor?: string;
  badgeDarkColor?: string;
  description?: string;
  totalFrames: number;
  status: FilmStatus;
  color: string; // main card color
  darkColor?: string;
  serial: string;
  stampText: string;
  coverIcon: 'photo' | 'camera' | 'sparkle' | 'films' | 'star';
  rotation: string;
  remainingTime?: string; // for developing films
  startDate?: string;
  endDate?: string;
  createdDate?: string;
  developedDate?: string;
  summaryMessage?: string;
  purpose?: string;
  stats?: {
    memoryDays: number;
    songCount: number;
    topMood: string;
    locationCount: number;
    topDay: string;
  };
  photos?: FilmPhoto[];
  notes?: FilmNote[];
  songs?: FilmSong[];
  moods?: FilmMood[];
  receiptLocations?: string;
}

export const MOCK_FILMS: FilmItem[] = [
  // 1. Summer Glow (Completed / Active Demo)
  {
    id: 'summer-glow-july-2026',
    title: 'summer glow',
    dateLabel: 'temmuz 2026',
    type: '35mm · iso 400',
    iso: 400,
    frameCount: 36,
    totalFrames: 36,
    status: 'completed',
    color: '#E3D7FF', // Lavender
    darkColor: '#8F66E3',
    serial: 'SG-0726-036',
    stampText: '35MM ISO 400',
    coverIcon: 'films',
    rotation: '-1.2deg',
    startDate: '1 temmuz 2026',
    endDate: '27 temmuz 2026',
    developedDate: '28 temmuz 2026',
    summaryMessage: 'temmuz filmin en çok akşam saatlerinde, sahile yakın yerlerde ve huzurlu hissettiğin günlerde doldu.',
    stats: {
      memoryDays: 17,
      songCount: 9,
      topMood: 'huzurlu',
      locationCount: 6,
      topDay: 'cumartesi',
    },
    photos: [
      { id: 'f1', frameNumber: 1, code: '01A', sceneTitle: 'gün batımı', dateStr: '03.07', isExposed: true, bgColors: ['#E3D7FF', '#CBEBFC'], iconName: 'photo' },
      { id: 'f2', frameNumber: 2, code: '02A', sceneTitle: 'sahil', dateStr: '05.07', isExposed: true, bgColors: ['#CBEBFC', '#C6F6D5'], iconName: 'sun' },
      { id: 'f3', frameNumber: 3, code: '03A', sceneTitle: 'kahve', dateStr: '08.07', isExposed: true, bgColors: ['#FFF1B0', '#FFD7EC'], iconName: 'sparkle' },
      { id: 'f4', frameNumber: 4, code: '04A', sceneTitle: 'şehir ışıkları', dateStr: '12.07', isExposed: true, bgColors: ['#FFD7EC', '#E3D7FF'], iconName: 'star' },
      { id: 'f5', frameNumber: 5, code: '05A', sceneTitle: 'arkadaş masası', dateStr: '15.07', isExposed: true, bgColors: ['#C6F6D5', '#FFF1B0'], iconName: 'photo' },
      { id: 'f6', frameNumber: 6, code: '06A', sceneTitle: 'gökyüzü', dateStr: '17.07', isExposed: true, bgColors: ['#CBEBFC', '#E3D7FF'], iconName: 'sun' },
      { id: 'f7', frameNumber: 7, code: '07A', sceneTitle: 'kitap', dateStr: '20.07', isExposed: true, bgColors: ['#FFF1B0', '#CBEBFC'], iconName: 'sparkle' },
      { id: 'f8', frameNumber: 8, code: '08A', sceneTitle: 'çiçek', dateStr: '21.07', isExposed: true, bgColors: ['#FFD7EC', '#C6F6D5'], iconName: 'photo' },
      { id: 'f9', frameNumber: 9, code: '09A', sceneTitle: 'sokak', dateStr: '24.07', isExposed: true, bgColors: ['#E3D7FF', '#FFF1B0'], iconName: 'camera' },
      { id: 'f10', frameNumber: 10, code: '10A', sceneTitle: 'konser ışığı', dateStr: '25.07', isExposed: true, bgColors: ['#C6F6D5', '#E3D7FF'], iconName: 'star' },
      { id: 'f11', frameNumber: 11, code: '11A', sceneTitle: 'pencere', dateStr: '26.07', isExposed: true, bgColors: ['#CBEBFC', '#FFD7EC'], iconName: 'sun' },
      { id: 'f12', frameNumber: 12, code: '12A', sceneTitle: 'gece yolu', dateStr: '27.07', isExposed: true, bgColors: ['#FFF1B0', '#CBEBFC'], iconName: 'photo' },
    ],
    notes: [
      { id: 'n1', text: 'bugün biraz yorucuydu ama akşam sahile çıkınca her şey daha güzel hissettirdi.', dateStr: '27 temmuz', frameCode: '12A', bgColor: '#FFF1B0' },
      { id: 'n2', text: 'yağmurdan sonra sokaklar çok güzel kokuyordu.', dateStr: '19 temmuz', frameCode: '07A', bgColor: '#FFFDF9' },
      { id: 'n3', text: 'küçük şeylerin aslında günü kurtardığını fark ettim.', dateStr: '8 temmuz', frameCode: '03A', bgColor: '#FFF1B0' },
    ],
    songs: [
      { id: 's1', title: 'a canım', artist: 'mabel matiz', dateStr: '27 temmuz' },
      { id: 's2', title: 'seni dert etmeler', artist: 'madrigal', dateStr: '24 temmuz' },
      { id: 's3', title: 'bir derdim var', artist: 'mor ve ötesi', dateStr: '18 temmuz' },
      { id: 's4', title: 'seni kendime sakladım', artist: 'duman', dateStr: '12 temmuz' },
      { id: 's5', title: 'aşk kırıntıları', artist: 'teoman', dateStr: '5 temmuz' },
    ],
    moods: [
      { mood: 'huzurlu', count: 8, color: '#C6F6D5' },
      { mood: 'mutlu', count: 5, color: '#FFF1B0' },
      { mood: 'yorgun', count: 3, color: '#CBEBFC' },
      { mood: 'özlemli', count: 1, color: '#FFD7EC' },
    ],
    receiptLocations: 'bostancı, kadıköy, moda',
  },

  // 2. Aktif Film (Summer Glow Active state)
  {
    id: 'film-active',
    title: 'summer glow',
    dateLabel: 'temmuz 2026',
    type: '35mm · iso 400',
    iso: 400,
    frameCount: 12,
    totalFrames: 36,
    status: 'active',
    color: '#E3D7FF',
    darkColor: '#8F66E3',
    serial: 'POZ-35MM-SG26',
    stampText: '35MM ISO 400',
    coverIcon: 'films',
    rotation: '-1.2deg',
    startDate: '1 temmuz 2026',
    summaryMessage: 'bu film üzerinde çekime devam ediyorsun. 24 kare daha var.',
    stats: {
      memoryDays: 8,
      songCount: 4,
      topMood: 'huzurlu',
      locationCount: 3,
      topDay: 'pazartesi',
    },
    photos: Array.from({ length: 12 }).map((_, i) => ({
      id: `act-f-${i}`,
      frameNumber: i + 1,
      code: `${String(i + 1).padStart(2, '0')}A`,
      sceneTitle: `kare #${i + 1}`,
      dateStr: '27.07',
      isExposed: i < 12,
      bgColors: ['#E3D7FF', '#CBEBFC'],
      iconName: 'photo',
    })),
    receiptLocations: 'bostancı, kadıköy',
  },

  // 3. Karanlık Odada (Developing Film)
  {
    id: 'film-dev-1',
    title: 'weekend roll',
    dateLabel: '28–30 temmuz',
    type: '35mm · iso 800',
    iso: 800,
    frameCount: 24,
    totalFrames: 24,
    status: 'developing',
    color: '#251628',
    darkColor: '#E54848',
    serial: 'POZ-DARKROOM-WR24',
    stampText: 'DEVELOPING',
    coverIcon: 'camera',
    rotation: '1.8deg',
    remainingTime: '2 sa 14 dk',
    startDate: '28 temmuz 2026',
    developedDate: '30 temmuz 2026',
    summaryMessage: 'film şu an karanlık odada banyoda. hazırlanması için az bir süre kaldı.',
    stats: {
      memoryDays: 3,
      songCount: 2,
      topMood: 'coşkulu',
      locationCount: 2,
      topDay: 'cumartesi',
    },
    photos: Array.from({ length: 12 }).map((_, i) => ({
      id: `dev-f-${i}`,
      frameNumber: i + 1,
      code: `${String(i + 1).padStart(2, '0')}A`,
      sceneTitle: `banyoda #${i + 1}`,
      dateStr: '29.07',
      isExposed: false,
      bgColors: ['#251628', '#16141D'],
      iconName: 'camera',
    })),
    receiptLocations: 'moda, adalar',
  },

  // 4. Haziran Günleri (Completed)
  {
    id: 'film-comp-1',
    title: 'haziran günleri',
    dateLabel: 'haziran 2026',
    type: 'golden hour 400',
    iso: 400,
    frameCount: 36,
    totalFrames: 36,
    status: 'completed',
    color: '#FFF1B0',
    darkColor: '#E6A800',
    serial: 'POZ-COMP-HG36',
    stampText: 'AÇILDI',
    coverIcon: 'photo',
    rotation: '-2deg',
    startDate: '1 haziran 2026',
    endDate: '30 haziran 2026',
    developedDate: '1 temmuz 2026',
    summaryMessage: 'haziran filmin sıcak gün batımları ve açık hava akşamlarıyla renklendi.',
    stats: {
      memoryDays: 20,
      songCount: 12,
      topMood: 'mutlu',
      locationCount: 8,
      topDay: 'cuma',
    },
    photos: Array.from({ length: 12 }).map((_, i) => ({
      id: `hg-f-${i}`,
      frameNumber: i + 1,
      code: `${String(i + 1).padStart(2, '0')}A`,
      sceneTitle: `haziran #${i + 1}`,
      dateStr: `${i + 1}.06`,
      isExposed: true,
      bgColors: ['#FFF1B0', '#FFD7EC'],
      iconName: 'sun',
    })),
    notes: [
      { id: 'hn1', text: 'yeni projeye başladık, enerji yüksek.', dateStr: '11 haziran', frameCode: '04A', bgColor: '#FFF1B0' },
      { id: 'hn2', text: 'yazın ilk dondurmasını sahilde yedik.', dateStr: '25 haziran', frameCode: '10A', bgColor: '#FFFDF9' },
    ],
    songs: [
      { id: 'hs1', title: 'güneş', artist: 'ezhel', dateStr: '25 haziran' },
      { id: 'hs2', title: 'yaz yağmuru', artist: 'serdar ortaç', dateStr: '18 haziran' },
    ],
    moods: [
      { mood: 'mutlu', count: 12, color: '#FFF1B0' },
      { mood: 'coşkulu', count: 5, color: '#FFD7EC' },
      { mood: 'huzurlu', count: 3, color: '#C6F6D5' },
    ],
    receiptLocations: 'beşiktaş, bebek, ortaköy',
  },

  // 5. Bahar Filmi (Completed)
  {
    id: 'film-comp-2',
    title: 'bahar filmi',
    dateLabel: 'mayıs 2026',
    type: 'soft sunday 200',
    iso: 200,
    frameCount: 24,
    totalFrames: 24,
    status: 'completed',
    color: '#C6F6D5',
    darkColor: '#2F855A',
    serial: 'POZ-COMP-BF24',
    stampText: 'AÇILDI',
    coverIcon: 'sparkle',
    rotation: '1.5deg',
    startDate: '1 mayıs 2026',
    endDate: '31 mayıs 2026',
    developedDate: '1 haziran 2026',
    summaryMessage: 'baharın ilk piknikleri ve taze çiçek kokuları bu ruloda saklı.',
    stats: {
      memoryDays: 14,
      songCount: 7,
      topMood: 'taze',
      locationCount: 5,
      topDay: 'pazar',
    },
    photos: Array.from({ length: 12 }).map((_, i) => ({
      id: `bf-f-${i}`,
      frameNumber: i + 1,
      code: `${String(i + 1).padStart(2, '0')}A`,
      sceneTitle: `bahar #${i + 1}`,
      dateStr: `${i + 1}.05`,
      isExposed: true,
      bgColors: ['#C6F6D5', '#CBEBFC'],
      iconName: 'sparkle',
    })),
    receiptLocations: 'emirgan, maçka parkı',
  },

  // 6. İstanbul Geceleri (Completed)
  {
    id: 'film-comp-3',
    title: 'istanbul geceleri',
    dateLabel: 'nisan 2026',
    type: 'midnight flash 800',
    iso: 800,
    frameCount: 18,
    totalFrames: 18,
    status: 'completed',
    color: '#231F33',
    darkColor: '#CBEBFC',
    serial: 'POZ-COMP-IG18',
    stampText: 'AÇILDI',
    coverIcon: 'star',
    rotation: '-1.5deg',
    startDate: '1 nisan 2026',
    endDate: '30 nisan 2026',
    developedDate: '1 mayıs 2026',
    summaryMessage: 'gece yürüyüşleri ve sokak lambalarının altında çekilen fotoğraflar.',
    stats: {
      memoryDays: 10,
      songCount: 6,
      topMood: 'özlemli',
      locationCount: 4,
      topDay: 'cumartesi',
    },
    photos: Array.from({ length: 12 }).map((_, i) => ({
      id: `ig-f-${i}`,
      frameNumber: i + 1,
      code: `${String(i + 1).padStart(2, '0')}A`,
      sceneTitle: `gece #${i + 1}`,
      dateStr: `${i + 1}.04`,
      isExposed: true,
      bgColors: ['#231F33', '#8F66E3'],
      iconName: 'star',
    })),
    receiptLocations: 'galata, karaköy, beyoğlu',
  },
];

export function getFilmById(id?: string): FilmItem | undefined {
  if (!id) return MOCK_FILMS[0];
  return MOCK_FILMS.find((f) => f.id === id) || MOCK_FILMS[0];
}

export function addNewFilm(film: FilmItem): void {
  // Prepend to MOCK_FILMS array so it appears at top of Films screen
  MOCK_FILMS.unshift(film);
}

export const initialFilmList: FilmItem[] = MOCK_FILMS;
