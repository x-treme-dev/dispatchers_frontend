# Общая струкура компонентов приложения на React
* App: корневой компонент с роутингом, провайдерами (AuthProvider, QueryClientProvider).
* AuthProvider: провайдер контекста авторизации, управляет состоянием пользователя, токеном, методами login/register/logout.
* useTickets: кастомный хук для доступа к контексту авторизации.
* ProtectedRoute: компонент для защиты маршрутов, проверяет isAuthenticated, перенаправляет на /login.
* Login: страница входа.
* Register: страница регистрации.
* Home: главная страница, показывает навигацию в зависимости от авторизации.
* Dashboard: защищённая страница (личная информация).
* Tickets: защищённая страница (заявки).
* authAPI: API-функции (login, register, logout, getUser, updateProfile).

````
src/
├── api/
│   ├── client.ts         # Настройка Axios (базовый URL, интерцепторы)
│   └── auth.ts           # API-функции: login, register, logout, getUser, updateProfile
├── contexts/
│   └── AuthContext.tsx   # Контекст и провайдер авторизации (AuthProvider, useAuth)
├── hooks/
│   └── useTickets.ts       
├── pages/
│   ├── Home.tsx          # Главная страница (публичная)
│   ├── Login.tsx         # Страница входа
│   ├── Register.tsx      # Страница регистрации
│   ├── Dashboard.tsx     # Личный кабинет (защищённый)
│   ├── Tickets.tsx       # Страница заявок (защищённая)
│   └── ProtectedRoute.tsx # Компонент-обёртка для защищённых маршрутов
├── assets/
│   └── voda_logo.png     # Логотип
└── App.tsx               # Корневой компонент с роутингом и провайдерами

````

 Компоненты и их ответственность
### App (App.tsx)
* Корневой компонент.
* Оборачивает всё приложение в QueryClientProvider (React Query) и AuthProvider.
* Настраивает маршрутизацию с помощью react-router-dom:
* Публичные маршруты: / (Home), /login (Login), /register (Register).
* Защищённые маршруты: /dashboard (Dashboard), /tickets (Tickets) – обёрнуты в ProtectedRoute.
* Fallback: любой неизвестный путь перенаправляет на /.

## AuthProvider (contexts/AuthContext.tsx)
* Провайдер контекста авторизации.
* Управляет состоянием:
    * user – данные текущего пользователя (null или объект с полями id, name, email, role).
    * loading – флаг загрузки (во время запросов).
    * error – текст ошибки (если есть).
    * При монтировании проверяет localStorage и восстанавливает сессию (если есть токен и user).
* Предоставляет методы:
    * login(credentials) – отправляет запрос на /login, сохраняет токен и пользователя в localStorage (через authAPI), обновляет состояние user.
    * register(data) – отправляет запрос на /register, аналогично сохраняет данные и обновляет состояние.
    * logout() – отправляет запрос на /logout, очищает localStorage и сбрасывает user.
    * getUser() – возвращает текущего пользователя (из состояния).
* В value контекста также доступны:
* isAuthenticated – булево значение (!!user).
* loading, error.

##  useAuth (contexts/AuthContext.tsx)
* Кастомный хук для доступа к контексту авторизации.
    * Используется во всех компонентах, которым нужны данные о пользователе или методы авторизации.
    * Если вызван вне AuthProvider, выбрасывает ошибку.

## ProtectedRoute (pages/ProtectedRoute.tsx)
* Компонент-обёртка для защищённых страниц.
* Использует useAuth для получения isAuthenticated и loading.
* Показывает индикатор загрузки, пока loading === true.
* Если isAuthenticated === false, выполняет редирект на /login (заменяя текущий URL).
* Если isAuthenticated === true, рендерит children (защищённую страницу).

## Login (pages/Login.tsx)
* Страница входа (публичная).
* Использует useAuth для вызова login и получения состояния (loading, error, isAuthenticated).
* useEffect отслеживает isAuthenticated и при его изменении на true перенаправляет на /dashboard.
* Форма собирает email и password, при сабмите вызывает login.
* Отображает сообщение об ошибке, если error не пуст.

## Register (pages/Register.tsx)
* Страница регистрации (публичная).
* Аналогично Login, использует useAuth, вызывает register, а затем useEffect перенаправляет на /dashboard при isAuthenticated.
* Проверяет совпадение паролей перед отправкой.
* Поля: name, email, password, password_confirmation.

## Home (pages/Home.tsx)
* Главная страница (публичная).
* Использует useAuth для получения user и isAuthenticated.
* Отображает приветствие с именем пользователя, если авторизован, и ссылки на /tickets и /dashboard.
* Если не авторизован – показывает ссылки на /login и /register.

## Dashboard (pages/Dashboard.tsx)
* Защищённая страница (личный кабинет).
* Показывает информацию о пользователе (и, вероятно, форму редактирования профиля).
* Использует useAuth для получения user и logout.

## Tickets (pages/Tickets.tsx)
* Защищённая страница для работы с заявками (список, создание, редактирование).
* Использует useAuth для авторизации и, возможно, useQuery для загрузки данных.

## authAPI (api/auth.ts)
* Набор функций для взаимодействия с бэкендом:
* login(credentials) – POST /login
* register(data) – POST /register
* logout() – POST /logout
* getUser() – GET /user
* updateProfile(data) – PUT /user
* Внутри использует apiClient (Axios).
* Функция saveAuthData автоматически сохраняет токен и пользователя в localStorage при успешных ответах от /login и /register.

## Взаимодействие компонентов
* Пользователь заходит на / (Home):
* Если не авторизован – видит ссылки «Вход» и «Регистрация».
* Если авторизован – видит приветствие и ссылки на защищённые страницы.
* Переход на /login:
* Ввод данных → отправка формы → вызов login из useAuth.
* login отправляет запрос через authAPI, сохраняет токен в localStorage и обновляет user в контексте.
* isAuthenticated становится true, useEffect в Login срабатывает и перенаправляет на /dashboard.
* Переход на /dashboard или /tickets:
* ProtectedRoute проверяет isAuthenticated.
* Если false – редирект на /login.
* Если true – отображается запрошенная страница.

### Выход:
* На защищённых страницах есть кнопка «Выйти», вызывающая logout из useAuth.
* logout отправляет запрос на /logout, очищает localStorage и сбрасывает user → isAuthenticated становится false.
* Пользователь перенаправляется на / (это может быть реализовано в logout или в эффекте).

### Ключевые особенности
* Единый источник истины – контекст AuthProvider (после миграции).
* Реактивность – изменение isAuthenticated автоматически обновляет UI.
* Защита маршрутов – через ProtectedRoute.
* Автоматическое сохранение сессии – восстановление из localStorage при загрузке.
* Обработка ошибок – глобальное состояние error в контексте.
* После завершения миграции со старого хука на контекст все компоненты будут использовать единую систему авторизации.

