import { Link, NavLink } from 'react-router-dom';
import {
  organizationInfo,
  footerLinks
} from '../../data/content';
import logo from '../../assets/logo.png';
import './styles.css';

// Icons
const Icons = {
  telegram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
  menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
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
  )
};

const seminars = [
  {
    id: 1,
    title: 'Экологическая модернизация бизнеса',
    description: 'Обзор изменений законодательства и практические рекомендации для предприятий.',
    date: '15 февраля 2025',
    time: '10:00 - 14:00',
    format: 'Онлайн',
    participants: '50+'
  },
  {
    id: 2,
    title: 'Профессиональные стандарты в экологии',
    description: 'Актуальные требования к квалификации специалистов в сфере экологии.',
    date: '22 февраля 2025',
    time: '11:00 - 15:00',
    format: 'Очно',
    participants: '30'
  },
  {
    id: 3,
    title: 'Независимая оценка квалификаций',
    description: 'Процедура сертификации и подготовка к экзамену.',
    date: '1 марта 2025',
    time: '10:00 - 13:00',
    format: 'Онлайн',
    participants: '100+'
  },
  {
    id: 4,
    title: 'Экологический аудит предприятий',
    description: 'Методология проведения и оформление результатов.',
    date: '10 марта 2025',
    time: '09:00 - 16:00',
    format: 'Очно',
    participants: '25'
  }
];

function Seminars() {
  return (
    <div className="seminars-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <img src={logo} alt={organizationInfo.name} />
            </Link>

            <nav className="nav">
              <ul className="nav-list">
                <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>О Союзе</NavLink></li>
                <li><a href="/#structure">Структура ОМОР</a></li>
                <li><a href="/#news">Новости</a></li>
                <li><NavLink to="/seminars" className={({ isActive }) => isActive ? 'active' : ''}>Семинары</NavLink></li>
                <li><a href="/#spk">СПК</a></li>
                <li><a href="/#contacts">Контакты</a></li>
              </ul>
            </nav>

            <div className="header-actions">
              <button className="mobile-menu-btn">
                {Icons.menu()}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <section className="back-section">
        <div className="container">
          <Link to="/" className="back-link">
            {Icons.arrowLeft()}
            <span>Назад</span>
          </Link>
        </div>
      </section>

      {/* Seminars Hero */}
      <section className="seminars-hero">
        <div className="container">
          <span className="section-tag">Обучение</span>
          <h1>Семинары и вебинары</h1>
          <p className="seminars-hero-subtitle">
            Обучающие мероприятия по экологическому законодательству и практике
          </p>
        </div>
      </section>

      {/* Seminars List */}
      <section className="seminars-section">
        <div className="container">
          <div className="seminars-grid">
            {seminars.map((seminar) => (
              <div key={seminar.id} className="seminar-card">
                <div className="seminar-badge">{seminar.format}</div>
                <h3>{seminar.title}</h3>
                <p>{seminar.description}</p>
                <div className="seminar-meta">
                  <div className="seminar-meta-item">
                    {Icons.calendar()}
                    <span>{seminar.date}</span>
                  </div>
                  <div className="seminar-meta-item">
                    {Icons.clock()}
                    <span>{seminar.time}</span>
                  </div>
                  <div className="seminar-meta-item">
                    {Icons.users()}
                    <span>{seminar.participants} участников</span>
                  </div>
                </div>
                <button className="seminar-btn">Зарегистрироваться</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <img src={logo} alt={organizationInfo.name} className="footer-logo" />
              <p>{organizationInfo.fullName}</p>
              <div className="footer-registration">
                <span>ОГРН: {organizationInfo.registration.ogrn}</span>
                <span>ИНН: {organizationInfo.registration.inn}</span>
              </div>
            </div>

            <div className="footer-links">
              {footerLinks.map((column, idx) => (
                <div key={idx} className="footer-column">
                  <h4>{column.title}</h4>
                  <ul>
                    {column.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 {organizationInfo.name}. Все права защищены.</p>
            <a href="#" className="social-link">{Icons.telegram()}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Seminars;
