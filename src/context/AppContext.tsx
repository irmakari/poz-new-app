import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialFilmList, FilmItem, FilmPhoto, generateAutoFilmName } from '@/utils/filmData';
import { initialPhotoEntries, PhotoEntry, CaptureMode } from '@/utils/photoDetailData';
import { getTodayKey, getFormattedTodayFull, getFormattedTime } from '@/utils/dateUtils';
import { getLocalDateKey, getDailyPhotoForDate, hasDailyPhotoForDate } from '@/utils/dailyMemory.utils';
import { filmsApi, photosApi, notesApi, authApi } from '@/api';

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface DailyNoteItem {
  dateKey: string;
  note: string;
  timestamp: string;
  mood?: string;
  location?: string;
  song?: { title: string; artist: string };
}

export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
}

interface AppContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  films: FilmItem[];
  activeFilm: FilmItem | null;
  selectedActiveFilmId: string | null;
  photos: PhotoEntry[];
  dailyNotes: Record<string, DailyNoteItem>;
  isLoading: boolean;
  currentCaptureMode: CaptureMode;

  // Auth actions
  loginUser: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  registerUser: (data: { email: string; password?: string; username?: string; full_name?: string }) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => Promise<void>;

  // Capture mode
  selectCaptureMode: (mode: CaptureMode) => void;

  // Daily Photo single-photo helpers & actions
  dailyPhotoForDate: (dateKey?: string) => PhotoEntry | null;
  hasDailyPhotoForDate: (dateKey?: string) => boolean;
  replaceDailyPhoto: (
    dateKey: string,
    data: {
      photoUri?: string;
      note?: string;
      song?: { title: string; artist: string; albumCover?: string } | null;
      mood?: string | null;
      location?: string | null;
    }
  ) => Promise<void>;

  // Photo actions
  addDailyPhoto: (data: {
    photoUri?: string;
    note?: string;
    song?: { title: string; artist: string; albumCover?: string } | null;
    mood?: string | null;
    location?: string | null;
  }) => Promise<void>;
  addPhotoFrame: (data: {
    photoUri?: string;
    note?: string;
    song?: { title: string; artist: string; albumCover?: string } | null;
    mood?: string | null;
    location?: string | null;
    filter?: string;
    mode?: CaptureMode;
  }) => Promise<{ isFilmComplete: boolean; filmId?: string }>;
  updatePhotoFrame: (id: string, updates: Partial<PhotoEntry>) => Promise<void>;
  deletePhotoFrame: (id: string) => Promise<void>;

  // Film lifecycle
  createNewFilm: (filmData: {
    name: string;
    filmTypeName: string;
    filmTypeId?: string;
    totalFrames: number;
    coverColor?: string;
    iso?: number;
  }) => Promise<string>; // returns new filmId
  selectActiveFilm: (filmId: string) => Promise<void>;
  setActiveFilm: (filmId: string) => Promise<void>; // alias
  sendFilmToDevelop: (filmId: string) => Promise<void>;
  finishFilmEarly: (filmId: string) => Promise<void>;
  developFilm: (filmId: string) => Promise<void>; // complete development (wash done)
  archiveFilm: (filmId: string) => Promise<void>;
  deleteFilm: (filmId: string) => Promise<void>;

  // Daily notes
  saveDailyNote: (dateKey: string, noteData: Partial<DailyNoteItem>) => Promise<void>;
  deleteDailyNote: (dateKey: string) => Promise<void>;
}

// ─── Context & Storage ─────────────────────────────────────────────────────────
const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  FILMS: '@poz_films_v3',
  PHOTOS: '@poz_photos_v2',
  DAILY_NOTES: '@poz_daily_notes_v2',
  SELECTED_FILM_ID: '@poz_selected_film_id_v3',
  CAPTURE_MODE: '@poz_capture_mode_v1',
  AUTH_TOKEN: '@poz_auth_token',
  USER_DATA: '@poz_user_data',
};

const DEFAULT_TODAY_KEY = getTodayKey();

const DEFAULT_INITIAL_NOTES: Record<string, DailyNoteItem> = {
  '2026-07-27': {
    dateKey: '2026-07-27',
    note: '"bugün biraz yorucuydu ama akşam güzel hissettirdi."',
    timestamp: '22:45 • ev',
    mood: 'huzurlu',
    location: 'ev',
    song: { title: 'a canım', artist: 'mabel matiz' },
  },
};

