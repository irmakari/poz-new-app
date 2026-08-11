import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const getBaseUrl = () => {
  // Expo Go veya fiziki cihazla çalışırken bilgisayarın yerel IP adresini otomatik bul
  const debuggerHost = Constants.expoConfig?.hostUri || (Constants as any).experienceUrl;
  if (debuggerHost) {
    const ip = debuggerHost.split(':')[0];
    if (ip && ip !== 'localhost' && ip !== '127.0.0.1') {
      return `http://${ip}:5001/api`;
    }
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5001/api';
  }
  return 'http://localhost:5001/api';
};

export const API_BASE_URL = getBaseUrl();

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request Interceptor: Her istekte JWT Token'ı otomatik ekler
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@poz_auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn('Token okunamadı:', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Hataları yakalar
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.warn('API Yanıt Hatası:', error.response.status, error.response.data);
    } else if (error.request) {
      console.warn('API Bağlantı Hatası: Sunucuya ulaşılamadı');
    }
    return Promise.reject(error);
  }
);
