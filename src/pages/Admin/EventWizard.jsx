import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWebinar } from '../../api/webinars.js';
import { createEvent } from '../../api/events.js';
import { createCarouselSeminar } from '../../api/carousel.js';
import { uploadFile } from '../../api/upload.js';

function slugify(str) {
  const map = {
    а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'y',
    к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',
    х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya'
  };
  return str.toLowerCase().split('').map(c => map[c] ?? c).join('')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function EventWizard() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tag: 'вебинар',
    title: '',
    slug: '',
    date: '',
    year: String(new Date().getFullYear()),
    format: 'ВКС',
    subtitle: '',
    speakers: '',
    price: '',
    is_free: false,
    show_buy_button: true,
    is_past: false,
    image_key: '',
    sort_order: 0,
  });
  const [slugTouched, setSlugTouched] = useState(false);
  const [topics, setTopics] = useState(['']);
  const [documents, setDocuments] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if (e.target.name === 'title') {
      setForm(f => ({
        ...f,
        title: val,
        slug: slugTouched ? f.slug : slugify(val),
      }));
    } else if (e.target.name === 'slug') {
      setSlugTouched(true);
      setForm(f => ({ ...f, slug: val }));
    } else {
      setForm(f => ({ ...f, [e.target.name]: val }));
    }
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
      const res = await uploadFile(file, 'documents');
      setDocuments([...documents, { name: file.name, file_key: res.key }]);
      e.target.value = '';
    } catch (err) {
      alert('Ошибка загрузки: ' + err.message);
    }
  };
  const removeDoc = (i) => setDocuments(documents.filter((_, idx) => idx !== i));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const res = await uploadFile(file, 'images');
      setForm(f => ({ ...f, image_key: res.key }));
      setImagePreview(res.url);
    } catch (err) {
      alert('Ошибка загрузки: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const slug = form.slug;
    const cleanTopics = topics.filter(t => t.trim());
    const cleanDocs = documents.map(d => ({ name: d.name, file_key: d.file_key }));
    const res = { webinar: null, event: null, carousel: null,
                  webinarError: null, eventError: null, carouselError: null };

    try {
      await createWebinar({
        slug, tag: form.tag, title: form.title, subtitle: form.subtitle,
        format: form.format, date: form.date, price: form.price,
        is_free: form.is_free, speakers: form.speakers,
        image_key: form.image_key, topics: cleanTopics, documents: cleanDocs,
      });
      res.webinar = 'ok';
    } catch (err) {
      res.webinarError = err.message;
    }

    try {
      await createEvent({
        title: form.title, year: parseInt(form.year), date: form.date,
        format: form.format, description: form.subtitle,
        is_free: form.is_free, show_buy_button: form.show_buy_button,
        is_past: form.is_past, internal_link: `/webinar/${slug}`,
        sort_order: parseInt(form.sort_order) || 0,
        topics: cleanTopics, documents: cleanDocs,
      });
      res.event = 'ok';
    } catch (err) {
      res.eventError = err.message;
    }

    try {
      await createCarouselSeminar({
        tag: form.tag, title: form.title,
        format: `${form.format}: ${form.date}`,
        year: form.year, image_key: form.image_key,
        internal_link: `/webinar/${slug}`,
        sort_order: parseInt(form.sort_order) || 0,
      });
      res.carousel = 'ok';
    } catch (err) {
      res.carouselError = err.message;
    }

    setSaving(false);
    setResult(res);
  };

  if (result) {
    const allOk = result.webinar && result.event && result.carousel;
    return (
      <div className="admin-page">
        <h1>Мероприятие создано</h1>
        <div className="admin-form">
          <div className="admin-field">
            <p style={{ marginBottom: '1rem', color: allOk ? '#2d7a2d' : '#b00' }}>
              {allOk ? 'Все записи успешно созданы.' : 'Некоторые записи не удалось создать. Исправьте вручную в соответствующих разделах.'}
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Страница вебинара</td>
                  <td style={{ padding: '0.5rem 0.75rem', color: result.webinar ? '#2d7a2d' : '#b00' }}>
                    {result.webinar ? `✓ /webinar/${form.slug}` : `✗ ${result.webinarError}`}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Мероприятие (/events)</td>
                  <td style={{ padding: '0.5rem 0.75rem', color: result.event ? '#2d7a2d' : '#b00' }}>
                    {result.event ? '✓ Добавлено' : `✗ ${result.eventError}`}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Карусель (главная)</td>
                  <td style={{ padding: '0.5rem 0.75rem', color: result.carousel ? '#2d7a2d' : '#b00' }}>
                    {result.carousel ? '✓ Добавлено' : `✗ ${result.carouselError}`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/webinars')}>
              К вебинарам
            </button>
            <button className="admin-btn" onClick={() => { setResult(null); }}>
              Создать ещё
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1>Добавить мероприятие</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Заполните форму один раз — страница вебинара, запись в мероприятиях и карточка в карусели создадутся автоматически.
      </p>
      <form onSubmit={handleSubmit} className="admin-form">

        <div className="admin-form-row">
          <div className="admin-field">
            <label>Тип</label>
            <select name="tag" value={form.tag} onChange={handleChange}>
              <option value="вебинар">Вебинар</option>
              <option value="семинар">Семинар</option>
            </select>
          </div>
          <div className="admin-field">
            <label>Формат</label>
            <select name="format" value={form.format} onChange={handleChange}>
              <option value="ВКС">ВКС</option>
              <option value="ОЧНО">ОЧНО</option>
            </select>
          </div>
          <div className="admin-field">
            <label>Год</label>
            <input name="year" value={form.year} onChange={handleChange} style={{ width: '80px' }} />
          </div>
          <div className="admin-field">
            <label>Порядок</label>
            <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} style={{ width: '80px' }} />
          </div>
        </div>

        <div className="admin-field">
          <label>Название *</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label>Slug (URL) *</label>
            <input name="slug" value={form.slug} onChange={handleChange} required placeholder="eco-control-2026" />
          </div>
          <div className="admin-field">
            <label>Дата *</label>
            <input name="date" value={form.date} onChange={handleChange} required placeholder="23 апреля 2026 года" />
          </div>
        </div>

        <div className="admin-field">
          <label>Описание / подзаголовок</label>
          <textarea name="subtitle" value={form.subtitle} onChange={handleChange} rows={3} />
        </div>

        <div className="admin-field">
          <label>Спикеры</label>
          <textarea name="speakers" value={form.speakers} onChange={handleChange} rows={2} />
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
          <label className="admin-checkbox">
            <input type="checkbox" name="show_buy_button" checked={form.show_buy_button} onChange={handleChange} />
            Кнопка покупки
          </label>
          <label className="admin-checkbox">
            <input type="checkbox" name="is_past" checked={form.is_past} onChange={handleChange} />
            Прошедшее
          </label>
        </div>

        <div className="admin-field">
          <label>Изображение (для карусели и страницы)</label>
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
            {saving ? 'Создание...' : 'Создать мероприятие'}
          </button>
          <button type="button" className="admin-btn" onClick={() => navigate('/admin/webinars')}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

export default EventWizard;
