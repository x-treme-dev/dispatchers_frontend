import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import corpIcon from '../assets/voda_logo.png';

export function Home() {
  // В контексте isAuthenticated - булево, user доступен напрямую
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <div className='top'>
        <Link to="/" className="top__logo">
          <img className="top__logo_img" src={corpIcon} alt="Home" />
        </Link>
      </div>

      <main className='main'>
        <nav className="nav">
          <h1 className='nav__h1'>Диспетчерская служба</h1>
          
          {isAuthenticated ? (  // isAuthenticated - булево, не вызываем как функцию
            <>
              <div className='nav__inner'>
                <h2 className='nav__h2'>Добро пожаловать, {user?.name}!</h2>
                <Link className='nav__inner_link' to="/tickets">Заявки</Link>
                <Link className='nav__inner_link' to="/dashboard">Личная информация</Link>
              </div>
            </>
          ) : (
            <>
              <div className='nav__inner'>
                <Link className='nav__inner_link' to="/login">Вход</Link>
                <Link className='nav__inner_link' to="/register">Регистрация</Link>
              </div>
            </>
          )}
        </nav>
      </main>

      <footer className='footer'>
        <p className='footer__p'>© {new Date().getFullYear()} Development by Yurchenko Igor.</p>
      </footer>
    </>
  );
}