import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  organizationInfo,
  boardMembers,
  unionMembers
} from '../../data/content';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './styles.css';

// Sidebar items for Structure page
const sidebarItems = [
  { id: 'overview', label: 'Общая картинка', anchor: 'overview' },
  { id: 'board', label: 'Состав членов Правления', anchor: 'board' },
  { id: 'members', label: 'Члены Союза', anchor: 'members' }
];

// Icons
const Icons = {
  arrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12,19 5,12 12,5"/>
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
  building: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21h18"/>
      <path d="M9 21V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v15"/>
      <path d="M9 9h6"/>
      <path d="M9 13h6"/>
      <path d="M9 17h6"/>
    </svg>
  )
};

function Structure() {
  const [currentSection, setCurrentSection] = useState('overview');
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
    <div className="structure-page">
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

      {/* Hero */}
      <section className="structure-hero">
        <div className="container">
          <h1>Структура ОМОР</h1>
          <p className="structure-hero-subtitle">{organizationInfo.fullName}</p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="structure-section" id="overview">
        <div className="container">
          <div className="section-header-left">
            <span className="section-tag">О структуре</span>
            <h2>Общая картинка</h2>
          </div>
          <div className="overview-content">
            <div className="overview-text">
              <p>
                Союз Экологов России (ОМОР) — это общероссийское межотраслевое объединение
                работодателей в сфере экологии и природопользования, созданное в 2023 году.
              </p>
              <p>
                Организация объединяет работодателей и специалистов, работающих в области
                охраны окружающей среды, рационального природопользования и экологической
                безопасности.
              </p>
              <p>
                Структура Союза включает руководящие органы (Президент, Вице-президент,
                Генеральный директор), Правление, а также членов Союза — организации
                различных форм собственности.
              </p>
            </div>
            <div className="overview-stats">
              <div className="stat-card">
                <div className="stat-icon">{Icons.users()}</div>
                <div className="stat-value">500+</div>
                <div className="stat-label">Членов организации</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">{Icons.building()}</div>
                <div className="stat-value">50+</div>
                <div className="stat-label">Компаний-партнёров</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="structure-section structure-section-alt" id="board">
        <div className="container">
          <div className="section-header-left">
            <span className="section-tag">Руководство</span>
            <h2>Состав членов Правления</h2>
          </div>
          <div className="board-grid">
            {boardMembers.map((member) => (
              <div key={member.id} className="board-card">
                <div className="board-photo">
                  <div className="placeholder-photo">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="board-info">
                  <span className="board-position">{member.position}</span>
                  <h3>{member.name}</h3>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Union Members Section */}
      <section className="structure-section" id="members">
        <div className="container">
          <div className="section-header-left">
            <span className="section-tag">Участники</span>
            <h2>Члены Союза</h2>
          </div>
          <div className="members-grid">
            {unionMembers.map((member) => (
              <div key={member.id} className="member-card">
                <div className="member-icon">{Icons.building()}</div>
                <div className="member-info">
                  <span className="member-type">{member.type}</span>
                  <h4>{member.name}</h4>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Structure;
