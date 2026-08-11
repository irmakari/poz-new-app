import { apiClient } from './client';

export interface CreateFilmPayload {
  name: string;
  filmTypeName?: string;
  filmTypeId?: string;
  totalFrames?: number;
  iso?: number;
  colorToken?: string;
}

export const filmsApi = {
  // Tüm Filmleri Getir
  getAll: async () => {
    const response = await apiClient.get('/films');
    return response.data;
  },

  // Yeni Film Oluştur
  create: async (payload: CreateFilmPayload) => {
    const response = await apiClient.post('/films', payload);
    return response.data;
  },

  // Film Detayı ve Pozlar
  getById: async (filmId: string) => {
    const response = await apiClient.get(`/films/${filmId}`);
    return response.data;
  },

  // Karanlık Odaya Gönder (Yıkamaya Başla)
  startDeveloping: async (filmId: string) => {
    const response = await apiClient.patch(`/films/${filmId}/develop`);
    return response.data;
  },

  // Filmi Arşive Kaldır
  archive: async (filmId: string) => {
    const response = await apiClient.patch(`/films/${filmId}/archive`);
    return response.data;
  },

  // Banyonun / Yıkamanın Tamamlanması
  completeDeveloping: async (filmId: string) => {
    const response = await apiClient.patch(`/films/${filmId}/complete`);
    return response.data;
  },

  // Filmi Sil
  delete: async (filmId: string) => {
    const response = await apiClient.delete(`/films/${filmId}`);
    return response.data;
  },
};

