import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getWebinar } from '../../api/webinars.js';
import '../WebinarDetail/styles.css';

// Icons (reused from WebinarDetail)
const Icons = {
  arrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12,19 5,12 12,5" />
    </svg>
  ),
  calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  ),
  video: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  file: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  )
};

function WebinarDynamic() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getWebinar(slug)
      .then(d => { setData(d); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [slug]);

  if (loading) {
    return (
      <div className="webinar-detail-page">
        <Navbar />
        <section className="webinar-detail-section">
          <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', color: '#666' }}>
            Загрузка...
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="webinar-detail-page">
        <Navbar />
        <section className="webinar-detail-section">
          <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
            <h1>Вебинар не найден</h1>
            <Link to="/" style={{ color: '#4CAF50' }}>Вернуться на главную</Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="webinar-detail-page">
      <Navbar />

      <section className="back-section">
        <div className="container">
          <Link to="/" className="back-link">
            {Icons.arrowLeft()}
            <span>Назад на главную</span>
          </Link>
        </div>
      </section>

      <section className="webinar-detail-section">
        <div className="container">
          <article className="webinar-article">
            <div className="webinar-article-header">
              <span className="webinar-tag">{data.tag}</span>
              <span className="webinar-format">
                {Icons.video()}
                {data.format}
              </span>
              <span className="webinar-date">
                {Icons.calendar()}
                {data.date}
              </span>
            </div>

            <h1>{data.title}</h1>

            {data.image && (
              <div className="webinar-photo">
                <img src={data.image} alt={data.title} />
              </div>
            )}

            {(data.speakers || data.subtitle) && (
              <div className="webinar-speakers">
                <p>{data.speakers || data.subtitle}</p>
              </div>
            )}

            {data.topics && data.topics.length > 0 && (
              <div className="webinar-topics">
                <h2>Темы вебинара:</h2>
                <ul className="topics-list">
                  {data.topics.map((topic, idx) => (
                    <li key={idx}>
                      <span className="check-icon">{Icons.check()}</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(data.price || data.is_free) && (
              <div className="webinar-price">
                {data.is_free ? (
                  <p><strong>Бесплатный вебинар</strong></p>
                ) : (
                  <p>Цена участия в вебинаре на 1 человека: <strong>{data.price}</strong></p>
                )}
              </div>
            )}

            {data.documents && data.documents.length > 0 && (
              <div className="webinar-documents">
                <h2>Документы для участия:</h2>
                <div className="documents-grid">
                  {data.documents.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.file}
                      download={doc.name}
                      className="document-card"
                    >
                      <div className="document-icon">
                        {Icons.file()}
                      </div>
                      <div className="document-info">
                        <span className="document-name">{doc.name}</span>
                        <span className="document-action">
                          {Icons.download()}
                          Скачать
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default WebinarDynamic;
