import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { CanvasPage } from './pages/CanvasPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/planning" element={<CanvasPage />} />
      </Routes>
    </Router>
  );
}

export default App;
