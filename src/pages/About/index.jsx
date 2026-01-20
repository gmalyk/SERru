import { Link } from 'react-router-dom';
import {
  organizationInfo,
  contactInfo,
  aboutText,
  footerLinks
} from '../../data/content';
import logo from '../../assets/logo.png';
import './styles.css';

// Icons
const Icons = {
  phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  email: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  location: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
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
  close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  ),
  arrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12,19 5,12 12,5"/>
    </svg>
  )
};

function About() {
  return (
    <div className="about-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <img src={logo} alt={organizationInfo.name} />
            </Link>

            <nav className="nav">
              <ul className="nav-list">
                <li><Link to="/about">О Союзе</Link></li>
                <li><a href="/#structure">Структура ОМОР</a></li>
                <li><a href="/#news">Новости</a></li>
                <li><a href="/#seminars">Семинары</a></li>
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

      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>О Союзе Экологов России</h1>
          <p className="about-hero-subtitle">{organizationInfo.fullName}</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-section-grid">
            <div className="about-section-content">
              <h2>Наша миссия</h2>
              <p>{aboutText.mission}</p>
            </div>
            <div className="about-section-image">
              <div className="placeholder-image">
                <div className="about-badge">
                  <span className="badge-year">2023</span>
                  <span className="badge-text">Год основания</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="about-section about-section-alt">
        <div className="container">
          <h2>Наши цели</h2>
          <div className="goals-grid">
            {aboutText.goals.map((goal, idx) => (
              <div key={idx} className="goal-card">
                <span className="goal-number">{idx + 1}</span>
                <p>{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Info */}
      <section className="about-section">
        <div className="container">
          <h2>Регистрационные данные</h2>
          <div className="registration-grid">
            <div className="registration-card">
              <strong>ОГРН</strong>
              <p>{organizationInfo.registration.ogrn}</p>
            </div>
            <div className="registration-card">
              <strong>ИНН</strong>
              <p>{organizationInfo.registration.inn}</p>
            </div>
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

export default About;
