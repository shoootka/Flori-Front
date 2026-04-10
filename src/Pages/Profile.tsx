import { useState } from 'react';
import { useAuth } from '../data/AuthContext';
import './Profile.css';

function Profile() {
  const { user, login, register, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' as 'user' | 'admin',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      if (!login(formData.email, formData.password)) {
        setError('Неверный email или пароль');
      }
    } else {
      if (!register(formData.username, formData.email, formData.password, 'user')) {
        setError('Пользователь с таким email уже существует');
      }
    }
  };

  if (user) {
    return (
      <div className="profile-page">
        <h2>Личный кабинет</h2>
        <div className="profile-info">
          <p><strong>Имя:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Роль:</strong> {user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
        </div>
        <button onClick={logout} className="logout-btn">Выйти</button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Имя пользователя"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
      </form>
      <p>
        {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
        <button onClick={() => setIsLogin(!isLogin)} className="switch-btn">
          {isLogin ? 'Регистрация' : 'Вход'}
        </button>
      </p>
    </div>
  );
}

export default Profile;
