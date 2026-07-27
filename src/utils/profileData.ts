export interface ProfileMemory {
  id: string;
  title: string;
  dateStr: string;
  frameCode: string;
  rotation: string;
  bgColors: [string, string];
  iconName: 'photo' | 'camera' | 'sparkle' | 'sun';
}

export interface ProfileData {
  name: string;
  username: string;
  bio: string;
  city: string;
  memberSince: string;
  favoriteFilm: string;
  serial: string;
  stats: {
    filmCount: number;
    frameCount: number;
    songCount: number;
    memoryDayCount: number;
  };
  identity: {
    favoriteFilm: string;
    topMood: string;
    favoriteTime: string;
    topGenre: string;
    topLocation: string;
  };
  lastMemories: ProfileMemory[];
}

export const MOCK_PROFILE: ProfileData = {
  name: 'ırmak',
  username: '@irmakari',
  bio: 'küçük anları film gibi saklıyorum.',
  city: 'istanbul',
  memberSince: 'temmuz 2026',
  favoriteFilm: 'summer glow',
  serial: 'MEMBER-0726-IRM',
  stats: {
    filmCount: 7,
    frameCount: 186,
    songCount: 42,
    memoryDayCount: 31,
  },
  identity: {
    favoriteFilm: 'summer glow',
    topMood: 'huzurlu',
    favoriteTime: '18:00–21:00',
    topGenre: 'alternatif',
    topLocation: 'bostancı',
  },
  lastMemories: [
    {
      id: 'pm1',
      title: 'gün batımı',
      dateStr: '27.07',
      frameCode: '#12',
      rotation: '-3deg',
      bgColors: ['#E3D7FF', '#CBEBFC'],
      iconName: 'photo',
    },
    {
      id: 'pm2',
      title: 'sahil kahvesi',
      dateStr: '25.07',
      frameCode: '#10',
      rotation: '2.5deg',
      bgColors: ['#FFF1B0', '#FFD7EC'],
      iconName: 'sun',
    },
    {
      id: 'pm3',
      title: 'sokak ışıkları',
      dateStr: '21.07',
      frameCode: '#08',
      rotation: '-1.8deg',
      bgColors: ['#C6F6D5', '#E3D7FF'],
      iconName: 'sparkle',
    },
    {
      id: 'pm4',
      title: 'gece yürüyüşü',
      dateStr: '18.07',
      frameCode: '#05',
      rotation: '3deg',
      bgColors: ['#CBEBFC', '#FFF1B0'],
      iconName: 'camera',
    },
  ],
};
