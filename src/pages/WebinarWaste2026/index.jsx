import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../WebinarDetail/styles.css';
import doc1 from '../../assets/Заявка на участие в вебинаре 23.04.2026.xlsx';
import doc2 from '../../assets/Форма договора 23.04.2026.docx';
import doc3 from '../../assets/Гарантийное письмо 23.04.2026.docx';
import doc4 from '../../assets/Приглашение на вебинар 23 апреля 2026 года.pdf';

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

function WebinarWaste2026() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const webinarData = {
    tag: 'вебинар',
    title: 'Обращение с промышленными отходами',
    format: 'ВКС',
    date: '23 апреля 2026 года',
    price: '14 000 рублей',
    speakers: 'Спикерами мероприятия выступят специалисты Росприроднадзора, ФГУП «ФЭО» и ФГБУ «ФЦАО», непосредственно участвующие в выработке данных вопросов.',
    topics: [
      'Лицензирование деятельности в области обращения с отходами I – IV классов опасности: подтверждение соответствия и актуальные требования',
      'Порядок ведения ФККО и банка данных об отходах и технологиях утилизации и обезвреживания. Порядок подтверждения отнесения отходов I – V классов опасности к конкретному классу опасности',
      'Инвентаризация отходов производства и потребления. Отчетность в сфере обращения с отходами',
      'Государственный кадастр отходов. Порядок включения, внесения изменений и исключения из ГРОРО',
      'Судебная практика по оспариванию решений, действий (бездействий) Росприроднадзора, принятых и (или) осуществляемых в рамках ведения ГРОРО',
      'Особенности обращения с отходами I – II классов опасности',
      'Исчисление платы за НВОС. Основные ошибки и нарушения, выявляемые в рамках контроля',
      'Требования к маркировке, таре и упаковке при транспортировке отходов',
      'Нормативы образования отходов и лимиты на их размещение (ПНООЛР, КЭР)',
      'Экологический сбор – порядок сдачи отчетности, основные ошибки, сроки уплаты. Осуществление возврата (зачета) излишне уплаченного экологического сбора',
      'Привлечение к административной ответственности в рамках РОП, включая судебную практику'
    ],
    documents: [
      {
        name: 'Приглашение на вебинар 23 апреля 2026 года.pdf',
        file: doc4
      },
      {
        name: 'Заявка на участие в вебинаре 23.04.2026.xlsx',
        file: doc1
      },
      {
        name: 'Форма договора 23.04.2026.docx',
        file: doc2
      },
      {
        name: 'Гарантийное письмо 23.04.2026.docx',
        file: doc3
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

            <div className="webinar-speakers">
              <p>{webinarData.speakers}</p>
            </div>

            <div className="webinar-topics">
              <h2>Темы вебинара:</h2>
              <ul className="topics-list">
                {webinarData.topics.map((topic, idx) => (
                  <li key={idx}>
                    <span className="check-icon">{Icons.check()}</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="webinar-price">
              <p>Цена участия в вебинаре на 1 человека: <strong>{webinarData.price}</strong></p>
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

export default WebinarWaste2026;
