import { PozIconName } from '@/components/PozIcon';

export interface PhotoDetailItem {
  id: string;
  code: string; // e.g. "KARE #01"
  dateStr: string; // e.g. "27.07.26"
  rotation: string; // e.g. "-3deg"
  bgGradient: [string, string]; // pastel colors
  iconName: PozIconName;
}

export interface DayDetailEntry {
  date: string; // YYYY-MM-DD
  dayTitle: string; // "27 temmuz"
  daySubTitle: string; // "pazartesi · 2026"
  stampText: string; // "27 JUL 2026"
  summaryText: string;
  mood: string; // "huzurlu"
  moodSubtext?: string; // "akşam saatlerinde daha sakin hissettin."
  note?: {
    text: string;
    metaText: string; // "22:45 · evde yazıldı"
  };
  song?: {
    title: string;
    artist: string;
    duration: string; // "3:42"
  };
  photos?: PhotoDetailItem[];
  details?: {
    timeRange: string; // "18:20 – 22:45"
    location: string; // "bostancı"
    film: string; // "summer glow"
    frames: string; // "12 ve 13. kare"
    weather: string; // "ılık akşam"
  };
}

export const DAY_ENTRIES: Record<string, DayDetailEntry> = {
  '2026-07-27': {
    date: '2026-07-27',
    dayTitle: '27 temmuz',
    daySubTitle: 'pazartesi · 2026',
    stampText: '27 JUL 2026',
    summaryText: 'bugün filmine 2 kare, bir not ve bir şarkı ekledin.',
    mood: 'huzurlu',
    moodSubtext: 'akşam saatlerinde sahilde daha sakin hissettin.',
    note: {
      text: 'bugün biraz yorucuydu ama akşam sahile çıkınca her şey daha güzel hissettirdi. uzun zamandır ilk kez hiçbir şeyi düşünmeden sadece oturdum.',
      metaText: '22:45 · evde yazıldı',
    },
    song: {
      title: 'a canım',
      artist: 'mabel matiz',
      duration: '3:42',
    },
    photos: [
      {
        id: 'p1',
        code: 'KARE #01',
        dateStr: '27.07.26',
        rotation: '-3deg',
        bgGradient: ['#E3D7FF', '#CBEBFC'],
        iconName: 'photo',
      },
      {
        id: 'p2',
        code: 'KARE #02',
        dateStr: '27.07.26',
        rotation: '3.5deg',
        bgGradient: ['#FFD7EC', '#FFF1B0'],
        iconName: 'camera',
      },
    ],
    details: {
      timeRange: '18:20 – 22:45',
      location: 'bostancı',
      film: 'summer glow',
      frames: '12 ve 13. kare',
      weather: 'ılık akşam',
    },
  },

  '2026-07-08': {
    date: '2026-07-08',
    dayTitle: '8 temmuz',
    daySubTitle: 'çarşamba · 2026',
    stampText: '08 JUL 2026',
    summaryText: 'bugün filmine 2 kare ve bir şarkı ekledin.',
    mood: 'coşkulu',
    moodSubtext: 'müzik dinlerken enerji dolu bir gündü.',
    song: {
      title: 'güneş',
      artist: 'ezhel',
      duration: '4:12',
    },
    photos: [
      {
        id: 'p8-1',
        code: 'KARE #01',
        dateStr: '08.07.26',
        rotation: '-2deg',
        bgGradient: ['#CBEBFC', '#C6F6D5'],
        iconName: 'photo',
      },
      {
        id: 'p8-2',
        code: 'KARE #02',
        dateStr: '08.07.26',
        rotation: '2deg',
        bgGradient: ['#FFF1B0', '#FFD7EC'],
        iconName: 'sparkle',
      },
    ],
    details: {
      timeRange: '14:00 – 20:30',
      location: 'kadıköy',
      film: 'summer glow',
      frames: '04 ve 05. kare',
      weather: 'güneşli',
    },
  },
};
