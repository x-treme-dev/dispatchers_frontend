import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert('Пароли не совпадают');
      return;
    }
    const result = await register({ 
      name, 
      email, 
      password, 
      password_confirmation: passwordConfirmation 
    });
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
  
    <div>
      <div>
        <div>
          <h2>Регистрация</h2>
          <p>
            Или <Link to="/login">войдите в систему</Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Имя"
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email адрес"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Пароль"
              />
            </div>
            <div>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                placeholder="Подтверждение пароля"
              />
            </div>
          </div>

          {error && (
            <div>
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>
        </form>
      </div>
    </div>
   
  );
}