import { useState } from 'react';
import {
  organizationInfo,
  contactInfo,
  navigation,
  leadership,
  services,
  news,
  aboutText,
  footerLinks
} from '../../data/content';
import logo from '../../assets/logo.png';
import './styles.css';

// Icons
const Icons = {
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
  user: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  arrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12,5 19,12 12,19"/>
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
  folder: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  )
};

const categories = [
  { name: 'Новости', count: 24 },
  { name: 'Вебинары', count: 18 },
  { name: 'Семинары', count: 12 },
  { name: 'Законодательство', count: 31 },
  { name: 'Мероприятия', count: 8 }
];

const recentPosts = [
  { title: 'Изменения в экологическом законодательстве 2025', date: '25 ноября 2025' },
  { title: 'Новые требования к отчётности предприятий', date: '20 ноября 2025' },
  { title: 'Итоги конференции по устойчивому развитию', date: '15 ноября 2025' }
];

function Design2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const featuredNews = news[0];
  const otherNews = news.slice(1);

  return (
    <div className="design2">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="#" className="logo">
              <img src={logo} alt={organizationInfo.name} />
              <div className="logo-text">
                <span className="logo-name">{organizationInfo.name}</span>
                <span className="logo-subtitle">Официальный портал</span>
              </div>
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
              <button
                className={`search-toggle ${searchOpen ? 'active' : ''}`}
                onClick={() => setSearchOpen(!searchOpen)}
              >
                {Icons.search()}
              </button>
              <a href="#" className="login-btn">
                {Icons.user()}
                <span>Войти</span>
              </a>
              <button
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? Icons.close() : Icons.menu()}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="search-bar">
              <input type="text" placeholder="Поиск по сайту..." />
              <button>{Icons.search()}</button>
            </div>
          )}
        </div>
      </header>

      {/* Featured Hero */}
      <section className="featured-hero">
        <div className="container">
          <div className="featured-card">
            <div className="featured-image">
              <div className="placeholder-featured">
                <span>Главное событие</span>
              </div>
            </div>
            <div className="featured-content">
              <span className="featured-category">{featuredNews.category}</span>
              <h1>{featuredNews.title}</h1>
              <p>{featuredNews.excerpt}</p>
              <div className="featured-meta">
                <span className="meta-date">
                  {Icons.calendar()}
                  {featuredNews.date}
                </span>
              </div>
              <a href="#" className="read-more">
                Читать далее
                {Icons.arrowRight()}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="content-grid">
            {/* Articles */}
            <div className="articles-section">
              <div className="section-header">
                <h2>Последние публикации</h2>
                <div className="view-options">
                  <button className="active">Сетка</button>
                  <button>Список</button>
                </div>
              </div>

              <div className="articles-grid">
                {otherNews.map((item) => (
                  <article key={item.id} className="article-card">
                    <div className="article-image">
                      <div className="placeholder-article">
                        <span>Фото</span>
                      </div>
                      <span className="article-category">{item.category}</span>
                    </div>
                    <div className="article-content">
                      <h3>{item.title}</h3>
                      <p>{item.excerpt}</p>
                      <div className="article-footer">
                        <span className="article-date">
                          {Icons.clock()}
                          {item.date}
                        </span>
                        <a href="#" className="article-link">Подробнее</a>
                      </div>
                    </div>
                  </article>
                ))}

                {/* Additional placeholder articles */}
                {[5, 6].map((id) => (
                  <article key={id} className="article-card">
                    <div className="article-image">
                      <div className="placeholder-article">
                        <span>Фото</span>
                      </div>
                      <span className="article-category">Новости</span>
                    </div>
                    <div className="article-content">
                      <h3>Экологические инициативы регионов России</h3>
                      <p>Обзор лучших практик в области охраны окружающей среды.</p>
                      <div className="article-footer">
                        <span className="article-date">
                          {Icons.clock()}
                          5 ноября 2025
                        </span>
                        <a href="#" className="article-link">Подробнее</a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="pagination">
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span className="page-dots">...</span>
                <button className="page-btn">12</button>
                <button className="page-btn next">
                  Далее {Icons.arrowRight()}
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="sidebar">
              {/* Categories */}
              <div className="sidebar-widget">
                <h3>Категории</h3>
                <ul className="category-list">
                  {categories.map((cat, idx) => (
                    <li key={idx}>
                      <a href="#">
                        {Icons.folder()}
                        <span className="cat-name">{cat.name}</span>
                        <span className="cat-count">{cat.count}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="sidebar-widget">
                <h3>Недавние публикации</h3>
                <ul className="recent-list">
                  {recentPosts.map((post, idx) => (
                    <li key={idx}>
                      <a href="#">
                        <span className="recent-title">{post.title}</span>
                        <span className="recent-date">{post.date}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="sidebar-widget highlight">
                <h3>Быстрые ссылки</h3>
                <ul className="quick-links">
                  <li><a href="#">Профессиональные стандарты</a></li>
                  <li><a href="#">Совет по квалификациям</a></li>
                  <li><a href="#">Как вступить в Союз</a></li>
                  <li><a href="#">Документы и формы</a></li>
                </ul>
              </div>

              {/* CTA */}
              <div className="sidebar-cta">
                <h3>Станьте членом Союза</h3>
                <p>Присоединяйтесь к профессиональному сообществу экологов России</p>
                <a href="#" className="cta-btn">Вступить</a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>О Союзе Экологов России</h2>
              <p className="about-lead">{aboutText.mission}</p>
              <ul className="about-goals">
                {aboutText.goals.map((goal, idx) => (
                  <li key={idx}>{goal}</li>
                ))}
              </ul>
              <a href="#" className="btn-learn-more">
                Узнать больше о нас
                {Icons.arrowRight()}
              </a>
            </div>
            <div className="about-image">
              <div className="placeholder-about">
                <span>О нас</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="services-section">
        <div className="container">
          <h2>Наши направления</h2>
          <div className="services-scroll">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-number">{String(service.id).padStart(2, '0')}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#" className="service-link">
                  Подробнее {Icons.arrowRight()}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="team-section">
        <div className="container">
          <h2>Руководство</h2>
          <div className="team-grid">
            {leadership.map((person) => (
              <div key={person.id} className="team-card">
                <div className="team-photo">
                  <div className="placeholder-team">
                    {person.name.charAt(0)}
                  </div>
                </div>
                <div className="team-info">
                  <h3>{person.name}</h3>
                  <span className="team-position">{person.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <img src={logo} alt={organizationInfo.name} className="footer-logo" />
              <p>{organizationInfo.fullName}</p>
            </div>
            <div className="footer-contacts">
              <div className="footer-contact-item">
                {Icons.phone()}
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
              </div>
              <div className="footer-contact-item">
                {Icons.email()}
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </div>
              <div className="footer-contact-item">
                {Icons.location()}
                <span>{contactInfo.address}</span>
              </div>
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

          <div className="footer-bottom">
            <p>&copy; 2025 {organizationInfo.name}. Все права защищены.</p>
            <div className="footer-social">
              <a href="#" className="social-link">{Icons.telegram()}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Design2;
