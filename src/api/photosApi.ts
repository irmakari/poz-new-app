import { apiClient } from './client';

export interface UploadPhotoPayload {
  filmId?: string;
  captureMode?: 'daily' | 'film';
  note?: string;
  location?: string;
  mood?: string;
  song?: any;
  frameNumber?: number;
  photoUri?: string;
}

export const photosApi = {
  // Fotoğrafları Listele
  getAll: async (params?: { filmId?: string; captureMode?: 'daily' | 'film' }) => {
    const response = await apiClient.get('/photos', { params });
    return response.data;
  },

  // Fotoğraf Yükle & Kaydet
  upload: async (payload: UploadPhotoPayload) => {
    const formData = new FormData();
    if (payload.filmId) formData.append('filmId', payload.filmId);
    if (payload.captureMode) formData.append('captureMode', payload.captureMode);
    if (payload.note) formData.append('note', payload.note);
    if (payload.location) formData.append('location', payload.location);
    if (payload.mood) formData.append('mood', payload.mood);
    if (payload.song) formData.append('song', JSON.stringify(payload.song));
    if (payload.frameNumber) formData.append('frameNumber', String(payload.frameNumber));

    if (payload.photoUri) {
      const filename = payload.photoUri.split('/').pop() || 'photo.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      // React Native FormData dosya formatı
      formData.append('photo', {
        uri: payload.photoUri,
        name: filename,
        type,
      } as any);
    }

    const response = await apiClient.post('/photos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // Fotoğraf Bilgilerini Güncelle (Not, Mood, Konum vb.)
  update: async (photoId: string, payload: { note?: string; mood?: string; location?: string; song?: any }) => {
    const response = await apiClient.patch(`/photos/${photoId}`, payload);
    return response.data;
  },

  // Fotoğraf Sil
  delete: async (photoId: string) => {
    const response = await apiClient.delete(`/photos/${photoId}`);
    return response.data;
  },
};

