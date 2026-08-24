import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { getUser, logout } = useAuth();
  const user = getUser();

  return (
    <>
      {/* Навигация */}
      <nav>
        <span>Dispatcher | Dashboard</span>
        <span>
          Привет, <span>{user?.name || 'User'}!</span>
        </span>
        <button onClick={logout}>Выйти</button>
      </nav>

      {/* Основной контент */}
      <section>
        <h1>Панель управления</h1>
        <p>Добро пожаловать в ваш личный кабинет</p>

        {/* Статистика */}
        <div>
          <div>
            <p>Всего задач</p>
            <p>0</p>
          </div>
          <div>
            <p>Выполнено</p>
            <p>0</p>
          </div>
          <div>
            <p>В работе</p>
            <p>0</p>
          </div>
        </div>

        {/* Информационная секция */}
        <div>
          <h2>Добро пожаловать в систему!</h2>
          <p>
            Здесь будет отображаться ваш дашборд с задачами и статистикой.
            Вы можете начать добавлять задачи или настраивать профиль.
          </p>
          <button>Создать задачу</button>
          <button>Настройки</button>
        </div>

        {/* Информация о пользователе */}
        <div>
          <h3>Информация о профиле</h3>
          <p><span>Имя:</span> {user?.name || 'Не указано'}</p>
          <p><span>Email:</span> {user?.email || 'Не указан'}</p>
          <p><span>ID пользователя:</span> {user?.id || '—'}</p>
        </div>
      </section>
    </>
  );
}