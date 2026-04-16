import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCarouselSeminars, deleteCarouselSeminar } from '../../api/carousel.js';

function CarouselList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getCarouselSeminars();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Удалить из карусели?')) return;
    await deleteCarouselSeminar(id);
    load();
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Карусель на главной</h1>
        <Link to="/admin/carousel/new" className="admin-btn admin-btn-primary">+ Добавить</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Порядок</th>
            <th>Тип</th>
            <th>Название</th>
            <th>Год</th>
            <th>Изображение</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.sort_order}</td>
              <td><span className="admin-tag">{item.tag}</span></td>
              <td className="admin-td-title">{item.title}</td>
              <td>{item.year}</td>
              <td>{item.image_key ? '✓' : '—'}</td>
              <td className="admin-actions">
                <Link to={`/admin/carousel/${item.id}/edit`} className="admin-btn admin-btn-small">Ред.</Link>
                <button onClick={() => handleDelete(item.id)} className="admin-btn admin-btn-small admin-btn-danger">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && <p className="admin-empty">Карусель пуста</p>}
    </div>
  );
}

export default CarouselList;
