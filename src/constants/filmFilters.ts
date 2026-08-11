export type FilterType = 'dazz-green' | 'dazz-blue' | 'cpm-dark' | 'vintage-warm' | 'bw-noir';

export interface FilterOption {
  id: FilterType;
  name: string;
  badge: string;
  overlayColor: string;
  vignetteColor: string;
}

export const FILTERS: FilterOption[] = [
  {
    id: 'dazz-green',
    name: 'D-Green (CPM 35)',
    badge: '💚 KOYU YEŞİL',
    overlayColor: 'rgba(12, 60, 48, 0.35)', // Rich dark emerald teal tone
    vignetteColor: 'rgba(5, 30, 24, 0.55)',
  },
  {
    id: 'dazz-blue',
    name: 'D-Blue (Gece Mavisi)',
    badge: '💙 GECE MAVİSİ',
    overlayColor: 'rgba(14, 32, 75, 0.38)', // Deep midnight cobalt blue tone
    vignetteColor: 'rgba(6, 14, 38, 0.58)',
  },
  {
    id: 'cpm-dark',
    name: 'CPM 35 (Koyu Sinematik)',
    badge: '🎬 KOYU SİNEMATİK',
    overlayColor: 'rgba(25, 20, 38, 0.42)', // Moody deep cinematic contrast
    vignetteColor: 'rgba(10, 8, 18, 0.65)',
  },
  {
    id: 'vintage-warm',
    name: 'Warm Vintage 90s',
    badge: '🍂 SICAK AMBER',
    overlayColor: 'rgba(210, 120, 50, 0.22)',
    vignetteColor: 'rgba(40, 20, 8, 0.45)',
  },
  {
    id: 'bw-noir',
    name: '35mm Dark Noir',
    badge: '🖤 NOIR MONO',
    overlayColor: 'rgba(15, 15, 22, 0.52)',
    vignetteColor: 'rgba(0, 0, 0, 0.75)',
  },
];
