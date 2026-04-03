import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  events
} from '../../data/content';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './styles.css';

// Sidebar items for Events page (years)
const yearItems = [
  { id: '2024', label: '2024', anchor: '2024' },
  { id: '2025', label: '2025', anchor: '2025' },
  { id: '2026', label: '2026', anchor: '2026' }
];

// Icons
const Icons = {
  arrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12,19 5,12 12,5"/>
    </svg>
  ),
  calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  video: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="23,7 16,12 23,17"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
  location: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  ),
  download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  file: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
    </svg>
  )
};

function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const yearFromUrl = searchParams.get('year');
  const [selectedYear, setSelectedYear] = useState(yearFromUrl || '2026');

  // Update selected year when URL changes
  useEffect(() => {
    if (yearFromUrl && events[yearFromUrl]) {
      setSelectedYear(yearFromUrl);
    }
  }, [yearFromUrl]);

  // Update URL when year changes
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSearchParams({ year });
  };

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reverse to show newest events first
  const currentYearEvents = (events[selectedYear] || []).slice().reverse();

  return (
    <div className="events-page">
      {/* Navbar with sidebar */}
      <Navbar
        showSidebar={true}
        sidebarItems={yearItems}
        currentSection={selectedYear}
        onSidebarItemClick={handleYearChange}
      />

      {/* Back Button */}
      <section className="back-section">
        <div className="container">
          <Link to="/" className="back-link">
            {Icons.arrowLeft()}
            <span>Назад</span>
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="events-hero">
        <div className="container">
          <span className="section-tag">Обучение</span>
          <h1>Семинары и вебинары</h1>
          <p className="events-hero-subtitle">
            Обучающие мероприятия по экологическому законодательству и практике
          </p>
        </div>
      </section>

      {/* Year Tabs */}
      <section className="year-tabs-section">
        <div className="container">
          <div className="year-tabs">
            {Object.keys(events).map((year) => (
              <button
                key={year}
                className={`year-tab ${selectedYear === year ? 'active' : ''}`}
                onClick={() => handleYearChange(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="events-section">
        <div className="container">
          <div className="seminars-list">
            {currentYearEvents.map((event, index) => (
              <div key={event.id} className="seminar-card-detailed">
                <div className="seminar-number">{index + 1}</div>
                <div className="seminar-content">
                  <div className="seminar-header">
                    <div className="seminar-meta-row">
                      <div className="seminar-date">
                        {Icons.calendar()}
                        <span>{event.date}</span>
                      </div>
                      <div className={`seminar-format ${event.format === 'ОЧНО' ? 'format-offline' : 'format-online'}`}>
                        {event.format === 'ОЧНО' ? Icons.location() : Icons.video()}
                        <span>{event.format}</span>
                      </div>
                    </div>
                    <h3>{event.title}</h3>
                  </div>

                  {event.description && (
                    <div className="seminar-description">
                      {event.description.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  {event.topics && (
                    <div className="seminar-topics">
                      <h4>Основные темы вебинара:</h4>
                      <ul>
                        {event.topics.map((topic, idx) => (
                          <li key={idx}>
                            {Icons.check()}
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {event.isPast && event.showBuyButton && (
                    <div className="seminar-actions">
                      <button className="buy-video-btn">
                        {Icons.video()}
                        <span>Купить видеозапись</span>
                      </button>
                    </div>
                  )}

                  {!event.isPast && event.documents && event.documents.length > 0 && (
                    <div className="seminar-documents">
                      <h4>Документы:</h4>
                      <div className="documents-grid">
                        {event.documents.map((doc, idx) => (
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
                </div>
              </div>
            ))}
          </div>

          {currentYearEvents.length === 0 && (
            <div className="no-events">
              <p>Мероприятия за {selectedYear} год пока не добавлены</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Events;
