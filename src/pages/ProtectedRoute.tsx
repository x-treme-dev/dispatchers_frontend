// src/pages/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const token = localStorage.getItem('auth_token');
  /*
  console.log('Проверка аутентификации пользователя:', {
    isAuthenticated,
    loading,
    token: token ? 'Получен' : 'Нет',
    tokenValue: token ? token.substring(0, 5) + '...' : null
  }); */

  // Показываем загрузку, пока проверяем авторизацию
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Проверка авторизации</p>
      </div>
    );
  }

  // Если нет токена или пользователь не авторизован - редирект на логин
  if (!isAuthenticated || !token) {
    console.warn('Авторизация не пройдена, редирект на /login');
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};