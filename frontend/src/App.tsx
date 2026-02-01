import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { CanvasPage } from './pages/CanvasPage';
import { PortfolioPage } from './pages/PortfolioPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/planning/:ideaId" element={<CanvasPage />} />
      </Routes>
    </Router>
  );
}

export default App;
