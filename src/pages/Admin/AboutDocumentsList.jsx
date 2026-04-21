import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAboutDocuments, deleteAboutDocument } from '../../api/about.js';

function AboutDocumentsList() {
  const [tab, setTab] = useState('documents');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async (section) => {
    setLoading(true);
    try {
      setItems(await getAboutDocuments(section));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(tab); }, [tab]);

  const handleDelete = async (id) => {
    if (!confirm('Удалить этот документ?')) return;
    await deleteAboutDocument(id);
    load(tab);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Документы (О Союзе)</h1>
        <Link to="/admin/about-documents/new" className="admin-btn admin-btn-primary">+ Добавить</Link>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          className={`admin-btn${tab === 'documents' ? ' admin-btn-primary' : ''}`}
          onClick={() => setTab('documents')}
        >
          Документы
        </button>
        <button
          className={`admin-btn${tab === 'join' ? ' admin-btn-primary' : ''}`}
          onClick={() => setTab('join')}
        >
          Вступить в Союз
        </button>
      </div>
      {loading ? (
        <div className="admin-loading">Загрузка...</div>
      ) : (
        <>
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Название</th>
                <th>Ключ файла</th>
                <th>Тип</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.sort_order}</td>
                  <td className="admin-td-title">{item.title}</td>
                  <td><code style={{ fontSize: '0.8em' }}>{item.file_key}</code></td>
                  <td><span className="admin-tag">{item.type === 'view' ? 'Просмотр' : 'Скачать'}</span></td>
                  <td className="admin-actions">
                    <Link to={`/admin/about-documents/${item.id}/edit`} className="admin-btn admin-btn-small">Ред.</Link>
                    <button onClick={() => handleDelete(item.id)} className="admin-btn admin-btn-small admin-btn-danger">Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <p className="admin-empty">Нет документов</p>}
        </>
      )}
    </div>
  );
}

export default AboutDocumentsList;
