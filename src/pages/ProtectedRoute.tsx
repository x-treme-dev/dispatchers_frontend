import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  // isAuthenticated у нас boolean, а не функция
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}