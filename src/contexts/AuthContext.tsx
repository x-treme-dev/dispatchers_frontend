// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authAPI } from '../api/auth';

interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<{ success: boolean; error?: string }>;
  register: (data: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  getUser: () => User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Восстановление сессии из localStorage
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData) as User);
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
      }
    }
    setLoading(false);
  }, []);

  // Логин
  const login = async (credentials: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(credentials);
      const data = response.data;
      if (data.success && data.access_token) {
        // authAPI.saveAuthData уже сохранил в localStorage
        setUser(data.user); // обновляем состояние
        return { success: true };
      } else {
        throw new Error('Токен не получен');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Ошибка входа';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Регистрация
  const register = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(data);
      const responseData = response.data;
      if (responseData.success && responseData.access_token) {
        setUser(responseData.user);
        return { success: true };
      } else {
        throw new Error('Токен не получен');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Ошибка регистрации';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Выход
  const logout = async () => {
    await authAPI.logout();
    // authAPI.logout уже чистит localStorage, но мы также сбрасываем состояние
    setUser(null);
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    getUser: () => user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};