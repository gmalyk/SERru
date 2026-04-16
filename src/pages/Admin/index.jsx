import { useState, useEffect } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { checkAuth, logout } from '../../api/auth.js';
import './admin.css';

function AdminLayout() {
  const [authenticated, setAuthenticated] = useState(null);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth()
      .then(data => {
        if (data.authenticated) {
          setAuthenticated(true);
          setEmail(data.email);
        } else {
          navigate('/admin/login');
        }
      })
      .catch(() => navigate('/admin/login'));
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (authenticated === null) {
    return <div className="admin-loading">Загрузка...</div>;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-logo">СЭР</Link>
          <span className="admin-badge">Админ</span>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin/news" className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            Новости
          </NavLink>
          <NavLink to="/admin/events" className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            Мероприятия
          </NavLink>
          <NavLink to="/admin/carousel" className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            Карусель
          </NavLink>
          <NavLink to="/admin/webinars" className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            Вебинары
          </NavLink>
        </nav>
        <div className="admin-sidebar-footer">
          <span className="admin-user">{email}</span>
          <button onClick={handleLogout} className="admin-logout-btn">Выйти</button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
