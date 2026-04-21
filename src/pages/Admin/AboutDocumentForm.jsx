import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAboutDocuments, createAboutDocument, updateAboutDocument } from '../../api/about.js';
import { uploadFile } from '../../api/upload.js';

function AboutDocumentForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    section: 'documents', title: '', file_key: '', type: 'view', sort_order: 0
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getAboutDocuments().then(items => {
        const found = items.find(d => String(d.id) === id);
        if (found) setForm({
          section: found.section,
          title: found.title,
          file_key: found.file_key,
          type: found.type,
          sort_order: found.sort_order
        });
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file, 'documents');
      const ext = file.name.split('.').pop().toLowerCase();
      const autoType = ext === 'pdf' ? 'view' : 'download';
      setForm(f => ({ ...f, file_key: res.key, type: autoType }));
    } catch (err) {
      alert('Ошибка загрузки: ' + err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await updateAboutDocument(id, form);
      } else {
        await createAboutDocument(form);
      }
      navigate('/admin/about-documents');
    } catch (err) {
      alert('Ошибка: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <h1>{isEdit ? 'Редактировать документ' : 'Новый документ'}</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-field">
            <label>Раздел *</label>
            <select name="section" value={form.section} onChange={handleChange}>
              <option value="documents">Документы</option>
              <option value="join">Вступить в Союз</option>
            </select>
          </div>
          <div className="admin-field">
            <label>Тип *</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="view">Просмотр (PDF-viewer)</option>
              <option value="download">Скачать</option>
            </select>
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
        <div className="admin-field">
          <label>Ключ файла *</label>
          <input name="file_key" value={form.file_key} onChange={handleChange} required
            placeholder="documents/uuid.pdf или устаревший ключ (prikaz, ustav...)" />
          <small style={{ color: '#888' }}>Загрузите файл ниже или введите ключ вручную</small>
        </div>
        <div className="admin-field">
          <label>Загрузить файл</label>
          <input type="file" onChange={handleFileUpload} disabled={uploading} />
          {uploading && <small>Загрузка...</small>}
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Сохранение...' : (isEdit ? 'Сохранить' : 'Создать')}
          </button>
          <button type="button" className="admin-btn" onClick={() => navigate('/admin/about-documents')}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

export default AboutDocumentForm;
