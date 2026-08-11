import { apiClient } from './client';

export interface RegisterPayload {
  email: string;
  password?: string;
  username?: string;
  full_name?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface UpdateProfilePayload {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
}

export const authApi = {
  // Kullanıcı Kaydı
  register: async (payload: RegisterPayload) => {
    const response = await apiClient.post('/auth/register', payload);
    return response.data;
  },

  // Giriş Yapma
  login: async (payload: LoginPayload) => {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
  },

  // Mevcut Kullanıcı Bilgisi & İstatistikleri
  getProfile: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Profil Güncelleme
  updateProfile: async (payload: UpdateProfilePayload) => {
    const response = await apiClient.patch('/auth/profile', payload);
    return response.data;
  },

  // Çıkış Yapma
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};

