import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Design3 from './designs/Design3';
import About from './pages/About';
import Structure from './pages/Structure';
import Events from './pages/Events';
import DocumentViewer from './pages/DocumentViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Design3 />} />
        <Route path="/about" element={<About />} />
        <Route path="/structure" element={<Structure />} />
        <Route path="/events" element={<Events />} />
        <Route path="/document" element={<DocumentViewer />} />
        {/* Redirect old seminars path to events */}
        <Route path="/seminars" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
