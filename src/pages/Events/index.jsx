import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  organizationInfo,
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
  arrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12,5 19,12 12,19"/>
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
  clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  ),
  users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  chevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6,9 12,15 18,9"/>
    </svg>
  ),
  chevronUp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="18,15 12,9 6,15"/>
    </svg>
  ),
  play: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="5,3 19,12 5,21"/>
    </svg>
  ),
  video: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="23,7 16,12 23,17 23,7"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  )
};

function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const yearFromUrl = searchParams.get('year');
  const [selectedYear, setSelectedYear] = useState(yearFromUrl || '2026');
  const [expandedTopics, setExpandedTopics] = useState({});

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

  const toggleTopics = (eventId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const currentYearEvents = events[selectedYear] || [];

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
          <h1>Мероприятия ОМОР</h1>
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
                {parseInt(year) < 2026 && (
                  <span className="tab-badge past">Прошедшие</span>
                )}
                {parseInt(year) === 2026 && (
                  <span className="tab-badge upcoming">Предстоящие</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="events-section">
        <div className="container">
          <div className="events-grid">
            {currentYearEvents.map((event) => (
              <div key={event.id} className={`event-card ${event.isPast ? 'past' : 'upcoming'}`}>
                <div className="event-header">
                  <span className={`event-badge ${event.isPast ? 'past' : 'upcoming'}`}>
                    {event.isPast ? 'Прошедший' : (event.format || 'Предстоящий')}
                  </span>
                  <h3>{event.title}</h3>
                </div>

                <div className="event-meta">
                  <div className="event-meta-item">
                    {Icons.calendar()}
                    <span>{event.date}</span>
                  </div>
                  {event.time && (
                    <div className="event-meta-item">
                      {Icons.clock()}
                      <span>{event.time}</span>
                    </div>
                  )}
                  {event.participants && (
                    <div className="event-meta-item">
                      {Icons.users()}
                      <span>{event.participants} участников</span>
                    </div>
                  )}
                </div>

                {/* Topics Section */}
                <div className="event-topics">
                  <button
                    className="topics-toggle"
                    onClick={() => toggleTopics(event.id)}
                  >
                    <span>Темы мероприятия</span>
                    {expandedTopics[event.id] ? Icons.chevronUp() : Icons.chevronDown()}
                  </button>

                  {expandedTopics[event.id] && (
                    <ul className="topics-list">
                      {event.topics.map((topic, idx) => (
                        <li key={idx}>{topic}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="event-actions">
                  {event.isPast ? (
                    <Link to={`/events/${event.id}/video`} className="btn btn-secondary">
                      {Icons.video()}
                      <span>Купить видеозапись</span>
                    </Link>
                  ) : (
                    <button className="btn btn-primary">
                      <span>Зарегистрироваться</span>
                      {Icons.arrowRight()}
                    </button>
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
