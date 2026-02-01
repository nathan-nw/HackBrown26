import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './ui/Button';
import '../styles/components.css';
import '../styles/layout.css';

interface InsightsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const InsightsPanel = ({ isOpen, onToggle }: InsightsPanelProps) => {
  if (!isOpen) {
    return (
      <aside className="insights-panel" style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button variant="icon" onClick={onToggle} title="Expand Insights"><ChevronLeft size={20} /></Button>
        <div style={{ writingMode: 'vertical-rl', marginTop: '20px', letterSpacing: '2px', color: 'var(--text-secondary)', fontSize: '12px' }}>INSIGHTS</div>
      </aside>
    );
  }

  return (
    <aside className="insights-panel">
      <div className="insight-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3>Risk Analysis</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="btn btn-primary" 
              style={{ fontSize: '10px', padding: '4px 8px' }}
              onClick={() => alert("Generating Risk Analysis...")}
            >
              Generate
            </button>
            <Button variant="icon" onClick={onToggle} title="Minimize"><ChevronRight size={18} /></Button>
          </div>
        </div>
        <div className="insight-card">
          <h4>Market Adoption</h4>
          <p>High risk. Competitors are moving fast. Recommend focusing on niche initial users.</p>
        </div>
        <div className="insight-card">
          <h4>Technical Feasibility</h4>
          <p>Low risk. Core technology is proven.</p>
        </div>
      </div>

      <div className="insight-section">
        <h3>Opportunities</h3>
        <div className="insight-card">
          <h4>Partnership</h4>
          <p>Potential API integration with major player.</p>
        </div>
      </div>
    </aside>
  );
};
