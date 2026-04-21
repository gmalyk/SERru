import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUnionMembers, createUnionMember, updateUnionMember } from '../../api/structure.js';

function UnionMemberForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', address: '', ogrn: '', website: '',
    position: '', director: '', sort_order: 0
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getUnionMembers().then(items => {
        const found = items.find(m => String(m.id) === id);
        if (found) setForm({
          name: found.name,
          address: found.address,
          ogrn: found.ogrn,
          website: found.website || '',
          position: found.position,
          director: found.director,
          sort_order: found.sort_order
        });
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
        await updateUnionMember(id, form);
      } else {
        await createUnionMember(form);
      }
      navigate('/admin/union-members');
    } catch (err) {
      alert('Ошибка: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <h1>{isEdit ? 'Редактировать члена Союза' : 'Новый член Союза'}</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-field">
          <label>Название организации *</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="admin-field">
          <label>Адрес *</label>
          <textarea name="address" value={form.address} onChange={handleChange} rows={2} required />
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label>ОГРН *</label>
            <input name="ogrn" value={form.ogrn} onChange={handleChange} required />
          </div>
          <div className="admin-field">
            <label>Сайт</label>
            <input name="website" value={form.website} onChange={handleChange} placeholder="https://..." />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label>Должность руководителя *</label>
            <input name="position" value={form.position} onChange={handleChange} required placeholder="Директор" />
          </div>
          <div className="admin-field">
            <label>ФИО руководителя *</label>
            <input name="director" value={form.director} onChange={handleChange} required />
          </div>
        </div>
        <div className="admin-field">
          <label>Порядок сортировки</label>
          <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} style={{ width: '80px' }} />
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Сохранение...' : (isEdit ? 'Сохранить' : 'Создать')}
          </button>
          <button type="button" className="admin-btn" onClick={() => navigate('/admin/union-members')}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

export default UnionMemberForm;
