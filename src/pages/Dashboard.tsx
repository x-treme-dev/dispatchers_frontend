import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import corpIcon from '../assets/voda_logo.png';

export function Dashboard() {
  const { getUser, logout } = useAuth();
  const user = getUser();
  
  console.log(user);

  return (
    <>

      <div className='top-control-panel'>
         <div className='top-control-panel__wrapper'>
            <Link className='top-control-row-panel__logo' to="/">
              <img  className='top-control-panel__logo_img' src={corpIcon} alt="Home" />
            </Link> 
            <div className='top-control-panel__info'>
              <p className='top-control-panel__info_p'>{user?.role || 'Не указан'}</p>
              <p className='top-control-panel__info_p'>{user?.name || 'User'}</p>
              <p className='top-control-panel__info_p'>{user?.email || 'Не указан'}</p>
              </div>
          </div>
      </div>
      
      <div className='container'>
           <nav>
             <div>
             
             
             </div>
             <p>
              <Link to="/register">Создать заявку</Link>
              <Link to="/tickets">Все заявки</Link>
              <Link to="/logout">Выйти</Link>
              </p>
            </nav>
   
      </div>
    </>
  );
}