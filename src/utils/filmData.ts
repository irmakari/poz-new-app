// ─── Film Status ───────────────────────────────────────────────────────────────
export type FilmStatus =
  | 'draft'
  | 'active'
  | 'readyToDevelop'
  | 'developing'
  | 'completed'
  | 'archived';

// ─── Sub-types ─────────────────────────────────────────────────────────────────
export interface FilmPhoto {
  id: string;
  frameNumber: number;
  code: string; // e.g. "01A"
  sceneTitle: string;
  dateStr: string;
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

// ─── Film Preset (visual look / "film type") ────────────────────────────────────
export interface FilmPreset {
  id: string;
  name: string; // "Summer Glow", "Midnight", etc.
  iso: number;
  description: string;
  primaryColor: string;
  serialPrefix: string;
}

export const FILM_PRESETS: FilmPreset[] = [
  { id: 'ft-summer-glow', name: 'Summer Glow', iso: 400, description: 'sıcak ve yumuşak tonlar', primaryColor: '#111827', serialPrefix: 'SG' },
  { id: 'ft-golden-hour', name: 'Golden Hour', iso: 200, description: 'sıcak gün ışığı', primaryColor: '#3A261F', serialPrefix: 'GH' },
  { id: 'ft-soft-grain', name: 'Soft Grain', iso: 200, description: 'soluk ve sakin tonlar', primaryColor: '#6B7052', serialPrefix: 'SR' },
  { id: 'ft-midnight', name: 'Midnight', iso: 800, description: 'gece ve flaş çekimleri', primaryColor: '#182235', serialPrefix: 'MF' },
  { id: 'ft-bw', name: 'Black & White', iso: 400, description: 'kontrastlı siyah beyaz', primaryColor: '#16141D', serialPrefix: 'BW' },
];

// ─── FilmItem ──────────────────────────────────────────────────────────────────
export interface FilmItem {
  id: string;

  // User-given film name (e.g. "italya yazı")
  name: string;
  // Backwards-compatible alias — same as name
  title: string;

  // Visual preset (e.g. "Summer Glow")
  filmTypeName: string;
  filmTypeId?: string;

  // Legacy type string (e.g. "35mm · iso 400") — kept for compatibility
  type: string;
  iso: number;

  // Frame counts
  totalFrames: number;
  capturedFrames: number; // canonical
  frameCount: number;     // alias for capturedFrames
  currentFrames?: number; // alias
  remainingFrames?: number;

  // Status
  status: FilmStatus;

  // Color
  colorToken: string; // primary card color
  color: string;      // alias
  darkColor?: string;

  // Timestamps
  createdAt?: string;
  completedAt?: string | null;
  developingStartedAt?: string | null;
  developedAt?: string | null;

  // Legacy date strings
  dateLabel: string;
  startDate?: string;
  endDate?: string;
  createdDate?: string;
  developedDate?: string;
  remainingTime?: string;

  // Legacy decorative fields (kept for component compat)
  serial: string;
  stampText: string;
  coverIcon: 'photo' | 'camera' | 'sparkle' | 'films' | 'star';
  rotation: string;
  isoTag?: string;
  typeTag?: string;
  badgeLabel?: string;
  badgeColor?: string;
  badgeDarkColor?: string;
  description?: string;
  summaryMessage?: string;
  purpose?: string;
  receiptLocations?: string;
  coverPhotoId?: string | null;

