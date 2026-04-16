import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNewsById, createNews, updateNews } from '../../api/news.js';
import { uploadFile } from '../../api/upload.js';

function NewsForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '', date: '', category: 'Новости', excerpt: '',
    image_key: '', external_link: '', sort_order: 0
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getNewsById(id).then(data => {
        setForm({
          title: data.title || '',
          date: data.date || '',
          category: data.category || 'Новости',
          excerpt: data.excerpt || '',
          image_key: data.image_key || '',
          external_link: data.external_link || '',
          sort_order: data.sort_order || 0
        });
        if (data.image) setImagePreview(data.image);
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

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
    try {
      if (isEdit) {
        await updateNews(id, form);
      } else {
        await createNews(form);
      }
      navigate('/admin/news');
    } catch (err) {
      alert('Ошибка: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <h1>{isEdit ? 'Редактировать новость' : 'Новая новость'}</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-field">
          <label>Заголовок *</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label>Категория</label>
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="Новости">Новости</option>
              <option value="Законодательство">Законодательство</option>
              <option value="Семинары">Семинары</option>
            </select>
          </div>
          <div className="admin-field">
            <label>Дата</label>
            <input name="date" value={form.date} onChange={handleChange} placeholder="например: 6-8 ноября 2025" />
          </div>
          <div className="admin-field">
            <label>Порядок сортировки</label>
            <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} />
          </div>
        </div>
        <div className="admin-field">
          <label>Текст (excerpt)</label>
          <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={6} />
        </div>
        <div className="admin-field">
          <label>Внешняя ссылка</label>
          <input name="external_link" value={form.external_link} onChange={handleChange} placeholder="https://..." />
        </div>
        <div className="admin-field">
          <label>Изображение</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="admin-image-preview" />}
          {form.image_key && <small>Ключ: {form.image_key}</small>}
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Сохранение...' : (isEdit ? 'Сохранить' : 'Создать')}
          </button>
          <button type="button" className="admin-btn" onClick={() => navigate('/admin/news')}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

export default NewsForm;
