import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUnionMembers, deleteUnionMember } from '../../api/structure.js';

function UnionMembersList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getUnionMembers());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Удалить этого члена Союза?')) return;
    await deleteUnionMember(id);
    load();
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Члены Союза</h1>
        <Link to="/admin/union-members/new" className="admin-btn admin-btn-primary">+ Добавить</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Организация</th>
            <th>ОГРН</th>
            <th>Руководитель</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td className="admin-td-title">{item.name}</td>
              <td>{item.ogrn}</td>
              <td>{item.director}</td>
              <td className="admin-actions">
                <Link to={`/admin/union-members/${item.id}/edit`} className="admin-btn admin-btn-small">Ред.</Link>
                <button onClick={() => handleDelete(item.id)} className="admin-btn admin-btn-small admin-btn-danger">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && <p className="admin-empty">Нет членов Союза</p>}
    </div>
  );
}

export default UnionMembersList;