// ─── Provider ──────────────────────────────────────────────────────────────────
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [films, setFilms] = useState<FilmItem[]>([]);
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [dailyNotes, setDailyNotes] = useState<Record<string, DailyNoteItem>>(DEFAULT_INITIAL_NOTES);
  const [selectedFilmId, setSelectedFilmId] = useState<string | null>(null);
  const [currentCaptureMode, setCurrentCaptureMode] = useState<CaptureMode>('daily');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [savedToken, savedUser, savedFilms, savedPhotos, savedNotes, savedFilmId, savedMode] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
        AsyncStorage.getItem(STORAGE_KEYS.FILMS),
        AsyncStorage.getItem(STORAGE_KEYS.PHOTOS),
        AsyncStorage.getItem(STORAGE_KEYS.DAILY_NOTES),
        AsyncStorage.getItem(STORAGE_KEYS.SELECTED_FILM_ID),
        AsyncStorage.getItem(STORAGE_KEYS.CAPTURE_MODE),
      ]);

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }

      // Canlı API'den veri çekmeyi dene
      try {
        const [apiFilmsRes, apiPhotosRes, apiNotesRes] = await Promise.all([
          filmsApi.getAll().catch(() => null),
          photosApi.getAll().catch(() => null),
          notesApi.getAll().catch(() => null),
        ]);

        if (apiFilmsRes?.success && apiFilmsRes.films?.length) {
          setFilms(apiFilmsRes.films);
        } else {
          setFilms(savedFilms ? JSON.parse(savedFilms) : initialFilmList);
        }

        if (apiPhotosRes?.success && apiPhotosRes.photos?.length) {
          setPhotos(apiPhotosRes.photos);
        } else {
          setPhotos(savedPhotos ? JSON.parse(savedPhotos) : initialPhotoEntries);
        }

        if (apiNotesRes?.success && apiNotesRes.notes) {
          setDailyNotes(apiNotesRes.notes);
        } else if (savedNotes) {
          setDailyNotes(JSON.parse(savedNotes));
        }
      } catch (apiError) {
        // Fallback local storage
        setFilms(savedFilms ? JSON.parse(savedFilms) : initialFilmList);
        setPhotos(savedPhotos ? JSON.parse(savedPhotos) : initialPhotoEntries);
        if (savedNotes) setDailyNotes(JSON.parse(savedNotes));
      }

      if (savedFilmId) {
        setSelectedFilmId(savedFilmId);
      } else {
        const firstActive = initialFilmList.find((f) => f.status === 'active');
        if (firstActive) setSelectedFilmId(firstActive.id);
      }

      if (savedMode) setCurrentCaptureMode(savedMode as CaptureMode);
    } catch (e) {
      console.error('Error loading AppContext data', e);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Auth Actions ──────────────────────────────────────────────────────────
  const loginUser = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await authApi.login({ email, password });
      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, res.token);
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(res.user));
        return { success: true };
      }
      return { success: false, error: res.error || 'Giriş yapılamadı' };
    } catch (err: any) {
      // Ağ hatası (Network Error) durumunda veya sunucuya ulaşılamadığında otomatik offline mock kullanıcı ile devam et
      if (!err.response || err.message?.includes('Network Error')) {
        const fallbackUser = {
          id: '00000000-0000-0000-0000-000000000001',
          email: email.includes('@') ? email : `${email}@pozapp.com`,
          username: email.includes('@') ? email.split('@')[0] : email,
          full_name: email.toLowerCase().includes('irmak') ? 'İrmak Arı' : 'Poz Kullanıcısı'
        };
        const mockToken = 'mock_jwt_token_offline_fallback';
        setToken(mockToken);
        setUser(fallbackUser);
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(fallbackUser));
        return { success: true };
      }

      const errorMsg = err.response?.data?.error || err.message || 'Giriş yapılırken sunucu hatası oluştu';
      return { success: false, error: errorMsg };
    }
  };

  const registerUser = async (data: { email: string; password?: string; username?: string; full_name?: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await authApi.register(data);
      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, res.token);
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(res.user));
        return { success: true };
      }
      return { success: false, error: res.error || 'Kayıt olunamadı' };
    } catch (err: any) {
      if (!err.response || err.message?.includes('Network Error')) {
        const fallbackUser = {
          id: '00000000-0000-0000-0000-000000000001',
          email: data.email.includes('@') ? data.email : `${data.email}@pozapp.com`,
          username: data.username || (data.email.includes('@') ? data.email.split('@')[0] : data.email),
          full_name: data.full_name || 'Poz Kullanıcısı'
        };
        const mockToken = 'mock_jwt_token_offline_fallback';
        setToken(mockToken);
        setUser(fallbackUser);
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(fallbackUser));
        return { success: true };
      }

      const errorMsg = err.response?.data?.error || err.message || 'Kayıt olunurken sunucu hatası oluştu';
      return { success: false, error: errorMsg };
    }
  };


  const logoutUser = async () => {
    try {
      await authApi.logout().catch(() => null);
    } catch (e) {
      // Ağ hatasında da lokal çıkış yap
    }

    setUser(null);
    setToken(null);
    setFilms([]);
    setPhotos([]);
    setDailyNotes(DEFAULT_INITIAL_NOTES);
    setSelectedFilmId(null);

    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.FILMS,
      STORAGE_KEYS.PHOTOS,
      STORAGE_KEYS.DAILY_NOTES,
      STORAGE_KEYS.SELECTED_FILM_ID,
      STORAGE_KEYS.CAPTURE_MODE,
    ]);
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const activeFilm =
    films.find((f) => f.id === selectedFilmId && f.status === 'active') ||
    films.find((f) => f.status === 'active') ||
    null;

  const selectedActiveFilmId = selectedFilmId;

  // ── Storage helpers ────────────────────────────────────────────────────────
  const saveFilmsToStorage = async (updated: FilmItem[]) => {
    setFilms(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.FILMS, JSON.stringify(updated));
  };
  const savePhotosToStorage = async (updated: PhotoEntry[]) => {
    setPhotos(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(updated));
  };
  const saveNotesToStorage = async (updated: Record<string, DailyNoteItem>) => {
    setDailyNotes(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_NOTES, JSON.stringify(updated));
  };

  // ── Capture mode ───────────────────────────────────────────────────────────
  const selectCaptureMode = async (mode: CaptureMode) => {
    setCurrentCaptureMode(mode);
    try { await AsyncStorage.setItem(STORAGE_KEYS.CAPTURE_MODE, mode); } catch {}
  };

  // ── Daily Photo Single-Photo Helpers & Replacement ───────────────────────
  const dailyPhotoForDate = (dateKey?: string): PhotoEntry | null => {
    return getDailyPhotoForDate(photos, dateKey || DEFAULT_TODAY_KEY);
  };

  const hasDailyPhotoForDateHelper = (dateKey?: string): boolean => {
    return hasDailyPhotoForDate(photos, dateKey || DEFAULT_TODAY_KEY);
  };

  const replaceDailyPhoto = async (
    dateKey: string,
    data: {
      photoUri?: string;
      note?: string;
      song?: { title: string; artist: string; albumCover?: string } | null;
      mood?: string | null;
      location?: string | null;
    }
  ) => {
    const targetDateKey = getLocalDateKey(dateKey);
    const existingPhoto = getDailyPhotoForDate(photos, targetDateKey);

    const isoNow = new Date().toISOString();
    const newPhoto: PhotoEntry = {
      id: `daily-${Date.now()}`,
      captureMode: 'daily',
      status: 'developed',
      visibility: 'immediate',
      filmId: null,
      filmTitle: null,
      date: getFormattedTodayFull(),
      time: getFormattedTime(),
      photoUri: data.photoUri,
      note: data.note || '',
      song: data.song ? { title: data.song.title, artist: data.song.artist } : undefined,
      mood: data.mood || undefined,
      location: data.location || undefined,
      bgColors: ['#FFB88C', '#DE6262'],
      sceneType: 'coffee-table',
      developedAt: isoNow,
    };

    // Safe replacement: filter out old photo only when saving new photo to storage
    const filteredPhotos = existingPhoto
      ? photos.filter((p) => p.id !== existingPhoto.id)
      : photos;
    const updatedPhotos = [newPhoto, ...filteredPhotos];

    await savePhotosToStorage(updatedPhotos);

    if (data.note || data.mood || data.song) {
      await saveDailyNote(targetDateKey, {
        note: data.note || dailyNotes[targetDateKey]?.note || '',
        mood: data.mood || dailyNotes[targetDateKey]?.mood,
        location: data.location || dailyNotes[targetDateKey]?.location,
        song: data.song
          ? { title: data.song.title, artist: data.song.artist }
          : dailyNotes[targetDateKey]?.song,
      });
    }

    photosApi
      .upload({
        captureMode: 'daily',
        photoUri: data.photoUri,
        note: data.note,
        location: data.location || undefined,
        mood: data.mood || undefined,
        song: data.song,
      })
      .catch(() => null);

    if (existingPhoto?.id && !existingPhoto.id.startsWith('daily-')) {
      photosApi.delete(existingPhoto.id).catch(() => null);
    }
  };

  // ── Photo: Add daily ──────────────────────────────────────────────────────
  const addDailyPhoto = async (data: {
    photoUri?: string;
    note?: string;
    song?: { title: string; artist: string; albumCover?: string } | null;
    mood?: string | null;
    location?: string | null;
  }) => {
    const todayStr = DEFAULT_TODAY_KEY;
    if (hasDailyPhotoForDate(photos, todayStr)) {
      await replaceDailyPhoto(todayStr, data);
      return;
    }

    const isoNow = new Date().toISOString();
    const newPhoto: PhotoEntry = {
      id: `daily-${Date.now()}`,
      captureMode: 'daily',
      status: 'developed',
      visibility: 'immediate',
      filmId: null,
      filmTitle: null,
      date: getFormattedTodayFull(),
      time: getFormattedTime(),
      photoUri: data.photoUri,
      note: data.note || '',
      song: data.song ? { title: data.song.title, artist: data.song.artist } : undefined,
      mood: data.mood || undefined,
      location: data.location || undefined,
      bgColors: ['#FFB88C', '#DE6262'],
      sceneType: 'coffee-table',
      developedAt: isoNow,
    };

    const updatedPhotos = [newPhoto, ...photos];
    await savePhotosToStorage(updatedPhotos);

    if (data.note || data.mood || data.song) {
      await saveDailyNote(todayStr, {
        note: data.note || dailyNotes[todayStr]?.note || '',
        mood: data.mood || dailyNotes[todayStr]?.mood,
        location: data.location || dailyNotes[todayStr]?.location,
        song: data.song
          ? { title: data.song.title, artist: data.song.artist }
          : dailyNotes[todayStr]?.song,
      });
    }
  };

  // ── Photo: Add film frame ─────────────────────────────────────────────────
  const addFilmPhoto = async (data: {
    photoUri?: string;
    note?: string;
    song?: { title: string; artist: string; albumCover?: string } | null;
    mood?: string | null;
    location?: string | null;
    filmId?: string;
  }): Promise<{ isFilmComplete: boolean; filmId?: string }> => {
    const targetFilm = (data.filmId ? films.find((f) => f.id === data.filmId) : null) || activeFilm;
    if (!targetFilm) return { isFilmComplete: false };

    const currentCount = targetFilm.capturedFrames ?? targetFilm.currentFrames ?? targetFilm.frameCount ?? 0;
    const nextFrame = currentCount + 1;
    const isFilmFinished = nextFrame >= targetFilm.totalFrames;

    // Update film
    const newFilmPhoto: FilmPhoto = {
      id: `${targetFilm.id}-f${nextFrame}`,
      frameNumber: nextFrame,
      code: `${String(nextFrame).padStart(2, '0')}A`,
      sceneTitle: 'film karesi',
      dateStr: getFormattedTodayFull().slice(0, 5),
      isExposed: true,
      bgColors: ['#FFB88C', '#DE6262'],
      iconName: 'photo',
    };

    const updatedFilms = films.map((film) => {
      if (film.id !== targetFilm.id) return film;
      const existingPhotos = film.photos || [];
      return {
        ...film,
        capturedFrames: Math.min(film.totalFrames, nextFrame),
        frameCount: Math.min(film.totalFrames, nextFrame),
        currentFrames: Math.min(film.totalFrames, nextFrame),
        remainingFrames: Math.max(0, film.totalFrames - nextFrame),
        status: isFilmFinished ? ('readyToDevelop' as const) : film.status,
        completedAt: isFilmFinished ? new Date().toISOString() : film.completedAt,
        photos: [...existingPhotos.filter((p) => p.frameNumber !== nextFrame), newFilmPhoto],
      };
    });
    await saveFilmsToStorage(updatedFilms);

    // Create photo entry
    const newPhoto: PhotoEntry = {
      id: `${targetFilm.id}-${nextFrame}-${Date.now()}`,
      captureMode: 'film',
      filmId: targetFilm.id,
      filmTitle: targetFilm.name || targetFilm.title,
      frameNumber: nextFrame,
      code: `${String(nextFrame).padStart(2, '0')}A`,
      date: getFormattedTodayFull(),
      time: getFormattedTime(),
      status: 'locked',
      sceneType: 'sunset-seaside',
      bgColors: ['#FFB88C', '#DE6262'],
      note: data.note || '',
      song: data.song ? { title: data.song.title, artist: data.song.artist } : undefined,
      mood: data.mood || undefined,
      location: data.location || undefined,
      photoUri: data.photoUri,
    };

    await savePhotosToStorage([newPhoto, ...photos]);

    if (data.note || data.mood || data.song) {
      await saveDailyNote(DEFAULT_TODAY_KEY, {
        note: data.note || dailyNotes[DEFAULT_TODAY_KEY]?.note || '',
        mood: data.mood || dailyNotes[DEFAULT_TODAY_KEY]?.mood,
        location: data.location || dailyNotes[DEFAULT_TODAY_KEY]?.location,
        song: data.song ? { title: data.song.title, artist: data.song.artist } : dailyNotes[DEFAULT_TODAY_KEY]?.song,
      });
    }

    return { isFilmComplete: isFilmFinished, filmId: targetFilm.id };
  };

  // ── Photo: Unified addPhotoFrame ──────────────────────────────────────────
  const addPhotoFrame = async (data: {
    photoUri?: string;
    note?: string;
    song?: { title: string; artist: string; albumCover?: string } | null;
    mood?: string | null;
    location?: string | null;
    filter?: string;
    mode?: CaptureMode;
  }): Promise<{ isFilmComplete: boolean; filmId?: string }> => {
    const modeToUse = data.mode || currentCaptureMode;
    if (modeToUse === 'daily') {
      await addDailyPhoto(data);
      return { isFilmComplete: false };
    }
    return addFilmPhoto(data);
  };

  const updatePhotoFrame = async (id: string, updates: Partial<PhotoEntry>) => {
    const updated = photos.map((p) => (p.id === id ? { ...p, ...updates } : p));
    await savePhotosToStorage(updated);
  };

  const deletePhotoFrame = async (id: string) => {
    const target = photos.find((p) => p.id === id);
    await savePhotosToStorage(photos.filter((p) => p.id !== id));
    if (target?.filmId) {
      const updated = films.map((f) => {
        if (f.id !== target.filmId) return f;
        const newCount = Math.max(0, (f.capturedFrames ?? f.currentFrames ?? f.frameCount ?? 0) - 1);
        return { ...f, capturedFrames: newCount, frameCount: newCount, currentFrames: newCount, remainingFrames: f.totalFrames - newCount };
      });
      await saveFilmsToStorage(updated);
    }
  };

  // ── Film: Create ──────────────────────────────────────────────────────────
  const createNewFilm = async (filmData: {
    name: string;
    filmTypeName: string;
    filmTypeId?: string;
    totalFrames: number;
    coverColor?: string;
    iso?: number;
  }): Promise<string> => {
    const filmName = filmData.name.trim() || generateAutoFilmName();
    const iso = filmData.iso || 400;
    const newId = `film-${Date.now()}`;

    const newFilm: FilmItem = {
      id: newId,
      name: filmName,
      title: filmName,
      filmTypeName: filmData.filmTypeName || 'Summer Glow',
      filmTypeId: filmData.filmTypeId,
      type: `35mm · iso ${iso}`,
      iso,
      totalFrames: filmData.totalFrames,
      capturedFrames: 0,
      frameCount: 0,
      currentFrames: 0,
      remainingFrames: filmData.totalFrames,
      status: 'active',
      colorToken: filmData.coverColor || '#111827',
      color: filmData.coverColor || '#111827',
      serial: `POZ-${newId.slice(-6).toUpperCase()}`,
      stampText: `35MM ISO ${iso}`,
      coverIcon: 'films',
      rotation: '-1.2deg',
      dateLabel: 'temmuz 2026',
      createdAt: new Date().toISOString(),
      createdDate: getFormattedTodayFull(),
      startDate: getFormattedTodayFull(),
      photos: [],
      notes: [],
      songs: [],
      moods: [],
    };

    const updated = [newFilm, ...films];
    await saveFilmsToStorage(updated);

    // Auto-select this film
    setSelectedFilmId(newId);
    await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_FILM_ID, newId);

    return newId;
  };

  // ── Film: Select active ───────────────────────────────────────────────────
  const selectActiveFilm = async (filmId: string) => {
    setSelectedFilmId(filmId);
    await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_FILM_ID, filmId);
  };

  const setActiveFilm = selectActiveFilm; // alias

  // ── Film: Finish early (→ readyToDevelop) ────────────────────────────────
  const finishFilmEarly = async (filmId: string) => {
    const updated = films.map((f) => {
      if (f.id !== filmId) return f;
      return { ...f, status: 'readyToDevelop' as const, completedAt: new Date().toISOString() };
    });
    await saveFilmsToStorage(updated);
  };

  // ── Film: Send to develop (→ developing) ─────────────────────────────────
  const sendFilmToDevelop = async (filmId: string) => {
    const updated = films.map((f) => {
      if (f.id !== filmId) return f;
      return {
        ...f,
        status: 'developing' as const,
        developingStartedAt: new Date().toISOString(),
      };
    });
    await saveFilmsToStorage(updated);
  };

  // ── Film: Mark developed / unlock all photos ──────────────────────────────
  const developFilm = async (filmId: string) => {
    const updatedFilms = films.map((f) => {
      if (f.id !== filmId) return f;
      return {
        ...f,
        status: 'completed' as const,
        developedAt: new Date().toISOString(),
        developedDate: getFormattedTodayFull(),
        remainingFrames: 0,
        photos: (f.photos || []).map((p) => ({ ...p, isExposed: true })),
      };
    });
    await saveFilmsToStorage(updatedFilms);

    const updatedPhotos = photos.map((p) => {
      if (p.filmId !== filmId) return p;
      return { ...p, status: 'developed' as const, visibility: 'immediate' as const };
    });
    await savePhotosToStorage(updatedPhotos);
  };

  // ── Film: Archive ─────────────────────────────────────────────────────────
  const archiveFilm = async (filmId: string) => {
    const updated = films.map((f) => {
      if (f.id !== filmId) return f;
      return { ...f, status: 'archived' as const };
    });
    await saveFilmsToStorage(updated);
  };

  // ── Film: Delete ──────────────────────────────────────────────────────────
  const deleteFilm = async (filmId: string) => {
    const updatedFilms = films.filter((f) => f.id !== filmId);
    await saveFilmsToStorage(updatedFilms);
    await savePhotosToStorage(photos.filter((p) => p.filmId !== filmId));
    if (selectedFilmId === filmId) {
      const nextActive = updatedFilms.find((f) => f.status === 'active');
      const nextId = nextActive?.id ?? null;
      setSelectedFilmId(nextId);
      if (nextId) await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_FILM_ID, nextId);
    }
  };

  // ── Daily notes ───────────────────────────────────────────────────────────
  const saveDailyNote = async (dateKey: string, noteData: Partial<DailyNoteItem>) => {
    const existing = dailyNotes[dateKey] || { dateKey, note: '', timestamp: '' };
    const updated = {
      ...dailyNotes,
      [dateKey]: { ...existing, ...noteData, dateKey },
    };
    await saveNotesToStorage(updated);
  };

  const deleteDailyNote = async (dateKey: string) => {
    const updated = { ...dailyNotes };
    delete updated[dateKey];
    await saveNotesToStorage(updated);
  };

  // ─── Provider value ────────────────────────────────────────────────────────
  return (
    <AppContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        films,
        activeFilm,
        selectedActiveFilmId,
        photos,
        dailyNotes,
        isLoading,
        currentCaptureMode,
        loginUser,
        registerUser,
        logoutUser,
        selectCaptureMode,
        dailyPhotoForDate,
        hasDailyPhotoForDate: hasDailyPhotoForDateHelper,
        replaceDailyPhoto,
        addDailyPhoto,
        addPhotoFrame,
        updatePhotoFrame,
        deletePhotoFrame,
        createNewFilm,
        selectActiveFilm,
        setActiveFilm,
        sendFilmToDevelop,
        finishFilmEarly,
        developFilm,
        archiveFilm,
        deleteFilm,
        saveDailyNote,
        deleteDailyNote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
