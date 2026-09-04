import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Импортируем из контекста, а не из hooks
import { useAuth } from '../contexts/AuthContext';
import corpIcon from '../assets/voda_logo.png';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Tеперь используем isAuthenticated
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Редирект при успешной авторизации
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Вызываем login, редирект произойдёт через useEffect
    await login({ email, password });
    // Можно обработать ошибку, если нужно
  };

  return (
    <>
      <div className='top'>
        <Link to="/" className="top__logo">
          <img className="top__logo_img" src={corpIcon} alt="Home" />
        </Link>
      </div>
      <main className='main'>
        <section className="combo">
          <h1 className='combo__h1'>Вход в систему</h1>
          <p className='combo__p'>
            <Link className='combo__link' to="/register">Регистрация</Link>
          </p>
          <form className='combo__form' onSubmit={handleSubmit}>
            <div className='combo__form_block'>
              <input
                className='combo__form_input'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email адрес"
              />
            </div>
            <div className='combo__form_block'>
              <input
                className='combo__form_input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Пароль"
              />
            </div>
            <button className='combo__form_button' type="submit" disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </section>
        {error && <div className='err'>{error}</div>}
      </main>
    </>
  );
}