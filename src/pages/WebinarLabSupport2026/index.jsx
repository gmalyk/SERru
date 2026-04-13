import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../WebinarDetail/styles.css';
import doc1 from '../../assets/Программа вебинара 07.04.2026.docx';
import doc2 from '../../assets/Заявка_на_участие_в_вебинаре_07_04_2026.xlsx';
import webinarPhoto from '../../assets/07.04photo.jpg';

// Icons
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

function WebinarLabSupport2026() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const webinarData = {
    tag: 'вебинар',
    title: 'Актуализация нормативно-технической базы в части лабораторного и экспертного сопровождения природоохранной деятельности',
    subtitle: 'Доведение и обсуждение требований вновь разработанных методик и планах на 2026 год',
    format: 'ВКС',
    date: '7 апреля 2026 года',
    isFree: true,
    documents: [
      {
        name: 'Программа вебинара 07.04.2026.docx',
        file: doc1
      },
      {
        name: 'Заявка на участие в вебинаре 07.04.2026.xlsx',
        file: doc2
      }
    ]
  };

  return (
    <div className="webinar-detail-page">
      <Navbar />

      {/* Back Button */}
      <section className="back-section">
        <div className="container">
          <Link to="/" className="back-link">
            {Icons.arrowLeft()}
            <span>Назад на главную</span>
          </Link>
        </div>
      </section>

      {/* Webinar Content */}
      <section className="webinar-detail-section">
        <div className="container">
          <article className="webinar-article">
            <div className="webinar-article-header">
              <span className="webinar-tag">{webinarData.tag}</span>
              <span className="webinar-format">
                {Icons.video()}
                {webinarData.format}
              </span>
              <span className="webinar-date">
                {Icons.calendar()}
                {webinarData.date}
              </span>
            </div>

            <h1>{webinarData.title}</h1>

            <div className="webinar-photo">
              <img src={webinarPhoto} alt={webinarData.title} />
            </div>

            <div className="webinar-speakers">
              <p>{webinarData.subtitle}</p>
            </div>

            <div className="webinar-price">
              <p><strong>Бесплатный вебинар</strong></p>
            </div>

            <div className="webinar-documents">
              <h2>Документы для участия:</h2>
              <div className="documents-grid">
                {webinarData.documents.map((doc, idx) => (
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
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default WebinarLabSupport2026;
