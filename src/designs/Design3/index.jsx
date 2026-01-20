import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  organizationInfo,
  contactInfo,
  navigation,
  news,
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
  arrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12,5 19,12 12,19"/>
    </svg>
  ),
  check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20,6 9,17 4,12"/>
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
  chevronLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15,18 9,12 15,6"/>
    </svg>
  ),
  chevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,18 15,12 9,6"/>
    </svg>
  )
};

function Design3() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
  };

  return (
    <div className="design3">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="#" className="logo">
              <img src={logo} alt={organizationInfo.name} />
            </a>

            <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
              <ul className="nav-list">
                <li><Link to="/about">О Союзе</Link></li>
                {navigation
                  .filter((item) => !['Главная', 'Мероприятия', 'Деятельность ОМОР', 'Контакты', 'О Союзе', 'Семинары'].includes(item.label))
                  .slice(0, 7)
                  .map((item) => (
                    <li key={item.id}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                <li><Link to="/seminars">Семинары</Link></li>
                <li><a href="#spk">СПК</a></li>
                <li><a href="#contacts">Контакты</a></li>
              </ul>
            </nav>

            <div className="header-actions">
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
          <div className="hero-pattern"></div>
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
      </section>

      {/* About */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-carousel">
            <button className="about-nav-btn about-nav-prev">
              {Icons.chevronLeft()}
            </button>

            <div className="about-grid">
              <div className="about-image">
                <div className="placeholder-about">
                  <div className="about-badge">
                    <span className="badge-year">2023</span>
                    <span className="badge-text">Год основания</span>
                  </div>
                </div>
              </div>

              <div className="about-content">
                <span className="section-tag">семинар</span>
                <h2>Объединяем профессионалов в сфере экологии</h2>
                <ul className="about-list">
                  {aboutText.goals.map((goal, idx) => (
                    <li key={idx}>
                      <span className="check-icon">{Icons.check()}</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/seminars" className="btn btn-primary">
                  <span>Подробнее</span>
                  {Icons.arrowRight()}
                </Link>
              </div>
            </div>

            <button className="about-nav-btn about-nav-next">
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

          <div className="news-carousel">
            <button onClick={prevSlide} className="carousel-btn">
              {Icons.chevronLeft()}
            </button>

            <div className="carousel-track">
              {news.map((item, idx) => (
                <div
                  key={item.id}
                  className={`news-slide ${idx === currentSlide ? 'active' : ''}`}
                >
                  <div className="news-image">
                    <div className="placeholder-news">Новость {item.id}</div>
                  </div>
                  <div className="news-content">
                    <span className="news-category">{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <div className="news-footer">
                      <span className="news-date">
                        {Icons.calendar()}
                        {item.date}
                      </span>
                      <a href="#" className="news-link">Читать далее</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={nextSlide} className="carousel-btn">
              {Icons.chevronRight()}
            </button>
          </div>

          <div className="carousel-dots">
            {news.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`dot ${idx === currentSlide ? 'active' : ''}`}
              />
            ))}
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
                  <select>
                    <option>Выберите тему</option>
                    <option>Вступление в Союз</option>
                    <option>Консультация</option>
                    <option>Семинары и обучение</option>
                    <option>Другое</option>
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
                    <p><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
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
                    <p><a href="#">{contactInfo.telegram}</a></p>
                  </div>
                </div>
              </div>
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

export default Design3;
