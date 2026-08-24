import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
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
          
          {/* Перенаправление для неизвестных маршрутов */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
    </div>
   
  );
}

export default App;