import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Tickets } from './pages/Tickets';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { ProtectedRoute } from './pages/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
   
    <div className='container'>
    <QueryClientProvider client={queryClient}>
       <AuthProvider>
      <Router>
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Защищенные маршруты */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />  
              </ProtectedRoute>
            }
          />

            <Route
              path="/tickets"
              element={
                <ProtectedRoute>
                  <Tickets />
                </ProtectedRoute>
              }
            />
          
          {/* Перенаправление для неизвестных маршрутов */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      </AuthProvider>
    </QueryClientProvider>
    </div>
   
  );
}

export default App;