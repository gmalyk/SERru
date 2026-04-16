import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNews, deleteNews } from '../../api/news.js';

function NewsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getNews();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Удалить эту новость?')) return;
    await deleteNews(id);
    load();
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Новости</h1>
        <Link to="/admin/news/new" className="admin-btn admin-btn-primary">+ Добавить</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Категория</th>
            <th>Дата</th>
            <th>Изображение</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td className="admin-td-title">{item.title}</td>
              <td><span className="admin-tag">{item.category}</span></td>
              <td>{item.date || '—'}</td>
              <td>{item.image_key ? '✓' : '—'}</td>
              <td className="admin-actions">
                <Link to={`/admin/news/${item.id}/edit`} className="admin-btn admin-btn-small">Ред.</Link>
                <button onClick={() => handleDelete(item.id)} className="admin-btn admin-btn-small admin-btn-danger">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && <p className="admin-empty">Нет новостей</p>}
    </div>
  );
}

export default NewsList;
