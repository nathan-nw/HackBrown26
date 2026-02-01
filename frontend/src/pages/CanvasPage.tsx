import { useState } from 'react';
import '../styles/theme.css';
import '../styles/layout.css';
import { TopNav } from '../components/TopNav';
import { LeftToolbar } from '../components/LeftToolbar';
import { InsightsPanel } from '../components/InsightsPanel';
import { CanvasBoard } from '../components/CanvasBoard';

export const CanvasPage = () => {
  const [isInsightsOpen, setIsInsightsOpen] = useState(true);

  return (
    <div 
      className="app-layout" 
      style={{ 
        gridTemplateColumns: `var(--toolbar-width) 1fr ${isInsightsOpen ? 'var(--insights-width)' : '50px'}` 
      }}
    >
      <TopNav />
      <LeftToolbar />
      <CanvasBoard />
      <InsightsPanel isOpen={isInsightsOpen} onToggle={() => setIsInsightsOpen(!isInsightsOpen)} />
    </div>
  );
};
