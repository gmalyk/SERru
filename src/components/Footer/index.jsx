import { Link } from 'react-router-dom';
import { organizationInfo, footerLinks } from '../../data/content';
import logo from '../../assets/logo.png';
import partner1 from '../../assets/partner1-removebg-preview.png';
import partner2 from '../../assets/partner2-removebg-preview.png';
import partner3 from '../../assets/partner3-removebg-preview.png';
import './styles.css';

const partners = [
  { logo: partner1, link: 'http://government.ru/department/403/events/', name: 'Минприроды России' },
  { logo: partner2, link: 'https://mintrud.gov.ru/?ysclid=loetpuhrk202056609', name: 'Минтруд России' },
  { logo: partner3, link: 'https://rpn.gov.ru/', name: 'Росприроднадзор' }
];

const Icons = {
  telegram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
};

// Helper to determine if link is external
const isExternalLink = (href) => href.startsWith('http') || href.startsWith('mailto:');

// Render link using Link for internal routes, <a> for external
const FooterLink = ({ href, children }) => {
  if (isExternalLink(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
  }
  return <Link to={href}>{children}</Link>;
};

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/">
              <img src={logo} alt={organizationInfo.name} className="footer-logo" />
            </Link>
            <p>{organizationInfo.fullName}</p>
            <div className="footer-registration">
              <span>ОГРН: {organizationInfo.registration.ogrn}</span>
              <span>ИНН: {organizationInfo.registration.inn}</span>
            </div>
          </div>

          <div className="footer-links">
            {footerLinks.map((column, idx) => (
              <div key={idx} className="footer-column">
                {column.href ? (
                  <h4><FooterLink href={column.href}>{column.title}</FooterLink></h4>
                ) : (
                  <h4>{column.title}</h4>
                )}
                {column.links.length > 0 && (
                  <ul>
                    {column.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <FooterLink href={link.href}>{link.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-partners">
          {partners.map((partner, idx) => (
            <a
              key={idx}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-logo-link"
            >
              <img src={partner.logo} alt={partner.name} className="partner-footer-logo" />
            </a>
          ))}
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 {organizationInfo.name}. Все права защищены.</p>
          <a href="https://t.me/omoreco" target="_blank" rel="noopener noreferrer" className="social-link">
            {Icons.telegram()}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
