import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  organizationInfo,
  aboutText
} from '../../data/content';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './styles.css';

// Sidebar items for About page
const sidebarItems = [
  { id: 'goals', label: 'Цели и задачи', anchor: 'goals' },
  { id: 'authority', label: 'Полномочия', anchor: 'authority' },
  { id: 'documents', label: 'Документы', anchor: 'documents' },
  { id: 'join', label: 'Вступить в Союз', anchor: 'join' }
];

// Icons
const Icons = {
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
  ),
  arrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12,5 19,12 12,19"/>
    </svg>
  ),
  document: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  ),
  download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
};

// Authority/Powers data
const authorityItems = [
  'Представление интересов членов Союза в органах государственной власти',
  'Участие в разработке нормативных правовых актов в сфере экологии',
  'Координация деятельности членов Союза по вопросам социального партнёрства',
  'Проведение независимой оценки квалификаций специалистов',
  'Разработка и актуализация профессиональных стандартов',
  'Организация обучающих мероприятий и семинаров'
];

// Documents data
const documents = [
  { id: 'prikaz', title: 'Приказ о вступлении в должность Тюрин В.А.', type: 'PDF' },
  { id: 'rekvizity', title: 'Реквизиты ОМОР СЭР', type: 'PDF' }
];

function About() {
  const [currentSection, setCurrentSection] = useState('goals');
  const location = useLocation();

  // Scroll to hash on mount or when hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  // Track scroll position to update active sidebar item
  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarItems.map(item => ({
        id: item.anchor,
        element: document.getElementById(item.anchor)
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setCurrentSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-page">
      {/* Navbar with sidebar */}
      <Navbar
        showSidebar={true}
        sidebarItems={sidebarItems}
        currentSection={currentSection}
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
      <section className="about-section about-section-alt" id="goals">
        <div className="container">
          <div className="section-header-left">
            <span className="section-tag">О нас</span>
            <h2>Цели и задачи</h2>
          </div>
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

      {/* Authority Section */}
      <section className="about-section" id="authority">
        <div className="container">
          <div className="section-header-left">
            <span className="section-tag">Деятельность</span>
            <h2>Полномочия</h2>
          </div>
          <div className="authority-list">
            {authorityItems.map((item, idx) => (
              <div key={idx} className="authority-item">
                <span className="check-icon">{Icons.check()}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="about-section about-section-alt" id="documents">
        <div className="container">
          <div className="section-header-left">
            <span className="section-tag">Материалы</span>
            <h2>Документы</h2>
          </div>
          <div className="documents-grid">
            {documents.map((doc) => (
              <a key={doc.id} href={`/document?doc=${doc.id}`} target="_blank" rel="noopener noreferrer" className="document-card">
                <div className="document-icon">{Icons.document()}</div>
                <div className="document-info">
                  <h4>{doc.title}</h4>
                  <span>{doc.type}</span>
                </div>
                <div className="document-view">
                  {Icons.arrowRight()}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="about-section join-section" id="join">
        <div className="container">
          <div className="join-content">
            <div className="section-header-left">
              <span className="section-tag">Членство</span>
              <h2>Вступить в Союз</h2>
            </div>
            <p className="join-description">
              Станьте частью профессионального сообщества экологов России.
              Членство в Союзе открывает доступ к экспертной поддержке,
              обучающим мероприятиям и возможности участия в разработке
              профессиональных стандартов.
            </p>
            <div className="join-benefits">
              <div className="benefit-item">
                <span className="check-icon">{Icons.check()}</span>
                <span>Экспертная поддержка по вопросам экологии</span>
              </div>
              <div className="benefit-item">
                <span className="check-icon">{Icons.check()}</span>
                <span>Участие в семинарах и вебинарах</span>
              </div>
              <div className="benefit-item">
                <span className="check-icon">{Icons.check()}</span>
                <span>Скидки на независимую оценку квалификаций</span>
              </div>
              <div className="benefit-item">
                <span className="check-icon">{Icons.check()}</span>
                <span>Доступ к актуальной нормативной базе</span>
              </div>
            </div>
            <Link to="/#contacts" className="btn btn-primary">
              <span>Подать заявку</span>
              {Icons.arrowRight()}
            </Link>
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
      <Footer />
    </div>
  );
}

export default About;
