export interface DayMemory {
  photos?: number;
  notes?: number;
  songs?: number;
  mood?: string;
  noteText?: string;
  songText?: string;
}

export interface CalendarDayCell {
  dateNumber: number;
  fullDateString: string; // e.g. "2026-07-27"
  isCurrentMonth: boolean;
  isToday?: boolean;
  memory?: DayMemory;
}

export const MONTH_NAMES = ['haziran 2026', 'temmuz 2026', 'ağustos 2026'];

// Mock Data indexed by YYYY-MM-DD
export const MOCK_MEMORIES: Record<string, DayMemory> = {
  // Temmuz 2026
  '2026-07-03': { photos: 1 },
  '2026-07-05': { notes: 1, mood: 'sakin' },
  '2026-07-08': { photos: 2, songs: 1, songText: 'güneş - ezhel' },
  '2026-07-12': { photos: 1, notes: 1, noteText: 'sahilde yürüyüş yaptık.' },
  '2026-07-17': { mood: 'neşeli' },
  '2026-07-21': { photos: 2 },
  '2026-07-24': { notes: 1, songs: 1, noteText: 'kahve keyfi.' },
  '2026-07-27': {
    photos: 2,
    notes: 1,
    songs: 1,
    mood: 'huzurlu',
    noteText: 'bugün biraz yorucuydu ama akşam güzel hissettirdi.',
    songText: 'a canım • mabel matiz',
  },
  '2026-07-29': { photos: 1 },
  '2026-07-31': { songs: 1, songText: 'yaz yağmuru - serdar ortaç' },

  // Haziran 2026 Mock
  '2026-06-04': { photos: 1, mood: 'mutlu' },
  '2026-06-11': { notes: 1, noteText: 'yeni projeye başladık.' },
  '2026-06-18': { photos: 3, songs: 1 },
  '2026-06-25': { mood: 'coşkulu', photos: 1 },

  // Ağustos 2026 Mock
  '2026-08-02': { photos: 1, mood: 'enerjik' },
  '2026-08-10': { notes: 1, songs: 1 },
  '2026-08-15': { photos: 2, mood: 'huzurlu' },
  '2026-08-22': { photos: 1, notes: 1 },
};

/**
 * Generate 7-column grid cell array for specified month (0 = June, 1 = July, 2 = August 2026)
 */
export function generateCalendarGrid(monthIndex: number): {
  monthTitle: string;
  year: number;
  monthNum: number; // 6, 7, 8
  days: CalendarDayCell[];
} {
  // Month mapping: 0 -> June 2026, 1 -> July 2026, 2 -> August 2026
  const monthNum = monthIndex + 6; // 6 = June, 7 = July, 8 = August
  const year = 2026;
  const monthTitle = MONTH_NAMES[monthIndex] || 'temmuz 2026';

  // JS Date month is 0-indexed: June = 5, July = 6, Aug = 7
  const jsMonth = monthNum - 1;
  const firstDayObj = new Date(year, jsMonth, 1);
  const daysInMonth = new Date(year, jsMonth + 1, 0).getDate();

  // Monday = 0, Sunday = 6
  let firstDayOfWeek = firstDayObj.getDay() - 1;
  if (firstDayOfWeek === -1) firstDayOfWeek = 6;

  const days: CalendarDayCell[] = [];

  // Previous month trailing days
  const prevMonthDays = new Date(year, jsMonth, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevMonthDays - i;
    const prevMonthNum = monthNum === 6 ? 12 : monthNum - 1;
    const prevYear = monthNum === 6 ? year - 1 : year;
    const dateStr = `${prevYear}-${String(prevMonthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    days.push({
      dateNumber: dayNum,
      fullDateString: dateStr,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
    const dateStr = `${year}-${String(monthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    const isToday = monthNum === 7 && dayNum === 27; // 27 July 2026 is today
    days.push({
      dateNumber: dayNum,
      fullDateString: dateStr,
      isCurrentMonth: true,
      isToday,
      memory: MOCK_MEMORIES[dateStr],
    });
  }

  // Next month leading padding days to complete grid multiples of 7
  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let dayNum = 1; dayNum <= remaining; dayNum++) {
      const nextMonthNum = monthNum === 12 ? 1 : monthNum + 1;
      const nextYear = monthNum === 12 ? year + 1 : year;
      const dateStr = `${nextYear}-${String(nextMonthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({
        dateNumber: dayNum,
        fullDateString: dateStr,
        isCurrentMonth: false,
      });
    }
  }

  return { monthTitle, year, monthNum, days };
}
