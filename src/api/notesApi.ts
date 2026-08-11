import { apiClient } from './client';

export interface SaveNotePayload {
  dateKey: string;
  note: string;
  mood?: string;
  location?: string;
  song?: { title: string; artist: string };
}

export const notesApi = {
  // Tüm Günlük Notları Getir
  getAll: async () => {
    const response = await apiClient.get('/notes');
    return response.data;
  },

  // Günlük Not Kaydet / Güncelle
  save: async (payload: SaveNotePayload) => {
    const response = await apiClient.post('/notes', payload);
    return response.data;
  },

  // Günlük Not Sil
  delete: async (dateKey: string) => {
    const response = await apiClient.delete(`/notes/${dateKey}`);
    return response.data;
  },
};