  // Rich content
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
}

// ─── Helper to build a consistent FilmItem ─────────────────────────────────────
function makeFilm(partial: Partial<FilmItem> & {
  id: string;
  name: string;
  filmTypeName: string;
  totalFrames: number;
  capturedFrames: number;
  status: FilmStatus;
  colorToken: string;
}): FilmItem {
  return {
    title: partial.name,
    type: `35mm · iso ${partial.iso || 400}`,
    iso: partial.iso || 400,
    frameCount: partial.capturedFrames,
    currentFrames: partial.capturedFrames,
    remainingFrames: partial.totalFrames - partial.capturedFrames,
    color: partial.colorToken,
    serial: `POZ-${partial.filmTypeName.slice(0, 2).toUpperCase()}${partial.id.slice(-4).toUpperCase()}`,
    stampText: `35MM ISO ${partial.iso || 400}`,
    coverIcon: 'films',
    rotation: '-1.2deg',
    dateLabel: partial.dateLabel || 'temmuz 2026',
    ...partial,
  };
}

// ─── Mock Films ────────────────────────────────────────────────────────────────
export const MOCK_FILMS: FilmItem[] = [
  // 1. Aktif film — çekilmekte olan
  makeFilm({
    id: 'film-active',
    name: 'temmuz günleri',
    filmTypeName: 'Summer Glow',
    filmTypeId: 'ft-summer-glow',
    totalFrames: 24,
    capturedFrames: 8,
    status: 'active',
    colorToken: '#111827',
    darkColor: '#8FA8B8',
    dateLabel: 'temmuz 2026',
    startDate: '10 temmuz 2026',
    photos: Array.from({ length: 8 }).map((_, i) => ({
      id: `act-f-${i}`,
      frameNumber: i + 1,
      code: `${String(i + 1).padStart(2, '0')}A`,
      sceneTitle: `kare #${i + 1}`,
      dateStr: '27.07',
      isExposed: true,
      bgColors: ['#111827', '#182235'] as [string, string],
      iconName: 'photo' as const,
    })),
    notes: [],
    songs: [],
    moods: [],
    stats: { memoryDays: 8, songCount: 4, topMood: 'huzurlu', locationCount: 3, topDay: 'pazartesi' },
  }),

  // 2. Yıkanmaya hazır — tamamlandı, banyo bekliyor
  makeFilm({
    id: 'film-ready',
    name: 'hafta sonu rulosu',
    filmTypeName: 'Midnight',
    filmTypeId: 'ft-midnight',
    iso: 800,
    totalFrames: 12,
    capturedFrames: 12,
    status: 'readyToDevelop',
    colorToken: '#182235',
    darkColor: '#8FA8B8',
    dateLabel: 'temmuz 2026',
    startDate: '20 temmuz 2026',
    completedAt: '27 temmuz 2026',
    photos: Array.from({ length: 12 }).map((_, i) => ({
      id: `rdy-f-${i}`,
      frameNumber: i + 1,
      code: `${String(i + 1).padStart(2, '0')}A`,
      sceneTitle: `kare #${i + 1}`,
      dateStr: '27.07',
      isExposed: true,
      bgColors: ['#182235', '#182235'] as [string, string],
      iconName: 'photo' as const,
    })),
    notes: [],
    songs: [],
    moods: [],
  }),

  // 3. Karanlık odada — banyo aşamasında
  makeFilm({
    id: 'film-dev-1',
    name: 'weekend roll',
    filmTypeName: 'Midnight',
    filmTypeId: 'ft-midnight',
    iso: 800,
    totalFrames: 24,
    capturedFrames: 24,
    status: 'developing',
    colorToken: '#182235',
    darkColor: '#C94A4A',
    dateLabel: 'temmuz 2026',
    startDate: '15 temmuz 2026',
    developingStartedAt: '28 temmuz 2026',
    remainingTime: '2 sa 14 dk',
    photos: Array.from({ length: 12 }).map((_, i) => ({
      id: `dev-f-${i}`,
      frameNumber: i + 1,
      code: `${String(i + 1).padStart(2, '0')}A`,
      sceneTitle: `banyoda #${i + 1}`,
      dateStr: '29.07',
      isExposed: false,
      bgColors: ['#182235', '#111827'] as [string, string],
      iconName: 'camera' as const,
    })),
    notes: [],
    songs: [],
    moods: [],
  }),

  // 4. Tamamlanan — summer glow
  makeFilm({
    id: 'summer-glow-july-2026',
    name: 'summer glow',
    filmTypeName: 'Summer Glow',
    filmTypeId: 'ft-summer-glow',
    totalFrames: 36,
    capturedFrames: 36,
    status: 'completed',
    colorToken: '#111827',
    darkColor: '#8FA8B8',
    dateLabel: 'temmuz 2026',
    startDate: '1 temmuz 2026',
    endDate: '27 temmuz 2026',
    developedAt: '28 temmuz 2026',
    developedDate: '28 temmuz 2026',
    summaryMessage: 'temmuz filmin en çok akşam saatlerinde doldu.',
    stats: { memoryDays: 17, songCount: 9, topMood: 'huzurlu', locationCount: 6, topDay: 'cumartesi' },
    photos: [
      { id: 'f1', frameNumber: 1, code: '01A', sceneTitle: 'gün batımı', dateStr: '03.07', isExposed: true, bgColors: ['#111827', '#182235'], iconName: 'photo' },
      { id: 'f2', frameNumber: 2, code: '02A', sceneTitle: 'sahil', dateStr: '05.07', isExposed: true, bgColors: ['#182235', '#5A1F2D'], iconName: 'sun' },
      { id: 'f3', frameNumber: 3, code: '03A', sceneTitle: 'kahve', dateStr: '08.07', isExposed: true, bgColors: ['#3A261F', '#A98543'], iconName: 'sparkle' },
      { id: 'f4', frameNumber: 4, code: '04A', sceneTitle: 'şehir', dateStr: '12.07', isExposed: true, bgColors: ['#5A1F2D', '#111827'], iconName: 'star' },
      { id: 'f5', frameNumber: 5, code: '05A', sceneTitle: 'arkadaş', dateStr: '15.07', isExposed: true, bgColors: ['#6B7052', '#3A261F'], iconName: 'photo' },
      { id: 'f6', frameNumber: 6, code: '06A', sceneTitle: 'gökyüzü', dateStr: '17.07', isExposed: true, bgColors: ['#8FA8B8', '#111827'], iconName: 'sun' },
      { id: 'f7', frameNumber: 7, code: '07A', sceneTitle: 'kitap', dateStr: '20.07', isExposed: true, bgColors: ['#A98543', '#8FA8B8'], iconName: 'sparkle' },
      { id: 'f8', frameNumber: 8, code: '08A', sceneTitle: 'çiçek', dateStr: '21.07', isExposed: true, bgColors: ['#5A1F2D', '#6B7052'], iconName: 'photo' },
      { id: 'f9', frameNumber: 9, code: '09A', sceneTitle: 'sokak', dateStr: '24.07', isExposed: true, bgColors: ['#182235', '#A98543'], iconName: 'camera' },
      { id: 'f10', frameNumber: 10, code: '10A', sceneTitle: 'konser', dateStr: '25.07', isExposed: true, bgColors: ['#6B7052', '#182235'], iconName: 'star' },
      { id: 'f11', frameNumber: 11, code: '11A', sceneTitle: 'pencere', dateStr: '26.07', isExposed: true, bgColors: ['#8FA8B8', '#5A1F2D'], iconName: 'sun' },
      { id: 'f12', frameNumber: 12, code: '12A', sceneTitle: 'gece yolu', dateStr: '27.07', isExposed: true, bgColors: ['#A98543', '#8FA8B8'], iconName: 'photo' },
    ],
    notes: [
      { id: 'n1', text: 'bugün biraz yorucuydu ama akşam sahile çıkınca her şey güzel hissettirdi.', dateStr: '27 temmuz', frameCode: '12A', bgColor: '#F7F2EA' },
      { id: 'n2', text: 'yağmurdan sonra sokaklar çok güzel kokuyordu.', dateStr: '19 temmuz', frameCode: '07A', bgColor: '#F7F2EA' },
    ],
    songs: [
      { id: 's1', title: 'a canım', artist: 'mabel matiz', dateStr: '27 temmuz' },
      { id: 's2', title: 'seni dert etmeler', artist: 'madrigal', dateStr: '24 temmuz' },
    ],
    moods: [
      { mood: 'huzurlu', count: 8, color: '#6B7052' },
      { mood: 'mutlu', count: 5, color: '#A98543' },
    ],
    receiptLocations: 'bostancı, kadıköy, moda',
  }),

  // 5. Haziran günleri (completed)
  makeFilm({
    id: 'film-comp-1',
    name: 'haziran günleri',
    filmTypeName: 'Golden Hour',
    filmTypeId: 'ft-golden-hour',
    iso: 400,
    totalFrames: 36,
    capturedFrames: 36,
    status: 'completed',
    colorToken: '#3A261F',
    darkColor: '#A98543',
    dateLabel: 'haziran 2026',
    startDate: '1 haziran 2026',
    endDate: '30 haziran 2026',
    developedDate: '1 temmuz 2026',
    summaryMessage: 'haziran filmin sıcak gün batımları ile doldu.',
    photos: Array.from({ length: 12 }).map((_, i) => ({
      id: `hg-f-${i}`,
      frameNumber: i + 1,
      code: `${String(i + 1).padStart(2, '0')}A`,
      sceneTitle: `haziran #${i + 1}`,
      dateStr: `${i + 1}.06`,
      isExposed: true,
      bgColors: ['#3A261F', '#A98543'] as [string, string],
      iconName: 'sun' as const,
    })),
    notes: [{ id: 'hn1', text: 'yazın ilk dondurmasını sahilde yedik.', dateStr: '25 haziran', bgColor: '#F7F2EA' }],
    songs: [{ id: 'hs1', title: 'güneş', artist: 'ezhel', dateStr: '25 haziran' }],
    moods: [{ mood: 'mutlu', count: 12, color: '#A98543' }],
    receiptLocations: 'beşiktaş, bebek, ortaköy',
    stats: { memoryDays: 20, songCount: 12, topMood: 'mutlu', locationCount: 8, topDay: 'cuma' },
  }),

  // 6. İstanbul geceleri (completed)
  makeFilm({
    id: 'film-comp-3',
    name: 'istanbul geceleri',
    filmTypeName: 'Midnight',
    filmTypeId: 'ft-midnight',
    iso: 800,
    totalFrames: 18,
    capturedFrames: 18,
    status: 'completed',
    colorToken: '#182235',
    darkColor: '#8FA8B8',
    dateLabel: 'nisan 2026',
    startDate: '1 nisan 2026',
    endDate: '30 nisan 2026',
    developedDate: '1 mayıs 2026',
    photos: Array.from({ length: 12 }).map((_, i) => ({
      id: `ig-f-${i}`,
      frameNumber: i + 1,
      code: `${String(i + 1).padStart(2, '0')}A`,
      sceneTitle: `gece #${i + 1}`,
      dateStr: `${i + 1}.04`,
      isExposed: true,
      bgColors: ['#182235', '#182235'] as [string, string],
      iconName: 'star' as const,
    })),
    notes: [],
    songs: [],
    moods: [{ mood: 'özlemli', count: 7, color: '#8FA8B8' }],
    receiptLocations: 'galata, karaköy, beyoğlu',
    stats: { memoryDays: 10, songCount: 6, topMood: 'özlemli', locationCount: 4, topDay: 'cumartesi' },
  }),
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
export function getFilmById(id?: string): FilmItem | undefined {
  if (!id) return MOCK_FILMS[0];
  return MOCK_FILMS.find((f) => f.id === id) || MOCK_FILMS[0];
}

export function addNewFilm(film: FilmItem): void {
  MOCK_FILMS.unshift(film);
}

export const initialFilmList: FilmItem[] = MOCK_FILMS;

// Auto-generated film name seeds
const AUTO_NAME_SEEDS = [
  'temmuz filmi', 'hafta sonu rulosu', 'istanbul geceleri', 'yaz anıları',
  'kahve molası', 'akşam yürüyüşü', 'mavi gökyüzü', 'sahil günleri',
];
let autoNameIdx = 0;
export function generateAutoFilmName(): string {
  const name = AUTO_NAME_SEEDS[autoNameIdx % AUTO_NAME_SEEDS.length];
  autoNameIdx++;
  return name;
}
