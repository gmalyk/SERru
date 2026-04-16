import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, deleteEvent } from '../../api/events.js';

function EventsList() {
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setGrouped(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Удалить мероприятие?')) return;
    await deleteEvent(id);
    load();
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  const years = Object.keys(grouped).sort((a, b) => b - a);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Мероприятия</h1>
        <Link to="/admin/events/new" className="admin-btn admin-btn-primary">+ Добавить</Link>
      </div>
      {years.map(year => (
        <div key={year} className="admin-section">
          <h2>{year}</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Дата</th>
                <th>Формат</th>
                <th>Название</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {grouped[year].map(event => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.date}</td>
                  <td><span className="admin-tag">{event.format}</span></td>
                  <td className="admin-td-title">{event.title}</td>
                  <td className="admin-actions">
                    <Link to={`/admin/events/${event.id}/edit`} className="admin-btn admin-btn-small">Ред.</Link>
                    <button onClick={() => handleDelete(event.id)} className="admin-btn admin-btn-small admin-btn-danger">Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {years.length === 0 && <p className="admin-empty">Нет мероприятий</p>}
    </div>
  );
}

export default EventsList;
