import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialFilmList, FilmItem } from '@/utils/filmData';
import { initialPhotoEntries, PhotoEntry, CaptureMode } from '@/utils/photoDetailData';

export interface DailyNoteItem {
  dateKey: string; // e.g. '2026-07-27'
  note: string;
  timestamp: string;
  mood?: string;
  location?: string;
  song?: {
    title: string;
    artist: string;
  };
}

interface AppContextType {
  films: FilmItem[];
  activeFilm: FilmItem | null;
  photos: PhotoEntry[];
  dailyNotes: Record<string, DailyNoteItem>;
  isLoading: boolean;
  currentCaptureMode: CaptureMode;

  // Actions
  selectCaptureMode: (mode: CaptureMode) => void;
  addDailyPhoto: (data: {
    photoUri?: string;
    note?: string;
    song?: { title: string; artist: string; albumCover?: string } | null;
    mood?: string | null;
    location?: string | null;
  }) => Promise<void>;
  addFilmPhoto: (data: {
    photoUri?: string;
    note?: string;
    song?: { title: string; artist: string; albumCover?: string } | null;
    mood?: string | null;
    location?: string | null;
    filmId?: string;
  }) => Promise<void>;
  addPhotoFrame: (data: {
    photoUri?: string;
    note?: string;
    song?: { title: string; artist: string; albumCover?: string } | null;
    mood?: string | null;
    location?: string | null;
    filter?: string;
    mode?: CaptureMode;
  }) => Promise<void>;
  updatePhotoFrame: (id: string, updates: Partial<PhotoEntry>) => Promise<void>;
  deletePhotoFrame: (id: string) => Promise<void>;
  createNewFilm: (filmData: {
    title: string;
    iso: string;
    totalFrames: number;
    description?: string;
    coverColor?: string;
  }) => Promise<void>;
  developFilm: (filmId: string) => Promise<void>;
  deleteFilm: (filmId: string) => Promise<void>;
  setActiveFilm: (filmId: string) => Promise<void>;
  saveDailyNote: (dateKey: string, noteData: Partial<DailyNoteItem>) => Promise<void>;
  deleteDailyNote: (dateKey: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  FILMS: '@poz_films_v2',
  PHOTOS: '@poz_photos_v2',
  DAILY_NOTES: '@poz_daily_notes_v2',
  ACTIVE_FILM_ID: '@poz_active_film_id_v2',
  CAPTURE_MODE: '@poz_capture_mode_v1',
};

import { getTodayKey, getFormattedTodayFull, getFormattedTime } from '@/utils/dateUtils';

const DEFAULT_TODAY_KEY = getTodayKey();

const DEFAULT_INITIAL_NOTES: Record<string, DailyNoteItem> = {
  '2026-07-27': {
    dateKey: '2026-07-27',
    note: '“bugün biraz yorucuydu ama akşam güzel hissettirdi.”',
    timestamp: '22:45 • ev',
    mood: 'huzurlu',
    location: 'ev',
    song: {
      title: 'a canım',
      artist: 'mabel matiz',
    },
  },
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [films, setFilms] = useState<FilmItem[]>([]);
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [dailyNotes, setDailyNotes] = useState<Record<string, DailyNoteItem>>(DEFAULT_INITIAL_NOTES);
  const [activeFilmId, setActiveFilmIdState] = useState<string>('summer-glow-july-2026');
  const [currentCaptureMode, setCurrentCaptureMode] = useState<CaptureMode>('daily');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load from AsyncStorage on app launch
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [savedFilms, savedPhotos, savedNotes, savedActiveId, savedMode] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.FILMS),
        AsyncStorage.getItem(STORAGE_KEYS.PHOTOS),
        AsyncStorage.getItem(STORAGE_KEYS.DAILY_NOTES),
        AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_FILM_ID),
        AsyncStorage.getItem(STORAGE_KEYS.CAPTURE_MODE),
      ]);

      if (savedFilms) {
        setFilms(JSON.parse(savedFilms));
      } else {
        setFilms(initialFilmList);
        await AsyncStorage.setItem(STORAGE_KEYS.FILMS, JSON.stringify(initialFilmList));
      }

      if (savedPhotos) {
        setPhotos(JSON.parse(savedPhotos));
      } else {
        setPhotos(initialPhotoEntries);
        await AsyncStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(initialPhotoEntries));
      }

      if (savedNotes) {
        setDailyNotes(JSON.parse(savedNotes));
      } else {
        setDailyNotes(DEFAULT_INITIAL_NOTES);
      }

      if (savedActiveId) {
        setActiveFilmIdState(savedActiveId);
      }

      if (savedMode) {
        setCurrentCaptureMode(savedMode as CaptureMode);
      }
    } catch (e) {
      console.error('Error loading AppContext data', e);
    } finally {
      setIsLoading(false);
    }
  };

  const selectCaptureMode = async (mode: CaptureMode) => {
    setCurrentCaptureMode(mode);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CAPTURE_MODE, mode);
    } catch (e) {
      console.error('Error saving capture mode', e);
    }
  };

  const activeFilm = films.find((f) => f.id === activeFilmId) || films.find((f) => f.status === 'active') || films[0] || null;

  // Sync helpers
  const saveFilmsToStorage = async (updatedFilms: FilmItem[]) => {
    setFilms(updatedFilms);
    await AsyncStorage.setItem(STORAGE_KEYS.FILMS, JSON.stringify(updatedFilms));
  };

  const savePhotosToStorage = async (updatedPhotos: PhotoEntry[]) => {
    setPhotos(updatedPhotos);
    await AsyncStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(updatedPhotos));
  };

  const saveNotesToStorage = async (updatedNotes: Record<string, DailyNoteItem>) => {
    setDailyNotes(updatedNotes);
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_NOTES, JSON.stringify(updatedNotes));
  };

  // Action: Add Daily Photo (Immediate visibility, no film/darkroom)
  const addDailyPhoto = async (data: {
    photoUri?: string;
    note?: string;
    song?: { title: string; artist: string; albumCover?: string } | null;
    mood?: string | null;
    location?: string | null;
  }) => {
    const todayStr = getTodayKey();
    const todayFullStr = getFormattedTodayFull();
    const timeStr = getFormattedTime();
    const isoNow = new Date().toISOString();

    const newPhotoId = `daily-${Date.now()}`;
    const newPhoto: PhotoEntry = {
      id: newPhotoId,
      captureMode: 'daily',
      status: 'developed',
      visibility: 'immediate',
      photoUri: data.photoUri,
      filmId: null,
      filmTitle: null,
      frameNumber: null,
      frameCode: null,
      date: todayFullStr,
      time: timeStr,
      sceneType: 'sunset-seaside',
      bgColors: ['#FFF1B0', '#FFD7EC'],
      note: data.note || '',
      song: data.song
        ? {
            title: data.song.title,
            artist: data.song.artist,
          }
        : undefined,
      mood: data.mood || undefined,
      location: data.location || undefined,
      capturedAt: isoNow,
      developedAt: isoNow,
    };

    const updatedPhotos = [newPhoto, ...photos];
    await savePhotosToStorage(updatedPhotos);

    // Sync note/mood/song with daily notes if present
    if (data.note || data.mood || data.song) {
      await saveDailyNote(todayStr, {
        note: data.note || dailyNotes[todayStr]?.note || '',
        mood: data.mood || dailyNotes[todayStr]?.mood,
        location: data.location || dailyNotes[todayStr]?.location,
        song: data.song ? { title: data.song.title, artist: data.song.artist } : dailyNotes[todayStr]?.song,
      });
    }
  };

  // Action: Add Film Photo (Locked frame, adds to active film)
  const addFilmPhoto = async (data: {
    photoUri?: string;
    note?: string;
    song?: { title: string; artist: string; albumCover?: string } | null;
    mood?: string | null;
    location?: string | null;
    filmId?: string;
  }) => {
    const targetFilm = (data.filmId ? films.find((f) => f.id === data.filmId) : null) || activeFilm;
    if (!targetFilm) return;

    const currentFramesCount = targetFilm.currentFrames ?? targetFilm.frameCount ?? 0;
    const nextFrame = currentFramesCount + 1;
    const isFilmFinished = nextFrame >= targetFilm.totalFrames;

    // 1. Update Active Film Frame Count
    const updatedFilms = films.map((film) => {
      if (film.id === targetFilm.id) {
        return {
          ...film,
          currentFrames: Math.min(film.totalFrames, nextFrame),
          remainingFrames: Math.max(0, film.totalFrames - nextFrame),
          frameCount: Math.min(film.totalFrames, nextFrame),
          status: isFilmFinished ? ('developing' as const) : film.status,
        };
      }
      return film;
    });

    await saveFilmsToStorage(updatedFilms);

    // 2. Create Photo Entry
    const newPhotoId = `${activeFilm.id}-${nextFrame}-${Date.now()}`;
    const newPhoto: PhotoEntry = {
      id: newPhotoId,
      filmId: activeFilm.id,
      filmTitle: activeFilm.title,
      frameNumber: nextFrame,
      code: `${nextFrame < 10 ? '0' : ''}${nextFrame}A`,
      date: getFormattedTodayFull(),
      time: getFormattedTime(),
      serial: `SG-0726-0${nextFrame}`,
      status: 'locked',
      sceneType: 'sunset-seaside',
      bgColors: ['#FFB88C', '#DE6262'],
      note: data.note || '',
      song: data.song
        ? {
            title: data.song.title,
            artist: data.song.artist,
          }
        : undefined,
      mood: data.mood || undefined,
      location: data.location || undefined,
    };

    const updatedPhotos = [newPhoto, ...photos];
    await savePhotosToStorage(updatedPhotos);

    // 3. If note/song/mood added, sync with today's daily note
    if (data.note || data.mood || data.song) {
      await saveDailyNote(DEFAULT_TODAY_KEY, {
        note: data.note || dailyNotes[DEFAULT_TODAY_KEY]?.note || '',
        mood: data.mood || dailyNotes[DEFAULT_TODAY_KEY]?.mood,
        location: data.location || dailyNotes[DEFAULT_TODAY_KEY]?.location,
        song: data.song ? { title: data.song.title, artist: data.song.artist } : dailyNotes[DEFAULT_TODAY_KEY]?.song,
      });
    }
  };

  // Action: Backwards compatible addPhotoFrame wrapper
  const addPhotoFrame = async (data: {
    photoUri?: string;
    note?: string;
    song?: { title: string; artist: string; albumCover?: string } | null;
    mood?: string | null;
    location?: string | null;
    filter?: string;
    mode?: CaptureMode;
  }) => {
    const modeToUse = data.mode || currentCaptureMode;
    if (modeToUse === 'daily') {
      await addDailyPhoto(data);
    } else {
      await addFilmPhoto(data);
    }
  };

  // Action: Update Photo Frame (Note, Song, Mood, Location)
  const updatePhotoFrame = async (id: string, updates: Partial<PhotoEntry>) => {
    const updatedPhotos = photos.map((photo) => {
      if (photo.id === id) {
        return { ...photo, ...updates };
      }
      return photo;
    });
    await savePhotosToStorage(updatedPhotos);
  };

  // Action: Delete Photo Frame
  const deletePhotoFrame = async (id: string) => {
    const targetPhoto = photos.find((p) => p.id === id);
    const updatedPhotos = photos.filter((p) => p.id !== id);
    await savePhotosToStorage(updatedPhotos);

    // Increment remaining frames for the parent film if active
    if (targetPhoto && targetPhoto.filmId) {
      const updatedFilms = films.map((film) => {
        if (film.id === targetPhoto.filmId) {
          const currentCount = film.currentFrames ?? film.frameCount ?? 0;
          const newCurrent = Math.max(0, currentCount - 1);
          return {
            ...film,
            currentFrames: newCurrent,
            frameCount: newCurrent,
            remainingFrames: film.totalFrames - newCurrent,
          };
        }
        return film;
      });
      await saveFilmsToStorage(updatedFilms);
    }
  };

  // Action: Create New Film Roll
  const createNewFilm = async (filmData: {
    title: string;
    iso: string;
    totalFrames: number;
    description?: string;
    coverColor?: string;
  }) => {
    const newFilmId = `film-${Date.now()}`;
    const isoNum = parseInt(filmData.iso.replace(/\D/g, ''), 10) || 400;
    const newFilm: FilmItem = {
      id: newFilmId,
      title: filmData.title.toLowerCase(),
      type: `35mm · iso ${isoNum}`,
      iso: isoNum,
      dateLabel: 'temmuz 2026',
      totalFrames: filmData.totalFrames,
      currentFrames: 0,
      frameCount: 0,
      remainingFrames: filmData.totalFrames,
      status: 'active',
      color: filmData.coverColor || '#CBEBFC',
      darkColor: '#2B83BA',
      serial: `POZ-0726-${filmData.totalFrames}`,
      stampText: `35MM ISO ${isoNum}`,
      coverIcon: 'films',
      rotation: '-1.5deg',
      createdDate: '28 temmuz 2026',
      startDate: '28 temmuz 2026',
      description: filmData.description || 'Yeni açılan 35mm film rulosu.',
    };

    const updatedFilms = [newFilm, ...films];
    await saveFilmsToStorage(updatedFilms);
    await setActiveFilm(newFilmId);
  };

  // Action: Develop / Unlock Film
  const developFilm = async (filmId: string) => {
    const updatedFilms = films.map((film) => {
      if (film.id === filmId) {
        return {
          ...film,
          status: 'completed' as const,
          remainingFrames: 0,
        };
      }
      return film;
    });
    await saveFilmsToStorage(updatedFilms);

    // Unlock all photos belonging to this film
    const updatedPhotos = photos.map((photo) => {
      if (photo.filmId === filmId) {
        return { ...photo, status: 'unlocked' as const };
      }
      return photo;
    });
    await savePhotosToStorage(updatedPhotos);
  };

  // Action: Delete Film Roll
  const deleteFilm = async (filmId: string) => {
    const updatedFilms = films.filter((f) => f.id !== filmId);
    await saveFilmsToStorage(updatedFilms);

    const updatedPhotos = photos.filter((p) => p.filmId !== filmId);
    await savePhotosToStorage(updatedPhotos);

    if (activeFilmId === filmId && updatedFilms.length > 0) {
      await setActiveFilm(updatedFilms[0].id);
    }
  };

  // Action: Set Active Film
  const setActiveFilm = async (filmId: string) => {
    setActiveFilmIdState(filmId);
    await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_FILM_ID, filmId);
  };

  // Action: Save Daily Note (Create/Update)
  const saveDailyNote = async (dateKey: string, noteData: Partial<DailyNoteItem>) => {
    const existing = dailyNotes[dateKey] || {
      dateKey,
      note: '',
      timestamp: '22:45 • ev',
    };

    const updatedNotes = {
      ...dailyNotes,
      [dateKey]: {
        ...existing,
        ...noteData,
        dateKey,
      },
    };
    await saveNotesToStorage(updatedNotes);
  };

  // Action: Delete Daily Note
  const deleteDailyNote = async (dateKey: string) => {
    const updatedNotes = { ...dailyNotes };
    delete updatedNotes[dateKey];
    await saveNotesToStorage(updatedNotes);
  };

  return (
    <AppContext.Provider
      value={{
        films,
        activeFilm,
        photos,
        dailyNotes,
        isLoading,
        currentCaptureMode,
        selectCaptureMode,
        addDailyPhoto,
        addFilmPhoto,
        addPhotoFrame,
        updatePhotoFrame,
        deletePhotoFrame,
        createNewFilm,
        developFilm,
        deleteFilm,
        setActiveFilm,
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
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
