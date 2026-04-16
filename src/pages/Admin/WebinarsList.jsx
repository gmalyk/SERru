import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWebinars, deleteWebinar } from '../../api/webinars.js';

function WebinarsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getWebinars();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (slug) => {
    if (!confirm('Удалить страницу вебинара?')) return;
    await deleteWebinar(slug);
    load();
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Страницы вебинаров</h1>
        <Link to="/admin/webinars/new" className="admin-btn admin-btn-primary">+ Добавить</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Slug</th>
            <th>Название</th>
            <th>Дата</th>
            <th>Формат</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td><code>{item.slug}</code></td>
              <td className="admin-td-title">{item.title}</td>
              <td>{item.date}</td>
              <td>{item.format}</td>
              <td>{item.is_free ? 'Бесплатно' : (item.price || '—')}</td>
              <td className="admin-actions">
                <Link to={`/admin/webinars/${item.slug}/edit`} className="admin-btn admin-btn-small">Ред.</Link>
                <button onClick={() => handleDelete(item.slug)} className="admin-btn admin-btn-small admin-btn-danger">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && <p className="admin-empty">Нет вебинаров</p>}
    </div>
  );
}

export default WebinarsList;
