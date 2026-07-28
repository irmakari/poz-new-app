export type CaptureMode = 'daily' | 'film';
export type PhotoStatus = 'developed' | 'locked' | 'developing' | 'unlocked';
export type PhotoVisibility = 'immediate' | 'delayed';
export type SceneType = 'sunset-seaside' | 'coffee-table' | 'city-street' | 'midnight-lights';

export interface PhotoSong {
  id?: string;
  title: string;
  artist: string;
  duration?: string;
  coverColor?: string;
  album?: string;
}

export interface PhotoEntry {
  id: string;
  captureMode?: CaptureMode;
  status: PhotoStatus;
  visibility?: PhotoVisibility;
  frameNumber?: string | number | null;
  frameCode?: string | null;
  date: string;
  dateLabel?: string;
  time?: string;
  filmId?: string | null;
  filmTitle?: string | null;
  filmType?: string;
  serial?: string;
  code?: string;
  location?: string;
  mood?: string;
  note?: string;
  song?: PhotoSong;
  sceneType?: SceneType | string;
  bgColors?: [string, string];
  photoUri?: string;
  capturedAt?: string;
  developedAt?: string | null;
}

export const MOCK_PHOTO_DATABASE: Record<string, PhotoEntry> = {
  // Daily Mock Photos (for 27 July 2026 testing)
  'daily-2026-07-27-01': {
    id: 'daily-2026-07-27-01',
    captureMode: 'daily',
    status: 'developed',
    visibility: 'immediate',
    photoUri: undefined,
    sceneType: 'coffee-table',
    filmId: null,
    filmTitle: null,
    frameNumber: null,
    date: '27 temmuz 2026',
    time: '14:20',
    location: 'kadıköy',
    note: 'öğleden sonra kısa bir kahve molası verdim.',
    mood: 'sakin',
    capturedAt: '2026-07-27T14:20:00',
    developedAt: '2026-07-27T14:20:00',
    bgColors: ['#FFF1B0', '#FFD7EC'],
  },
  'daily-2026-07-27-02': {
    id: 'daily-2026-07-27-02',
    captureMode: 'daily',
    status: 'developed',
    visibility: 'immediate',
    sceneType: 'city-street',
    filmId: null,
    filmTitle: null,
    frameNumber: null,
    date: '27 temmuz 2026',
    time: '20:10',
    location: 'moda caddesi',
    song: {
      title: 'seni dert etmeler',
      artist: 'madrigal',
    },
    capturedAt: '2026-07-27T20:10:00',
    developedAt: '2026-07-27T20:10:00',
    bgColors: ['#CBEBFC', '#E3D7FF'],
  },
  // 1. Primary Mock Photo (sunset-seaside)
  'summer-glow-13': {
    id: 'summer-glow-13',
    frameNumber: 13,
    frameCode: '13A',
    date: '27 temmuz 2026',
    dateLabel: 'pazartesi',
    time: '18:42',
    filmId: 'summer-glow-july-2026',
    filmTitle: 'summer glow',
    filmType: '35mm · iso 400',
    serial: 'SG-0726-013',
    location: 'bostancı sahili',
    mood: 'huzurlu',
    note: 'bugün biraz yorucuydu ama akşam sahile çıkınca her şey daha güzel hissettirdi. uzun zamandır ilk kez hiçbir şeyi düşünmeden sadece oturdum.',
    song: {
      id: 'song-1',
      title: 'a canım',
      artist: 'mabel matiz',
      duration: '3:42',
      coverColor: '#FFD7EC',
    },
    sceneType: 'sunset-seaside',
    status: 'developed',
    bgColors: ['#E3D7FF', '#CBEBFC'],
  },

  // 2. Coffee Table Photo
  'summer-glow-08': {
    id: 'summer-glow-08',
    frameNumber: 8,
    frameCode: '08A',
    date: '21 temmuz 2026',
    dateLabel: 'salı',
    time: '15:10',
    filmId: 'summer-glow-july-2026',
    filmTitle: 'summer glow',
    filmType: '35mm · iso 400',
    serial: 'SG-0726-008',
    location: 'kadıköy',
    mood: 'yorgun',
    note: 'öğleden sonra kahve molası verirken defterime birkaç satır karaladım.',
    sceneType: 'coffee-table',
    status: 'developed',
    bgColors: ['#FFF1B0', '#FFD7EC'],
  },

  // 3. City Street Photo
  'golden-hour-21': {
    id: 'golden-hour-21',
    frameNumber: 21,
    frameCode: '21A',
    date: '18 temmuz 2026',
    dateLabel: 'cumartesi',
    time: '19:15',
    filmId: 'summer-glow-july-2026',
    filmTitle: 'golden hour',
    filmType: '35mm · iso 200',
    serial: 'GH-0726-021',
    location: 'moda caddesi',
    mood: 'mutlu',
    note: 'gün batımında altın saatler sokakları turuncu renge boyuyordu.',
    song: {
      id: 'song-2',
      title: 'seni dert etmeler',
      artist: 'madrigal',
      duration: '3:15',
      coverColor: '#FFF1B0',
    },
    sceneType: 'city-street',
    status: 'developed',
    bgColors: ['#C6F6D5', '#FFF1B0'],
  },

  // 4. Midnight Lights Photo
  'midnight-04': {
    id: 'midnight-04',
    frameNumber: 4,
    frameCode: '04A',
    date: '12 temmuz 2026',
    dateLabel: 'pazar',
    time: '23:45',
    filmId: 'summer-glow-july-2026',
    filmTitle: 'midnight flash',
    filmType: '35mm · iso 800',
    serial: 'MF-0726-004',
    location: 'beşiktaş',
    mood: 'heyecanlı',
    note: 'gece yürüyüşünde flaşlı çekimlerle harika ışıklar yakaladık.',
    song: {
      id: 'song-3',
      title: 'bir derdim var',
      artist: 'mor ve ötesi',
      duration: '3:48',
      coverColor: '#E3D7FF',
    },
    sceneType: 'midnight-lights',
    status: 'developed',
    bgColors: ['#231F33', '#8F66E3'],
  },

  // 5. Locked Frame Photo Demo
  'locked-frame-demo': {
    id: 'locked-frame-demo',
    frameNumber: 15,
    frameCode: '15A',
    date: '28 temmuz 2026',
    dateLabel: 'salı',
    time: '20:30',
    filmId: 'summer-glow-july-2026',
    filmTitle: 'summer glow',
    filmType: '35mm · iso 400',
    serial: 'SG-0726-015',
    sceneType: 'sunset-seaside',
    status: 'locked',
    bgColors: ['#251628', '#16141D'],
  },
};

