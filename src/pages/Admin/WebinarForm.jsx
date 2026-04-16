import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getWebinar, createWebinar, updateWebinar } from '../../api/webinars.js';
import { uploadFile } from '../../api/upload.js';

function WebinarForm() {
  const { slug } = useParams();
  const isEdit = !!slug;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    slug: '', tag: 'вебинар', title: '', subtitle: '', format: 'ВКС',
    date: '', price: '', is_free: false, speakers: '', image_key: ''
  });
  const [topics, setTopics] = useState(['']);
  const [documents, setDocuments] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getWebinar(slug).then(data => {
        setForm({
          slug: data.slug, tag: data.tag, title: data.title,
          subtitle: data.subtitle || '', format: data.format, date: data.date,
          price: data.price || '', is_free: !!data.is_free,
          speakers: data.speakers || '', image_key: data.image_key || ''
        });
        setTopics(data.topics && data.topics.length ? data.topics : ['']);
        setDocuments(data.documents || []);
        if (data.image) setImagePreview(data.image);
        setLoading(false);
      });
    }
  }, [slug, isEdit]);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const result = await uploadFile(file, 'images');
      setForm(f => ({ ...f, image_key: result.key }));
      setImagePreview(result.url);
    } catch (err) {
      alert('Ошибка загрузки: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      topics: topics.filter(t => t.trim()),
      documents: documents.map(d => ({ name: d.name, file_key: d.file_key }))
    };
    try {
      if (isEdit) {
        await updateWebinar(slug, payload);
      } else {
        await createWebinar(payload);
      }
      navigate('/admin/webinars');
    } catch (err) {
      alert('Ошибка: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <h1>{isEdit ? 'Редактировать вебинар' : 'Новый вебинар'}</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-field">
            <label>Slug (URL) *</label>
            <input name="slug" value={form.slug} onChange={handleChange} required placeholder="eco-control-2026" />
          </div>
          <div className="admin-field">
            <label>Тип</label>
            <select name="tag" value={form.tag} onChange={handleChange}>
              <option value="вебинар">Вебинар</option>
              <option value="семинар">Семинар</option>
            </select>
          </div>
        </div>
        <div className="admin-field">
          <label>Название *</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="admin-field">
          <label>Подзаголовок</label>
          <input name="subtitle" value={form.subtitle} onChange={handleChange} />
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label>Формат</label>
            <select name="format" value={form.format} onChange={handleChange}>
              <option value="ВКС">ВКС</option>
              <option value="ОЧНО">ОЧНО</option>
            </select>
          </div>
          <div className="admin-field">
            <label>Дата *</label>
            <input name="date" value={form.date} onChange={handleChange} required placeholder="23 апреля 2026 года" />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label>Цена</label>
            <input name="price" value={form.price} onChange={handleChange} placeholder="14 000 рублей" />
          </div>
          <label className="admin-checkbox">
            <input type="checkbox" name="is_free" checked={form.is_free} onChange={handleChange} />
            Бесплатный
          </label>
        </div>
        <div className="admin-field">
          <label>Спикеры</label>
          <textarea name="speakers" value={form.speakers} onChange={handleChange} rows={3} />
        </div>
        <div className="admin-field">
          <label>Изображение</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="admin-image-preview" />}
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
          <button type="button" className="admin-btn" onClick={() => navigate('/admin/webinars')}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

export default WebinarForm;
