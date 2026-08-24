import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import corpIcon from '../assets/voda_logo.png';

export function Home() {
  const { isAuthenticated, getUser } = useAuth();
  const user = getUser();

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
        {/* Навигация */}
        <nav className="nav">
          
          <h1 className='nav__h1'>Диспетчерская служба</h1>
        
          {isAuthenticated() ? (
            <>
              <div className='nav__inner'>
              <span>Добро пожаловать, {user?.name}!</span>
              <Link className='nav__inner_link' to="/dashboard">Dashboard</Link>
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

      {/* Footer */}
      <footer className='footer'>
        <p>© {new Date().getFullYear()} Все права защищены.</p>
      </footer>
    </>
  );
}