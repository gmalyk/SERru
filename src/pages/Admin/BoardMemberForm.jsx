import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoardMembers, createBoardMember, updateBoardMember } from '../../api/structure.js';

function BoardMemberForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', position: '', sort_order: 0 });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getBoardMembers().then(items => {
        const found = items.find(m => String(m.id) === id);
        if (found) setForm({ name: found.name, position: found.position, sort_order: found.sort_order });
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await updateBoardMember(id, form);
      } else {
        await createBoardMember(form);
      }
      navigate('/admin/board-members');
    } catch (err) {
      alert('Ошибка: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <h1>{isEdit ? 'Редактировать члена Правления' : 'Новый член Правления'}</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-field">
          <label>ФИО *</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="admin-field">
          <label>Должность *</label>
          <input name="position" value={form.position} onChange={handleChange} required />
        </div>
        <div className="admin-field">
          <label>Порядок сортировки</label>
          <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} style={{ width: '80px' }} />
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Сохранение...' : (isEdit ? 'Сохранить' : 'Создать')}
          </button>
          <button type="button" className="admin-btn" onClick={() => navigate('/admin/board-members')}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

export default BoardMemberForm;
