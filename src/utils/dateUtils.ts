const TURKISH_MONTHS = [
  'ocak',
  'şubat',
  'mart',
  'nisan',
  'mayıs',
  'haziran',
  'temmuz',
  'ağustos',
  'eylül',
  'ekim',
  'kasım',
  'aralık',
];

const TURKISH_DAYS = [
  'pazar',
  'pazartesi',
  'salı',
  'çarşamba',
  'perşembe',
  'cuma',
  'cumartesi',
];

const SHORT_TURKISH_DAYS = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

export function getTodayKey(d = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getFormattedTodayHeader(d = new Date()): string {
  const dayNum = d.getDate();
  const monthName = TURKISH_MONTHS[d.getMonth()];
  const dayName = TURKISH_DAYS[d.getDay()];
  return `${dayNum} ${monthName}, ${dayName}`;
}

export function getFormattedTodayStamp(d = new Date()): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}

export function getFormattedTodayFull(d = new Date()): string {
  const dayNum = d.getDate();
  const monthName = TURKISH_MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${dayNum} ${monthName} ${year}`;
}

export function getFormattedTime(d = new Date()): string {
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function getWeekDays(d = new Date()) {
  const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.8deg', '1.2deg', '-2.2deg'];
  const todayDateNum = d.getDate();
  const currentDayOfWeek = d.getDay(); // 0 is Sunday, 1 is Monday

  // Calculate Monday of current week
  const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const mondayDate = new Date(d);
  mondayDate.setDate(d.getDate() + mondayOffset);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const dayObj = new Date(mondayDate);
    dayObj.setDate(mondayDate.getDate() + i);

    const dayNameIdx = dayObj.getDay();
    const dayNumber = dayObj.getDate();
    const isToday = dayNumber === todayDateNum;

    days.push({
      dayName: SHORT_TURKISH_DAYS[dayNameIdx],
      dayNumber,
      rotation: rotations[i % rotations.length],
      isToday,
      dateKey: getTodayKey(dayObj),
    });
  }

  return days;
}
