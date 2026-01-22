import { useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { organizationInfo } from '../../data/content';
import './styles.css';

// Icons
const Icons = {
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

// Navigation configuration with submenus
const navConfig = [
  {
    id: 'about',
    label: 'О Союзе',
    href: '/about',
    isRoute: true,
    submenu: [
      { id: 'goals', label: 'Цели и задачи', anchor: 'goals' },
      { id: 'authority', label: 'Полномочия', anchor: 'authority' },
      { id: 'documents', label: 'Документы', anchor: 'documents' },
      { id: 'join', label: 'Вступить в Союз', anchor: 'join' }
    ]
  },
  {
    id: 'structure',
    label: 'Структура ОМОР',
    href: '/structure',
    isRoute: true,
    submenu: null, // No dropdown in top bar, only sidebar on page
    sidebarMenu: [
      { id: 'overview', label: 'Общая картинка', anchor: 'overview' },
      { id: 'board', label: 'Состав членов Правления', anchor: 'board' },
      { id: 'members', label: 'Члены Союза', anchor: 'members' }
    ]
  },
  {
    id: 'events',
    label: 'Мероприятия ОМОР',
    href: '/events',
    isRoute: true,
    submenu: null
  },
  {
    id: 'news',
    label: 'Новости',
    href: '/#news',
    isRoute: false,
    submenu: null
  },
  {
    id: 'spk',
    label: 'СПК',
    href: 'https://soveteco.ru/?ysclid=mkp3f4mj2m139360438',
    isRoute: false,
    isExternal: true,
    submenu: null
  },
  {
    id: 'contacts',
    label: 'Контакты',
    href: '/#contacts',
    isRoute: false,
    submenu: null
  }
];

function Navbar({ showSidebar = false, sidebarItems = [], currentSection = '', onSidebarItemClick = null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const timeoutRef = useRef(null);

  const handleMouseEnter = (id) => {
    // Clear any pending close timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    // Delay closing to allow moving to submenu bar
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const scrollToSection = (anchor) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Main Header */}
      <header className="navbar-header">
        <div className="container">
          <div className="navbar-content">
            <Link
              to="/"
              className="navbar-logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img src={logo} alt={organizationInfo.name} />
            </Link>

            <nav className={`navbar-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
              <ul className="navbar-list">
                {navConfig.map((item) => (
                  <li
                    key={item.id}
                    className={`navbar-item ${item.submenu ? 'has-dropdown' : ''}`}
                    onMouseEnter={() => item.submenu && handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="navbar-link"
                      >
                        {item.label}
                      </a>
                    ) : item.isRoute ? (
                      <NavLink
                        to={item.href}
                        className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                      >
                        {item.label}
                        {item.submenu && <span className="dropdown-icon">{Icons.chevronDown()}</span>}
                      </NavLink>
                    ) : (
                      <a href={item.href} className="navbar-link">
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="navbar-actions">
              <button
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? Icons.close() : Icons.menu()}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Navbar for Dropdown (full width under main nav) */}
        {activeDropdown && navConfig.find(item => item.id === activeDropdown)?.submenu && (
          <div
            className="navbar-submenu-bar"
            onMouseEnter={() => handleMouseEnter(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container">
              <div className="submenu-links">
                {navConfig.find(item => item.id === activeDropdown).submenu.map((subitem) => (
                  <a
                    key={subitem.id}
                    href={`${navConfig.find(item => item.id === activeDropdown).href}#${subitem.anchor}`}
                    className="submenu-link"
                    onClick={(e) => {
                      const parentItem = navConfig.find(item => item.id === activeDropdown);
                      if (location.pathname === parentItem.href) {
                        e.preventDefault();
                        scrollToSection(subitem.anchor);
                      }
                    }}
                  >
                    {subitem.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Page Sidebar */}
      {showSidebar && sidebarItems.length > 0 && (
        <aside className="page-sidebar">
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.anchor}`}
                    className={`sidebar-link ${currentSection === item.anchor ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onSidebarItemClick) {
                        onSidebarItemClick(item.anchor);
                      } else {
                        scrollToSection(item.anchor);
                      }
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
}

export { navConfig };
export default Navbar;
