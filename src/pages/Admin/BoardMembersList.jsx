import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBoardMembers, deleteBoardMember } from '../../api/structure.js';

function BoardMembersList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getBoardMembers());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Удалить этого члена Правления?')) return;
    await deleteBoardMember(id);
    load();
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Состав членов Правления</h1>
        <Link to="/admin/board-members/new" className="admin-btn admin-btn-primary">+ Добавить</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Порядок</th>
            <th>ФИО</th>
            <th>Должность</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.sort_order}</td>
              <td className="admin-td-title">{item.name}</td>
              <td>{item.position}</td>
              <td className="admin-actions">
                <Link to={`/admin/board-members/${item.id}/edit`} className="admin-btn admin-btn-small">Ред.</Link>
                <button onClick={() => handleDelete(item.id)} className="admin-btn admin-btn-small admin-btn-danger">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && <p className="admin-empty">Нет членов Правления</p>}
    </div>
  );
}

export default BoardMembersList;