export function getPhotoById(id?: string): PhotoEntry {
  if (!id || !MOCK_PHOTO_DATABASE[id]) {
    // If exact key match isn't found, try finding by matching substring or default to primary
    const matchedKey = Object.keys(MOCK_PHOTO_DATABASE).find((key) => id && key.includes(id));
    if (matchedKey) return MOCK_PHOTO_DATABASE[matchedKey];
    
    // Construct dynamic photo for generic IDs (e.g. f1, f2, f12, act-f-1)
    if (id) {
      return {
        id,
        frameNumber: 13,
        frameCode: '13A',
        date: '27 temmuz 2026',
        dateLabel: 'pazartesi',
        time: '18:42',
        filmId: 'summer-glow-july-2026',
        filmTitle: 'summer glow',
        filmType: '35mm · iso 400',
        serial: `SG-0726-${id.slice(-3)}`,
        location: 'bostancı sahili',
        mood: 'huzurlu',
        note: 'bugün biraz yorucuydu ama akşam sahile çıkınca her şey daha güzel hissettirdi. uzun zamandır ilk kez hiçbir şeyi düşünmeden sadece oturdum.',
        song: {
          id: 'song-1',
          title: 'a canım',
          artist: 'mabel matiz',
          duration: '3:42',
          coverColor: '#FFD7EC',
        },
        sceneType: 'sunset-seaside',
        status: id.includes('dev') || id.includes('lock') ? 'locked' : 'developed',
        bgColors: ['#E3D7FF', '#CBEBFC'],
      };
    }

    return MOCK_PHOTO_DATABASE['summer-glow-13'];
  }
  return MOCK_PHOTO_DATABASE[id];
}

export const initialPhotoEntries: PhotoEntry[] = Object.values(MOCK_PHOTO_DATABASE);
