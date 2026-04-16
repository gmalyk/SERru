import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCarouselSeminars, createCarouselSeminar, updateCarouselSeminar } from '../../api/carousel.js';
import { uploadFile } from '../../api/upload.js';

function CarouselForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tag: 'вебинар', title: '', format: '', external_link: '',
    internal_link: '', year: String(new Date().getFullYear()), image_key: '', sort_order: 0
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getCarouselSeminars().then(items => {
        const item = items.find(i => i.id === parseInt(id));
        if (item) {
          setForm({
            tag: item.tag, title: item.title, format: item.format,
            external_link: item.external_link || '', internal_link: item.internal_link || '',
            year: item.year, image_key: item.image_key || '', sort_order: item.sort_order || 0
          });
          if (item.image) setImagePreview(item.image);
        }
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
    const payload = { ...form, sort_order: parseInt(form.sort_order) || 0 };
    try {
      if (isEdit) {
        await updateCarouselSeminar(id, payload);
      } else {
        await createCarouselSeminar(payload);
      }
      navigate('/admin/carousel');
    } catch (err) {
      alert('Ошибка: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <h1>{isEdit ? 'Редактировать слайд' : 'Новый слайд'}</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-field">
          <label>Название *</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label>Тип</label>
            <select name="tag" value={form.tag} onChange={handleChange}>
              <option value="вебинар">Вебинар</option>
              <option value="семинар">Семинар</option>
            </select>
          </div>
          <div className="admin-field">
            <label>Год</label>
            <input name="year" value={form.year} onChange={handleChange} />
          </div>
          <div className="admin-field">
            <label>Порядок</label>
            <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} />
          </div>
        </div>
        <div className="admin-field">
          <label>Формат (текст) *</label>
          <input name="format" value={form.format} onChange={handleChange} required placeholder="Формат: ВКС 23 апреля 2026 года" />
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label>Внутренняя ссылка</label>
            <input name="internal_link" value={form.internal_link} onChange={handleChange} placeholder="/webinar/slug" />
          </div>
          <div className="admin-field">
            <label>Внешняя ссылка</label>
            <input name="external_link" value={form.external_link} onChange={handleChange} placeholder="https://..." />
          </div>
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
          <button type="button" className="admin-btn" onClick={() => navigate('/admin/carousel')}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

export default CarouselForm;
