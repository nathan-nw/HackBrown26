import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { CanvasPage } from './pages/CanvasPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { CaseStudyComparison } from './pages/CaseStudyComparison/CaseStudyComparison';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/comparison/new" element={<CaseStudyComparison />} />
            <Route path="/planning/:ideaId" element={<CanvasPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
