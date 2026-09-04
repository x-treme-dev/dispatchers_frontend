import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import corpIcon from '../assets/voda_logo.png';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  // Добавляем isAuthenticated
  const { register, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Редирект при успешной регистрации (автоматический вход)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert('Пароли не совпадают');
      return;
    }
    // Вызываем register, редирект произойдёт через useEffect
    await register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
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
          <div>
            <h1 className='combo__h1'>Регистрация</h1>
            <p className='combo__p'>
              <Link className='combo__link' to="/login">Вход в систему</Link>
            </p>
          </div>
          <form className='combo__form' onSubmit={handleSubmit}>
            <div className='combo__form_block'>
              <input
                className='combo__form_input'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Имя"
              />
            </div>
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
            <div className='combo__form_block'>
              <input
                className='combo__form_input'
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                placeholder="Подтверждение пароля"
              />
            </div>
            <button className='combo__form_button' type="submit" disabled={loading}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
        </section>
        {error && <div className='err'>{error}</div>}
      </main>
    </>
  );
}