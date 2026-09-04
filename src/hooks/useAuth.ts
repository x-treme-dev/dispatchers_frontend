import { useState } from 'react';
import { authAPI } from '../api/auth';
import type { LoginCredentials, RegisterData } from '../api/auth';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(credentials);
      console.log('📥 Ответ от authAPI.login:', response);
      
      // Правильный доступ к данным
      const data = response.data;
      
      // Проверяем структуру ответа
      if (data.success && data.access_token) {
        const token = data.access_token;
        const user = data.user;
        
        localStorage.setItem('auth_token', token);
        localStorage.setItem('token_type', data.token_type || 'Bearer');
        localStorage.setItem('user', JSON.stringify(user));
        
        console.log('✅ Токен сохранен в useAuth:', token);
        console.log('👤 Пользователь сохранен:', user);
        
        return { success: true, user };
      } else {
        throw new Error('Токен не получен от сервера');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Ошибка входа';
      setError(message);
      console.error('❌ Ошибка входа:', err);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(data);
      const responseData = response.data;
      
      if (responseData.success && responseData.access_token) {
        localStorage.setItem('auth_token', responseData.access_token);
        localStorage.setItem('token_type', responseData.token_type || 'Bearer');
        localStorage.setItem('user', JSON.stringify(responseData.user));
        
        return { success: true, user: responseData.user };
      }
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка регистрации';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('token_type');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('auth_token');
  };

  return {
    login,
    register,
    logout,
    getUser,
    isAuthenticated,
    loading,
    error,
  };
};