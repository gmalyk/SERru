import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './styles.css';

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// PDF imports
import pdfPrikaz from '../../assets/Приказ_о_вступлении_в_должность_Тюрин_В_А_.pdf';
import pdfRekvizity from '../../assets/Реквизиты ОМОР СЭР.pdf';

// Note: Additional PDFs should be added to assets folder:
// - НОВЫЙ-УСТАВ-СЭР-2025-1.pdf (for ustav)
// - polozhenie-o-chlenstve-v-omor-sjer-dlja-sajta-ot-10.10.2023-3.pdf (for membership)
// - perechen-dokumentov-dlja-vstuplenija-v-omor.pdf (for perechen)

// Document mapping
const documentsMap = {
  'prikaz': {
    file: pdfPrikaz,
    title: 'Приказ о вступлении в должность Тюрин В.А.'
  },
  'rekvizity': {
    file: pdfRekvizity,
    title: 'Карточка ОМОР «Союз Экологов России»'
  },
  // Placeholder entries - files need to be added to assets
  'ustav': {
    file: null, // Add: import pdfUstav from '../../assets/НОВЫЙ-УСТАВ-СЭР-2025-1.pdf';
    title: 'Устав ОМОР «Союз Экологов России»'
  },
  'membership': {
    file: null, // Add: import pdfMembership from '../../assets/polozhenie-o-chlenstve-v-omor-sjer-dlja-sajta-ot-10.10.2023-3.pdf';
    title: 'Положение о членстве в ОМОР «Союз Экологов России»'
  },
  'perechen': {
    file: null, // Add: import pdfPerechen from '../../assets/perechen-dokumentov-dlja-vstuplenija-v-omor.pdf';
    title: 'Перечень документов для вступления в ОМОР'
  }
};

// Icons
const Icons = {
  arrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12,19 5,12 12,5"/>
    </svg>
  ),
  zoomIn: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  ),
  zoomOut: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  ),
  chevronLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15,18 9,12 15,6"/>
    </svg>
  ),
  chevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,6 15,12 9,18"/>
    </svg>
  )
};

function DocumentViewer() {
  const [searchParams] = useSearchParams();
  const docId = searchParams.get('doc');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  const currentDoc = documentsMap[docId] ||
    (docId && docId.includes('/') ? { file: `/api/files/${docId}`, title: '' } : null);

  // Disable right-click context menu
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    window.document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages || 1));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.5));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.6));
  };

  if (!currentDoc) {
    return (
      <div className="viewer-page">
        <div className="viewer-error">
          <h2>Документ не найден</h2>
          <Link to="/about#documents" className="back-btn">
            {Icons.arrowLeft()}
            <span>Вернуться к документам</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!currentDoc.file) {
    return (
      <div className="viewer-page">
        <div className="viewer-error">
          <h2>{currentDoc.title}</h2>
          <p style={{ color: '#616161', marginBottom: '20px' }}>Документ временно недоступен</p>
          <Link to="/about#documents" className="back-btn">
            {Icons.arrowLeft()}
            <span>Вернуться к документам</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="viewer-page">
      {/* Header */}
      <header className="viewer-header">
        <Link to="/about#documents" className="back-btn">
          {Icons.arrowLeft()}
          <span>Назад</span>
        </Link>
        <h1>{currentDoc.title}</h1>
        <div className="viewer-controls">
          <button onClick={zoomOut} className="control-btn" title="Уменьшить">
            {Icons.zoomOut()}
          </button>
          <span className="zoom-level">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="control-btn" title="Увеличить">
            {Icons.zoomIn()}
          </button>
        </div>
      </header>

      {/* PDF Viewer */}
      <div className="viewer-container">
        <Document
          file={currentDoc.file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="loading">Загрузка документа...</div>}
          error={<div className="error">Ошибка загрузки документа</div>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      {/* Page Navigation */}
      {numPages && numPages > 1 && (
        <div className="page-navigation">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="nav-btn"
          >
            {Icons.chevronLeft()}
          </button>
          <span className="page-info">
            {pageNumber} / {numPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="nav-btn"
          >
            {Icons.chevronRight()}
          </button>
        </div>
      )}
    </div>
  );
}

export default DocumentViewer;
