import { useParams } from 'react-router-dom';
import { useState } from 'react';
import '../styles/theme.css';
import '../styles/layout.css';
import { TopNav } from '../components/TopNav';
import { InsightsPanel } from '../components/InsightsPanel';
import { CanvasBoard } from '../components/CanvasBoard';

export const CanvasPage = () => {
  const { ideaId } = useParams();
  const [isInsightsOpen, setIsInsightsOpen] = useState(true);

  return (
    <div 
      className="app-layout" 
      style={{ 
        gridTemplateColumns: `1fr ${isInsightsOpen ? 'var(--insights-width)' : '50px'}`,
        gridTemplateAreas: `
          "nav nav"
          "canvas insights"
        `
      }}
    >
      <TopNav />
      <CanvasBoard ideaId={ideaId} />
      <InsightsPanel isOpen={isInsightsOpen} onToggle={() => setIsInsightsOpen(!isInsightsOpen)} />
    </div>
  );
};
