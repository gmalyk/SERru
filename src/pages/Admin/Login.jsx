import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth.js';
import './admin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/news');
    } catch (err) {
      setError(err.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h1>Панель администратора</h1>
        <p>Союз Экологов России</p>
        {error && <div className="admin-error">{error}</div>}
        <div className="admin-field">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="admin-field">
          <label>Пароль</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
