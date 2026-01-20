import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Design3 from './designs/Design3';
import About from './pages/About';
import Seminars from './pages/Seminars';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Design3 />} />
        <Route path="/about" element={<About />} />
        <Route path="/seminars" element={<Seminars />} />
      </Routes>
    </Router>
  );
}

export default App;
