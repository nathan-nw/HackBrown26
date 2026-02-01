import { MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { PortfolioItem } from '../../data/mockPortfolio';

interface PortfolioCardProps {
  item: PortfolioItem;
}

export const PortfolioCard = ({ item }: PortfolioCardProps) => {
  const navigate = useNavigate();

  const getRiskClass = (risk: string) => {
    switch (risk) {
      case 'Low': return 'risk-low';
      case 'Medium': return 'risk-medium';
      case 'High': return 'risk-high';
      default: return '';
    }
  };

  return (
    <div 
      className="portfolio-card" 
      onClick={() => navigate('/planning')}
    >
      <div className="card-top-accent"></div>
      
      <div className="card-header">
        <div>
          <div className="card-category">{item.category}</div>
          <h3 className="card-title">{item.title}</h3>
        </div>
        <button className="icon-btn" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal size={20} />
        </button>
      </div>

      <p className="card-description">{item.description}</p>

      <div className="wedge-box">
        <div className="wedge-triangle"></div>
        <div>
          <span className="wedge-label">{item.wedgeLabel}</span>
          <div className="wedge-value">{item.wedgeValue}</div>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-group">
          <span className="stat-label">STRATEGIC FIT</span>
          <span className="fit-score">{item.strategicFit}/100</span>
        </div>
        <div className="stat-group">
          <span className="stat-label">MARKET RISK</span>
          <span className={`risk-badge ${getRiskClass(item.marketRisk)}`}>{item.marketRisk}</span>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span>Validation Progress</span>
          <span>{item.validationProgress}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${item.validationProgress}%` }}></div>
        </div>
      </div>
    </div>
  );
};
