import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  organizationInfo,
  contactInfo,
  news,
  aboutText
} from '../../data/content';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './styles.css';
import resVid from '../../assets/resVid.mp4';
import seminarImg from '../../assets/seminar10-02-2026.png';

// Icons
const Icons = {
  phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  email: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  location: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  telegram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  arrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  ),
  check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20,6 9,17 4,12" />
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
  chevronLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15,18 9,12 15,6" />
    </svg>
  ),
  chevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,18 15,12 9,6" />
    </svg>
  ),
  chevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6,9 12,15 18,9" />
    </svg>
  )
};

// Seminars data for carousel
const seminars = [
  {
    id: 1,
    tag: 'семинар',
    title: 'ВСЕ ГРАНИ РАСШИРЕННОЙ ОТВЕТСТВЕННОСТИ ПРОИЗВОДИТЕЛЕЙ, ИМПОРТЕРОВ И УТИЛИЗАТОРОВ: ОТ ТЕОРИИ ДО ПРАКТИКИ',
    format: 'Формат семинара: очно и ВКС 10-11 февраля 2026 года',
    externalLink: 'https://семинар-роп2026.рф/#about',
    internalLink: null,
    year: '2026',
    image: seminarImg
  },
  {
    id: 2,
    tag: 'вебинар',
    title: 'Организация экологического контроля: разработка деклараций НВОС и профессиональных экологических квалификаций',
    format: 'Формат: ВКС 26 февраля 2026 года',
    externalLink: null,
    internalLink: '/webinar/eco-control-2026',
    year: '2026'
  }
];

function Design3() {
  const [formTopic, setFormTopic] = useState('');
  const [currentSeminar, setCurrentSeminar] = useState(0);
  const location = useLocation();

  // Scroll to hash section when navigating from another page
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure the DOM is fully rendered
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  // Show all news items in a scrollable carousel
  const displayedNews = news;

  return (
    <div className="design3">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-video-container">
          <video
            src={resVid}
            autoPlay
            muted
            loop
            playsInline
            className="hero-video"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">Объединение работодателей</span>
            <h1>{organizationInfo.name}</h1>
            <p className="hero-subtitle">{organizationInfo.fullName}</p>
            <div className="hero-buttons">
              <Link to="/about" className="btn btn-primary">
                <span>Узнать больше</span>
                {Icons.arrowRight()}
              </Link>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          {Icons.chevronDown()}
        </div>
      </section>

      {/* About / Seminars Carousel */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-carousel">
            <button
              className="about-nav-btn about-nav-prev"
              onClick={() => setCurrentSeminar((prev) => (prev === 0 ? seminars.length - 1 : prev - 1))}
            >
              {Icons.chevronLeft()}
            </button>

            <div className="about-grid">
              <div className="about-image">
                <div className={`about-image-container ${!seminars[currentSeminar].image ? 'placeholder-about' : ''}`}>
                  {seminars[currentSeminar].image && (
                    <img
                      src={seminars[currentSeminar].image}
                      alt={seminars[currentSeminar].title}
                      className="seminar-img"
                    />
                  )}
                </div>
              </div>

              <div className="about-content">
                <span className="section-tag">{seminars[currentSeminar].tag}</span>
                <h2>{seminars[currentSeminar].title}</h2>
                <p className="seminar-format">{seminars[currentSeminar].format}</p>

                {seminars[currentSeminar].externalLink ? (
                  <a
                    href={seminars[currentSeminar].externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <span>Подробнее</span>
                    {Icons.arrowRight()}
                  </a>
                ) : seminars[currentSeminar].internalLink ? (
                  <Link to={seminars[currentSeminar].internalLink} className="btn btn-primary">
                    <span>Подробнее</span>
                    {Icons.arrowRight()}
                  </Link>
                ) : (
                  <Link to="/events" className="btn btn-primary">
                    <span>Мероприятия</span>
                    {Icons.arrowRight()}
                  </Link>
                )}
              </div>
            </div>

            <button
              className="about-nav-btn about-nav-next"
              onClick={() => setCurrentSeminar((prev) => (prev === seminars.length - 1 ? 0 : prev + 1))}
            >
              {Icons.chevronRight()}
            </button>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="news-section" id="news">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Актуальное</span>
            <h2>Новости и события</h2>
          </div>

          <div className="news-grid">
            {displayedNews.map((item) => {
              // If item has excerpt, link to detail page; otherwise link to external URL
              const hasDetailPage = item.excerpt && item.excerpt.length > 0;
              const linkProps = hasDetailPage
                ? { to: `/news/${item.id}` }
                : {
                  href: item.link || '#',
                  target: item.link ? '_blank' : undefined,
                  rel: item.link ? 'noopener noreferrer' : undefined
                };
              const LinkComponent = hasDetailPage ? Link : 'a';

              return (
                <LinkComponent
                  key={item.id}
                  className="news-card"
                  {...linkProps}
                >
                  <div className="news-card-image">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="news-img" />
                    ) : (
                      <div className="placeholder-news">Новость {item.id}</div>
                    )}
                  </div>
                  <div className="news-card-content">
                    <span className="news-category">{item.category}</span>
                    <h3>{item.title}</h3>
                    <div className="news-card-footer">
                      {item.date && (
                        <span className="news-date">
                          {Icons.calendar()}
                          {item.date}
                        </span>
                      )}
                      <span className="news-link">Читать далее</span>
                    </div>
                  </div>
                </LinkComponent>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contacts">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-section">
              <span className="section-tag">Свяжитесь с нами</span>
              <h2>Остались вопросы?</h2>
              <p>Заполните форму и мы свяжемся с вами в ближайшее время</p>

              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Имя</label>
                    <input type="text" placeholder="Ваше имя" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Тема обращения</label>
                  <select value={formTopic} onChange={(e) => setFormTopic(e.target.value)}>
                    <option value="">Выберите тему</option>
                    <option value="webinar">Участие в вебинаре</option>
                    <option value="join">Вступить в Союз</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Сообщение</label>
                  <textarea rows="4" placeholder="Ваше сообщение..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  <span>Отправить сообщение</span>
                  {Icons.arrowRight()}
                </button>
              </form>
            </div>

            <div className="contact-info-section">
              <div className="contact-info-card">
                <h3>Контактная информация</h3>

                <div className="contact-item">
                  <div className="contact-icon">{Icons.location()}</div>
                  <div>
                    <strong>Адрес</strong>
                    <p>{contactInfo.address}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">{Icons.phone()}</div>
                  <div>
                    <strong>Телефон</strong>
                    <p><a href={`tel:${contactInfo.phone.replace(/[^+\d]/g, '')}`}>{contactInfo.phone}</a></p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">{Icons.email()}</div>
                  <div>
                    <strong>Email</strong>
                    <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">{Icons.telegram()}</div>
                  <div>
                    <strong>Telegram</strong>
                    <p><a href={contactInfo.telegramLink} target="_blank" rel="noopener noreferrer">{contactInfo.telegram}</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Design3;
