import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import corpIcon from '../assets/voda_logo.png';


export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <>

        {/**top*/}
      <div className='top'>
      
        <Link to="/" className="top__logo">
        <img className="top__logo_img"
          src={corpIcon} 
          alt="Ноme" />
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
              <input className='combo__form_input'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email адрес"
              />
            </div>
            <div className='combo__form_block'>
              <input className='combo__form_input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Пароль"
              />
            </div>
            
             <button  className='combo__form_button' type="submit" disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </button>
          
            </form>
        </section>
         {error && <div className='err'>{error}</div>}
      </main>
    </>
  );
}