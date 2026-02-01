import { mockOutliers } from '../../data/mockOutliers';
import type { OutlierCompany } from '../../data/mockOutliers';
import '../../styles/outliers.css';

interface OutliersBarProps {
  onSelect: (company: OutlierCompany) => void;
}

export const OutliersBar = ({ onSelect }: OutliersBarProps) => {
  return (
    <div className="outliers-section">
      <div className="outliers-header-row">
        <span className="outliers-label">Sequoia Outliers</span>
        <div className="outliers-divider"></div>
      </div>
      
      <div className="outliers-scroll-row">
        {mockOutliers.map(company => (
          <button 
            key={company.id} 
            className="outlier-chip" 
            onClick={() => onSelect(company)}
          >
            <div 
              className="outlier-chip-icon"
              dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24">${company.iconSvg}</svg>` }} 
            />
            <span className="outlier-chip-text">{company.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
