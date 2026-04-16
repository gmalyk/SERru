import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Design3 from './designs/Design3';
import About from './pages/About';
import Structure from './pages/Structure';
import Events from './pages/Events';
import DocumentViewer from './pages/DocumentViewer';
import NewsDetail from './pages/NewsDetail';
import WebinarEcoControl2026 from './pages/WebinarDetail';
import WebinarWaste2026 from './pages/WebinarWaste2026';
import WebinarLabSupport2026 from './pages/WebinarLabSupport2026';
import WebinarDynamic from './pages/WebinarDynamic';

// Lazy-loaded admin pages (not downloaded by public users)
const AdminLogin = lazy(() => import('./pages/Admin/Login'));
const AdminLayout = lazy(() => import('./pages/Admin'));
const NewsList = lazy(() => import('./pages/Admin/NewsList'));
const NewsForm = lazy(() => import('./pages/Admin/NewsForm'));
const EventsList = lazy(() => import('./pages/Admin/EventsList'));
const EventForm = lazy(() => import('./pages/Admin/EventForm'));
const CarouselList = lazy(() => import('./pages/Admin/CarouselList'));
const CarouselForm = lazy(() => import('./pages/Admin/CarouselForm'));
const WebinarsList = lazy(() => import('./pages/Admin/WebinarsList'));
const WebinarForm = lazy(() => import('./pages/Admin/WebinarForm'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Загрузка...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Design3 />} />
          <Route path="/about" element={<About />} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/events" element={<Events />} />
          <Route path="/document" element={<DocumentViewer />} />
          <Route path="/news/:id" element={<NewsDetail />} />

          {/* Hardcoded webinar pages (kept for backward compat, will be replaced by dynamic) */}
          <Route path="/webinar/eco-control-2026" element={<WebinarEcoControl2026 />} />
          <Route path="/webinar/waste-management-2026" element={<WebinarWaste2026 />} />
          <Route path="/webinar/lab-support-2026" element={<WebinarLabSupport2026 />} />

          {/* Dynamic webinar page (for new webinars added via admin) */}
          <Route path="/webinar/:slug" element={<WebinarDynamic />} />

          {/* Redirect old seminars path to events */}
          <Route path="/seminars" element={<Events />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="news" element={<NewsList />} />
            <Route path="news/new" element={<NewsForm />} />
            <Route path="news/:id/edit" element={<NewsForm />} />
            <Route path="events" element={<EventsList />} />
            <Route path="events/new" element={<EventForm />} />
            <Route path="events/:id/edit" element={<EventForm />} />
            <Route path="carousel" element={<CarouselList />} />
            <Route path="carousel/new" element={<CarouselForm />} />
            <Route path="carousel/:id/edit" element={<CarouselForm />} />
            <Route path="webinars" element={<WebinarsList />} />
            <Route path="webinars/new" element={<WebinarForm />} />
            <Route path="webinars/:slug/edit" element={<WebinarForm />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
