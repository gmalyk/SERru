import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { organizationInfo } from '../../data/content';
import { getBoardMembers, getUnionMembers } from '../../api/structure.js';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './styles.css';

// Sidebar items for Structure page
const sidebarItems = [
  { id: 'board', label: 'Состав членов Правления', anchor: 'board' },
  { id: 'members', label: 'Члены Союза', anchor: 'members' }
];

// Icons
const Icons = {
  arrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12,19 5,12 12,5" />
    </svg>
  ),
  users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  building: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21h18" />
      <path d="M9 21V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v15" />
      <path d="M9 9h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  ),
  // Org chart icons
  assembly: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="5" r="3" />
      <circle cx="5" cy="19" r="3" />
      <circle cx="12" cy="19" r="3" />
      <circle cx="19" cy="19" r="3" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="12" y1="12" x2="5" y2="16" />
      <line x1="12" y1="12" x2="19" y2="16" />
    </svg>
  ),
  audit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  board: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  president: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
    </svg>
  ),
  vicePresident: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="5" />
      <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
    </svg>
  ),
  director: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  directorate: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
};

function Structure() {
  const [currentSection, setCurrentSection] = useState('overview');
  const [boardMembers, setBoardMembers] = useState([]);
  const [unionMembers, setUnionMembers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getBoardMembers().then(setBoardMembers).catch(console.error);
    getUnionMembers().then(setUnionMembers).catch(console.error);
  }, []);

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

      {/* Overview Section with Org Chart */}
      <section className="structure-section" id="overview">
        <div className="container">

          <div className="overview-intro">
            <p>
              Союз Экологов России (ОМОР) — это общероссийское межотраслевое объединение
              работодателей в сфере экологии и природопользования, созданное в 2023 году.
              Структура организации обеспечивает эффективное управление и представительство
              интересов членов Союза.
            </p>
          </div>

          {/* Organizational Chart */}
          <div className="org-chart">
            {/* Level 1: General Assembly + Audit Commission */}
            <div className="org-level org-level-1">
              <div className="org-box org-box-primary">
                <div className="org-box-icon">{Icons.assembly()}</div>
                <div className="org-box-content">
                  <span className="org-box-title">Общее собрание</span>
                  <span className="org-box-subtitle">ОМОР Союз Экологов России</span>
                </div>
              </div>
              <div className="org-horizontal-connector"></div>
              <div className="org-box org-box-secondary">
                <div className="org-box-icon">{Icons.audit()}</div>
                <div className="org-box-content">
                  <span className="org-box-title">Контрольно-ревизионная</span>
                  <span className="org-box-subtitle">комиссия</span>
                </div>
              </div>
            </div>

            {/* Connector Line */}
            <div className="org-connector">
              <div className="org-line-vertical"></div>
              <div className="org-arrow-down"></div>
            </div>

            {/* Level 2: Board */}
            <div className="org-level org-level-2">
              <div className="org-box org-box-board">
                <div className="org-box-icon">{Icons.board()}</div>
                <div className="org-box-content">
                  <span className="org-box-title">Правление</span>
                  <span className="org-box-subtitle">ОМОР Союз Экологов России</span>
                </div>
              </div>
            </div>

            {/* Connector with split */}
            <div className="org-connector org-connector-split">
              <div className="org-line-vertical"></div>
              <div className="org-split-horizontal"></div>
            </div>

            {/* Level 3: President + Vice President */}
            <div className="org-level org-level-3">
              <div className="org-box org-box-executive">
                <div className="org-box-icon">{Icons.president()}</div>
                <div className="org-box-content">
                  <span className="org-box-title">Президент</span>
                  <span className="org-box-subtitle">ОМОР Союз Экологов</span>
                </div>
              </div>
              <div className="org-double-arrow">
                <span></span>
                <span></span>
              </div>
              <div className="org-box org-box-executive">
                <div className="org-box-icon">{Icons.vicePresident()}</div>
                <div className="org-box-content">
                  <span className="org-box-title">Вице-президент</span>
                  <span className="org-box-subtitle">ОМОР Союз Экологов</span>
                </div>
              </div>
            </div>

            {/* Connector from President */}
            <div className="org-connector org-connector-merge">
              <div className="org-merge-horizontal"></div>
              <div className="org-line-vertical"></div>
              <div className="org-arrow-down"></div>
            </div>

            {/* Level 4: General Director */}
            <div className="org-level org-level-4">
              <div className="org-box org-box-director">
                <div className="org-box-icon">{Icons.director()}</div>
                <div className="org-box-content">
                  <span className="org-box-title">Генеральный директор</span>
                  <span className="org-box-subtitle">ОМОР Союз Экологов</span>
                </div>
              </div>
            </div>

            {/* Connector Line */}
            <div className="org-connector">
              <div className="org-line-vertical"></div>
              <div className="org-arrow-down"></div>
            </div>

            {/* Level 5: Directorate */}
            <div className="org-level org-level-5">
              <div className="org-box org-box-directorate">
                <div className="org-box-icon">{Icons.directorate()}</div>
                <div className="org-box-content">
                  <span className="org-box-title">Дирекция</span>
                  <span className="org-box-subtitle">ОМОР Союз Экологов</span>
                </div>
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
          <div className="board-list">
            {boardMembers.map((member) => (
              <div key={member.id} className="board-list-item">
                <h3>{member.name}</h3>
                <p>{member.position}</p>
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
          <div className="members-list">
            {unionMembers.map((member, index) => (
              <div key={member.id} className="member-list-item">
                <div className="member-list-header">
                  <span className="member-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{member.name}</h3>
                </div>
                <div className="member-list-details">
                  <div className="member-detail">
                    <span className="detail-label">Адрес</span>
                    <span className="detail-value">{member.address}</span>
                  </div>
                  <div className="member-detail">
                    <span className="detail-label">ОГРН</span>
                    <span className="detail-value">{member.ogrn}</span>
                  </div>
                  {member.website && (
                    <div className="member-detail">
                      <span className="detail-label">Сайт</span>
                      <a
                        href={member.website.startsWith('http') ? member.website : `https://${member.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-value detail-link"
                      >
                        {member.website}
                      </a>
                    </div>
                  )}
                  <div className="member-detail member-detail-director">
                    <span className="detail-label">{member.position}</span>
                    <span className="detail-value detail-director">{member.director}</span>
                  </div>
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
