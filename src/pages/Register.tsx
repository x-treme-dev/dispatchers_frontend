import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import corpIcon from '../assets/voda_logo.png';

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
    <>
    <div className='top'>
      
        <Link to="/" className="top__logo">
        <img className="top__logo_img"
          src={corpIcon} 
          alt="Ноme" />
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
              <input className='combo__form_input'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Имя"
              />
            </div>
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
            <div className='combo__form_block'>
              <input className='combo__form_input'
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                placeholder="Подтверждение пароля"
              />
            </div>
          
           <button className='combo__form_button'
              type="submit"
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
        </section>
      
        {error && ( <div className='err'> {error} </div> )}

    </main>
    
   </>
  );
}