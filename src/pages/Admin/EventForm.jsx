import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvent, createEvent, updateEvent } from '../../api/events.js';
import { uploadFile } from '../../api/upload.js';

function EventForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    year: new Date().getFullYear(), date: '', format: 'ВКС', title: '',
    description: '', show_buy_button: false, is_past: false, is_free: false,
    internal_link: '', sort_order: 0
  });
  const [topics, setTopics] = useState(['']);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getEvent(id).then(data => {
        setForm({
          year: data.year, date: data.date, format: data.format, title: data.title,
          description: data.description || '', show_buy_button: !!data.show_buy_button,
          is_past: !!data.is_past, is_free: !!data.is_free,
          internal_link: data.internal_link || '', sort_order: data.sort_order || 0
        });
        setTopics(data.topics && data.topics.length ? data.topics : ['']);
        setDocuments(data.documents || []);
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [e.target.name]: val }));
  };

  const handleTopicChange = (i, value) => {
    const next = [...topics];
    next[i] = value;
    setTopics(next);
  };

  const addTopic = () => setTopics([...topics, '']);
  const removeTopic = (i) => setTopics(topics.filter((_, idx) => idx !== i));

  const handleDocUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const result = await uploadFile(file, 'documents');
      setDocuments([...documents, { name: file.name, file_key: result.key }]);
    } catch (err) {
      alert('Ошибка загрузки: ' + err.message);
    }
  };

  const removeDoc = (i) => setDocuments(documents.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      year: parseInt(form.year),
      sort_order: parseInt(form.sort_order) || 0,
      topics: topics.filter(t => t.trim()),
      documents: documents.map(d => ({ name: d.name, file_key: d.file_key }))
    };
    try {
      if (isEdit) {
        await updateEvent(id, payload);
      } else {
        await createEvent(payload);
      }
      navigate('/admin/events');
    } catch (err) {
      alert('Ошибка: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <h1>{isEdit ? 'Редактировать мероприятие' : 'Новое мероприятие'}</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-field">
          <label>Название *</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label>Год</label>
            <input name="year" type="number" value={form.year} onChange={handleChange} />
          </div>
          <div className="admin-field">
            <label>Дата *</label>
            <input name="date" value={form.date} onChange={handleChange} required placeholder="например: 23 апреля 2026 г." />
          </div>
          <div className="admin-field">
            <label>Формат</label>
            <select name="format" value={form.format} onChange={handleChange}>
              <option value="ВКС">ВКС</option>
              <option value="ОЧНО">ОЧНО</option>
            </select>
          </div>
        </div>
        <div className="admin-field">
          <label>Описание</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label>Внутренняя ссылка</label>
            <input name="internal_link" value={form.internal_link} onChange={handleChange} placeholder="/webinar/slug" />
          </div>
          <div className="admin-field">
            <label>Порядок</label>
            <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} />
          </div>
        </div>
        <div className="admin-form-row">
          <label className="admin-checkbox">
            <input type="checkbox" name="show_buy_button" checked={form.show_buy_button} onChange={handleChange} />
            Показывать кнопку покупки
          </label>
          <label className="admin-checkbox">
            <input type="checkbox" name="is_past" checked={form.is_past} onChange={handleChange} />
            Прошедшее
          </label>
          <label className="admin-checkbox">
            <input type="checkbox" name="is_free" checked={form.is_free} onChange={handleChange} />
            Бесплатное
          </label>
        </div>

        <div className="admin-field">
          <label>Темы</label>
          {topics.map((topic, i) => (
            <div key={i} className="admin-dynamic-row">
              <input value={topic} onChange={e => handleTopicChange(i, e.target.value)} placeholder={`Тема ${i + 1}`} />
              <button type="button" className="admin-btn admin-btn-small admin-btn-danger" onClick={() => removeTopic(i)}>×</button>
            </div>
          ))}
          <button type="button" className="admin-btn admin-btn-small" onClick={addTopic}>+ Добавить тему</button>
        </div>

        <div className="admin-field">
          <label>Документы</label>
          {documents.map((doc, i) => (
            <div key={i} className="admin-dynamic-row">
              <span>{doc.name}</span>
              <button type="button" className="admin-btn admin-btn-small admin-btn-danger" onClick={() => removeDoc(i)}>×</button>
            </div>
          ))}
          <input type="file" onChange={handleDocUpload} />
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Сохранение...' : (isEdit ? 'Сохранить' : 'Создать')}
          </button>
          <button type="button" className="admin-btn" onClick={() => navigate('/admin/events')}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
