import '../styles/components.css';
import '../styles/layout.css';

export const InsightsPanel = () => {
  return (
    <aside className="insights-panel">
      <div className="insight-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3>Risk Analysis</h3>
          <button 
            className="btn btn-primary" 
            style={{ fontSize: '10px', padding: '4px 8px' }}
            onClick={() => alert("Generating Risk Analysis...")}
          >
            Generate
          </button>
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
