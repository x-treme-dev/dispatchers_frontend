import { apiClient } from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    created_at: string;
    updated_at: string;
  };
}

export const authAPI = {
  // Вход
  login: (credentials: LoginCredentials) => 
    apiClient.post<AuthResponse>('/login', credentials),
  
  // Регистрация
  register: (data: RegisterData) => 
    apiClient.post<AuthResponse>('/register', data),
  
  // Выход
  logout: () => 
    apiClient.post('/logout'),
  
  // Получение текущего пользователя
  getUser: () => 
    apiClient.get<{ user: AuthResponse['user'] }>('/user'),
  
  // Обновление профиля
  updateProfile: (data: Partial<AuthResponse['user']>) => 
    apiClient.put<AuthResponse['user']>('/user', data),
};