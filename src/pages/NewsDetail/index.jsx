import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { news } from '../../data/content';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './styles.css';

// Icons
const Icons = {
  arrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12,19 5,12 12,5" />
    </svg>
  ),
  calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  externalLink: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
};

function NewsDetail() {
  const { id } = useParams();
  const newsItem = news.find(item => item.id === parseInt(id));

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Redirect to home if news item not found
  if (!newsItem) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="news-detail-page">
      <Navbar />

      {/* Back Button */}
      <section className="back-section">
        <div className="container">
          <Link to="/#news" className="back-link">
            {Icons.arrowLeft()}
            <span>Назад к новостям</span>
          </Link>
        </div>
      </section>

      {/* News Content */}
      <section className="news-detail-section">
        <div className="container">
          <article className="news-article">
            <div className="news-article-header">
              <span className="news-category">{newsItem.category}</span>
              {newsItem.date && (
                <span className="news-date">
                  {Icons.calendar()}
                  {newsItem.date}
                </span>
              )}
            </div>

            {newsItem.image && (
              <div className="news-article-image">
                <img src={newsItem.image} alt={newsItem.title} />
              </div>
            )}

            <h1>{newsItem.title}</h1>

            <div className="news-article-content">
              {newsItem.excerpt.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {newsItem.link && (
              <div className="news-article-footer">
                <a
                  href={newsItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="telegram-link"
                >
                  {Icons.externalLink()}
                  <span>Читать в Telegram</span>
                </a>
              </div>
            )}
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default NewsDetail;
