import { useState, useEffect } from 'react';
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

// Icons
const Icons = {
  document: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  education: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  certificate: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  consultation: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  partnership: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  legal: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
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
  arrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12,5 19,12 12,19"/>
    </svg>
  ),
  arrowUpRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="7" y1="17" x2="17" y2="7"/>
      <polyline points="7,7 17,7 17,17"/>
    </svg>
  ),
  leaf: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  )
};

const iconMap = {
  document: Icons.document,
  education: Icons.education,
  certificate: Icons.certificate,
  consultation: Icons.consultation,
  partnership: Icons.partnership,
  legal: Icons.legal
};

function Design4() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="design4">
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <a href="#" className="logo">
              <img src={logo} alt={organizationInfo.name} />
              <span className="logo-text">{organizationInfo.name}</span>
            </a>

            <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
              <ul className="nav-list">
                {navigation.slice(0, 6).map((item) => (
                  <li key={item.id}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="header-actions">
              <a href="#contacts" className="contact-btn">
                {Icons.phone()}
                <span>{contactInfo.phone}</span>
              </a>
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
        <div className="hero-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="hero-grid-pattern"></div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-glass-card">
              <div className="eco-badge">
                <span className="badge-icon">{Icons.leaf()}</span>
                <span>Экология и природопользование</span>
              </div>
              <h1>
                <span className="text-gradient">{organizationInfo.name}</span>
              </h1>
              <p className="hero-subtitle">{organizationInfo.fullName}</p>
              <p className="hero-description">{aboutText.mission}</p>
              <div className="hero-actions">
                <a href="#join" className="btn btn-glow">
                  <span>Вступить в Союз</span>
                  {Icons.arrowRight()}
                </a>
                <a href="#about" className="btn btn-glass">
                  <span>Подробнее</span>
                  {Icons.arrowUpRight()}
                </a>
              </div>
            </div>

            <div className="hero-stats">
              {statistics.map((stat, idx) => (
                <div key={idx} className="hero-stat glass-card">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Прокрутите вниз</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Что мы делаем</span>
            <h2>Направления <span className="text-gradient">деятельности</span></h2>
          </div>

          <div className="services-grid">
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="service-card glass-card"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="service-icon-wrapper">
                    <div className="service-icon">
                      {IconComponent && <IconComponent />}
                    </div>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="#" className="service-link">
                    <span>Узнать больше</span>
                    {Icons.arrowUpRight()}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <div className="about-bg">
          <div className="gradient-orb orb-4"></div>
        </div>
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-label">О нас</span>
              <h2>Объединяем <span className="text-gradient">профессионалов</span> в сфере экологии</h2>
              <p className="about-lead">{aboutText.mission}</p>

              <div className="about-features">
                {aboutText.goals.slice(0, 4).map((goal, idx) => (
                  <div key={idx} className="feature-item glass-card">
                    <span className="feature-number">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="feature-text">{goal}</span>
                  </div>
                ))}
              </div>

              <a href="#" className="btn btn-glow">
                <span>Как вступить</span>
                {Icons.arrowRight()}
              </a>
            </div>

            <div className="about-visual">
              <div className="visual-card glass-card">
                <div className="visual-content">
                  <div className="year-badge">
                    <span className="year">2023</span>
                    <span className="year-label">Год основания</span>
                  </div>
                  <div className="org-info">
                    <span className="org-label">Регистрация</span>
                    <span className="org-value">ОГРН: {organizationInfo.registration.ogrn}</span>
                    <span className="org-value">ИНН: {organizationInfo.registration.inn}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team" id="team">
        <div className="container">
          <div className="section-header centered">
            <span className="section-label">Команда</span>
            <h2>Наше <span className="text-gradient">руководство</span></h2>
          </div>

          <div className="team-grid">
            {leadership.map((person) => (
              <div key={person.id} className="team-card glass-card">
                <div className="team-avatar">
                  <div className="avatar-placeholder">
                    <span>{person.name.charAt(0)}</span>
                  </div>
                  <div className="avatar-ring"></div>
                </div>
                <div className="team-info">
                  <span className="team-position">{person.position}</span>
                  <h3>{person.name}</h3>
                  <p>{person.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="news-section" id="news">
        <div className="news-bg">
          <div className="gradient-orb orb-5"></div>
        </div>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Актуальное</span>
            <h2>Новости и <span className="text-gradient">события</span></h2>
          </div>

          <div className="news-grid">
            {news.map((item, idx) => (
              <article
                key={item.id}
                className={`news-card glass-card ${idx === 0 ? 'featured' : ''}`}
              >
                <div className="news-image">
                  <div className="placeholder-news">
                    <span className="news-icon">{Icons.leaf()}</span>
                  </div>
                  <span className="news-category">{item.category}</span>
                </div>
                <div className="news-content">
                  <span className="news-date">{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <a href="#" className="news-link">
                    Читать далее {Icons.arrowRight()}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contacts">
        <div className="container">
          <div className="contact-wrapper glass-card">
            <div className="contact-content">
              <span className="section-label">Контакты</span>
              <h2>Свяжитесь <span className="text-gradient">с нами</span></h2>
              <p>Мы всегда готовы ответить на ваши вопросы и помочь с вступлением в Союз</p>

              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon glass-icon">
                    {Icons.location()}
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Адрес</span>
                    <span className="contact-value">{contactInfo.address}</span>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon glass-icon">
                    {Icons.phone()}
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Телефон</span>
                    <a href={`tel:${contactInfo.phone}`} className="contact-value">{contactInfo.phone}</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon glass-icon">
                    {Icons.email()}
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Email</span>
                    <a href={`mailto:${contactInfo.email}`} className="contact-value">{contactInfo.email}</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon glass-icon">
                    {Icons.telegram()}
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Telegram</span>
                    <a href="#" className="contact-value">{contactInfo.telegram}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form className="contact-form">
                <div className="form-group">
                  <input type="text" placeholder="Ваше имя" className="glass-input" />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" className="glass-input" />
                </div>
                <div className="form-group">
                  <textarea rows="4" placeholder="Сообщение" className="glass-input"></textarea>
                </div>
                <button type="submit" className="btn btn-glow btn-full">
                  <span>Отправить</span>
                  {Icons.arrowRight()}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64 C480,150 960,-20 1440,64 L1440,120 L0,120 Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#" className="footer-logo">
                <img src={logo} alt={organizationInfo.name} />
                <span>{organizationInfo.name}</span>
              </a>
              <p>{organizationInfo.fullName}</p>
              <div className="footer-social">
                <a href="#" className="social-btn glass-icon">
                  {Icons.telegram()}
                </a>
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
            <div className="footer-legal">
              <a href="#">Политика конфиденциальности</a>
              <a href="#">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Design4;
