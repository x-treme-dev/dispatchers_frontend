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
  success: boolean;
  message: string;
  access_token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    email: string;
    role?: string;
  };
}

const saveAuthData = (data: AuthResponse) => {
  if (data.success && data.access_token) {
    localStorage.setItem('auth_token', data.access_token);
    localStorage.setItem('token_type', data.token_type);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
};

export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<AuthResponse>('/login', credentials);
    saveAuthData(response.data);
    return response;
  },

  register: async (data: RegisterData) => {
    const response = await apiClient.post<AuthResponse>('/register', data);
    saveAuthData(response.data);
    return response;
  },

  logout: async () => {
    await apiClient.post('/logout');
    ['auth_token', 'token_type', 'user'].forEach(key => localStorage.removeItem(key));
  },

  getUser: () => apiClient.get<{ user: AuthResponse['user'] }>('/user'),

  updateProfile: (data: Partial<AuthResponse['user']>) => 
    apiClient.put<AuthResponse['user']>('/user', data),
};