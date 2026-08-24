import axios from 'axios';

// Базовый URL для API
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Создаем экземпляр axios с базовыми настройками
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 секунд
});

// Интерцептор для добавления токена в каждый запрос
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерцептор для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Если 401 - токен истек или невалидный
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      // Перенаправляем на страницу логина
      window.location.href = '/login';
    }
    
    // Если 403 - нет прав
    if (error.response?.status === 403) {
      console.error('Доступ запрещен');
    }
    
    // Если 422 - ошибки валидации
    if (error.response?.status === 422) {
      console.error('Ошибка валидации', error.response.data);
    }
    
    return Promise.reject(error);
  }
);