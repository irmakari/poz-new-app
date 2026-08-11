import { apiClient } from './client';

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album?: string;
  albumCover?: string;
  previewUrl?: string;
  durationMs?: number;
}

export const musicApi = {
  // Canlı Şarkı Arama
  search: async (query: string): Promise<{ success: boolean; songs: MusicTrack[] }> => {
    try {
      const response = await apiClient.get('/music/search', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.warn('Müzik arama hatası:', error);
      return { success: false, songs: [] };
    }
  },
};
