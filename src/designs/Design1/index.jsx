import { useState } from 'react';
import {
  organizationInfo,
  contactInfo,
  navigation,
  leadership,
  services,
  news,
  statistics,
  aboutText,
  footerLinks
} from '../../data/content';
import logo from '../../assets/logo.png';
import './styles.css';

// Icons as SVG components
const Icons = {
  document: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  ),
  education: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  certificate: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  consultation: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  partnership: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  legal: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  email: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  location: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  telegram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
  search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
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
  chevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6,9 12,15 18,9"/>
    </svg>
  )
};

const getIcon = (iconName) => {
  const Icon = Icons[iconName];
  return Icon ? <Icon /> : null;
};

function Design1() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="design1">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-contacts">
              <a href={`tel:${contactInfo.phone}`}>
                <span className="icon">{Icons.phone()}</span>
                {contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`}>
                <span className="icon">{Icons.email()}</span>
                {contactInfo.email}
              </a>
            </div>
            <div className="top-bar-social">
              <a href="#" className="telegram-link">
                <span className="icon">{Icons.telegram()}</span>
                Telegram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="#" className="logo">
              <img src={logo} alt={organizationInfo.name} />
            </a>

            <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
              <ul className="nav-list">
                {navigation.map((item) => (
                  <li key={item.id} className={item.submenu ? 'has-submenu' : ''}>
                    <a href={item.href}>
                      {item.label}
                      {item.submenu && <span className="chevron">{Icons.chevronDown()}</span>}
                    </a>
                    {item.submenu && (
                      <ul className="submenu">
                        {item.submenu.map((subItem, idx) => (
                          <li key={idx}>
                            <a href={subItem.href}>{subItem.label}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="header-actions">
              <button className="search-btn">
                {Icons.search()}
              </button>
              <button
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? Icons.close() : Icons.menu()}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>{organizationInfo.name}</h1>
            <p className="hero-subtitle">{organizationInfo.fullName}</p>
            <p className="hero-description">{aboutText.mission}</p>
            <div className="hero-buttons">
              <a href="#join" className="btn btn-primary">Вступить в Союз</a>
              <a href="#about" className="btn btn-secondary">Узнать больше</a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="statistics">
        <div className="container">
          <div className="statistics-grid">
            {statistics.map((stat, idx) => (
              <div key={idx} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <div className="container">
          <h2 className="section-title">Наши услуги</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  {getIcon(service.icon)}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="news" id="news">
        <div className="container">
          <h2 className="section-title">Новости и события</h2>
          <div className="news-tabs">
            <button
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Все
            </button>
            <button
              className={`tab ${activeTab === 'news' ? 'active' : ''}`}
              onClick={() => setActiveTab('news')}
            >
              Новости
            </button>
            <button
              className={`tab ${activeTab === 'seminars' ? 'active' : ''}`}
              onClick={() => setActiveTab('seminars')}
            >
              Семинары
            </button>
          </div>
          <div className="news-grid">
            {news.map((item) => (
              <article key={item.id} className="news-card">
                <div className="news-image">
                  <div className="placeholder-image">
                    <span>Изображение</span>
                  </div>
                </div>
                <div className="news-content">
                  <span className="news-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <span className="news-date">{item.date}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="news-more">
            <a href="#" className="btn btn-outline">Все новости</a>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="leadership" id="leadership">
        <div className="container">
          <h2 className="section-title">Руководство</h2>
          <div className="leadership-grid">
            {leadership.map((person) => (
              <div key={person.id} className="leader-card">
                <div className="leader-photo">
                  <div className="placeholder-photo">
                    <span>{person.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="leader-info">
                  <h3>{person.name}</h3>
                  <span className="leader-position">{person.position}</span>
                  <p>{person.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contacts">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Контакты</h2>
              <div className="contact-item">
                <span className="icon">{Icons.location()}</span>
                <div>
                  <strong>Адрес</strong>
                  <p>{contactInfo.address}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="icon">{Icons.phone()}</span>
                <div>
                  <strong>Телефон</strong>
                  <p><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span className="icon">{Icons.email()}</span>
                <div>
                  <strong>Email</strong>
                  <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span className="icon">{Icons.telegram()}</span>
                <div>
                  <strong>Telegram</strong>
                  <p><a href="#">{contactInfo.telegram}</a></p>
                </div>
              </div>
            </div>
            <div className="contact-map">
              <div className="map-placeholder">
                <span>Карта</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={logo} alt={organizationInfo.name} className="footer-logo" />
              <p>{organizationInfo.fullName}</p>
              <p className="footer-registration">
                ОГРН: {organizationInfo.registration.ogrn}<br />
                ИНН: {organizationInfo.registration.inn}
              </p>
            </div>
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
          <div className="footer-bottom">
            <p>&copy; 2025 {organizationInfo.name}. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Design1;
