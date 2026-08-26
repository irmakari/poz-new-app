import { PhotoEntry } from './photoDetailData';

/**
 * Returns a local calendar date key in YYYY-MM-DD format.
 * Avoids UTC offset bugs around midnight by relying on local Date getters.
 */
export function getLocalDateKey(input?: Date | string | number): string {
  let dateObj: Date;

  if (!input) {
    dateObj = new Date();
  } else if (input instanceof Date) {
    dateObj = input;
  } else if (typeof input === 'number') {
    dateObj = new Date(input);
  } else if (typeof input === 'string') {
    // If input is already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(input.trim())) {
      return input.trim();
    }
    dateObj = new Date(input);
    if (isNaN(dateObj.getTime())) {
      // Fallback if parsing fails
      return input;
    }
  } else {
    dateObj = new Date();
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Checks if a given photo matches the target local dateKey (YYYY-MM-DD or formatted string).
 */
export function isPhotoMatchingDateKey(photo: PhotoEntry, dateKey: string): boolean {
  if (!photo) return false;

  // 1. Direct dateKey match in ID or properties
  if (photo.id && photo.id.includes(dateKey)) return true;

  // 2. Check capturedAt / developedAt ISO strings
  if (photo.capturedAt && getLocalDateKey(photo.capturedAt) === dateKey) return true;
  if (photo.developedAt && getLocalDateKey(photo.developedAt) === dateKey) return true;

  // 3. Check formatted date string (e.g. "27 temmuz 2026" or "2026-07-27")
  if (photo.date) {
    if (photo.date.includes(dateKey)) return true;

    // Check parsed date from string if possible
    const dateKeyParts = dateKey.split('-');
    if (dateKeyParts.length === 3) {
      const year = dateKeyParts[0];
      const monthNum = parseInt(dateKeyParts[1], 10);
      const dayNum = parseInt(dateKeyParts[2], 10);

      const turkishMonths = [
        'ocak', 'şubat', 'mart', 'nisan', 'mayıs', 'haziran',
        'temmuz', 'ağustos', 'eylül', 'ekim', 'kasım', 'aralık'
      ];
      const monthName = turkishMonths[monthNum - 1];

      if (monthName && photo.date.toLowerCase().includes(`${dayNum} ${monthName}`)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Retrieves the single canonical Daily photo for a given date.
 * If multiple legacy daily photos exist for the date, sorts deterministically and returns the latest,
 * while logging a development warning.
 */
export function getDailyPhotoForDate(photos: PhotoEntry[], dateKey: string): PhotoEntry | null {
  const normalizedKey = getLocalDateKey(dateKey);

  const dailyPhotosForDate = photos.filter((p) => {
    const isDaily = p.captureMode === 'daily' || (!p.filmId && p.visibility === 'immediate');
    return isDaily && isPhotoMatchingDateKey(p, normalizedKey);
  });

  if (dailyPhotosForDate.length === 0) {
    return null;
  }

  if (dailyPhotosForDate.length > 1) {
    if (__DEV__) {
      console.warn(`[Poz] Multiple daily photos found for ${normalizedKey}. Resolving deterministically.`);
    }

    // Sort deterministically: latest updatedAt / createdAt / capturedAt / developedAt DESC, fallback ID DESC
    dailyPhotosForDate.sort((a, b) => {
      const timeA = new Date((a as any).updatedAt || a.developedAt || a.capturedAt || 0).getTime();
      const timeB = new Date((b as any).updatedAt || b.developedAt || b.capturedAt || 0).getTime();

      if (timeA !== timeB) {
        return timeB - timeA;
      }
      return (b.id || '').localeCompare(a.id || '');
    });
  }

  return dailyPhotosForDate[0];
}

/**
 * Returns true if a Daily photo exists for the given local dateKey.
 */
export function hasDailyPhotoForDate(photos: PhotoEntry[], dateKey: string): boolean {
  return Boolean(getDailyPhotoForDate(photos, dateKey));
}

/**
 * Convenience helper to get today's canonical Daily photo.
 */
export function getTodayDailyPhoto(photos: PhotoEntry[]): PhotoEntry | null {
  return getDailyPhotoForDate(photos, getLocalDateKey());
}
