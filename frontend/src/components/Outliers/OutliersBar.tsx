import { useState, useEffect } from 'react';
import type { OutlierCompany } from '../../types';
import '../../styles/outliers.css';

interface OutliersBarProps {
  onSelect: (company: OutlierCompany) => void;
}

export const OutliersBar = ({ onSelect }: OutliersBarProps) => {
  const [outliers, setOutliers] = useState<OutlierCompany[]>([]);

  useEffect(() => {
    const fetchOutliers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/outliers`);
        if (response.ok) {
          const data = await response.json();
          setOutliers(data);
        }
      } catch (error) {
        console.error('Failed to fetch outliers:', error);
      }
    };
    fetchOutliers();
  }, []);

  return (
    <div className="outliers-section">
      <div className="outliers-header-row">
        <span className="outliers-label">Sequoia Outliers</span>
        <div className="outliers-divider"></div>
      </div>
      
      <div className="outliers-scroll-row">
        {outliers.map(company => (
          <button 
            key={company.id} 
            className="outlier-chip" 
            onClick={() => onSelect(company)}
          >
            <div 
              className="outlier-chip-icon"
              dangerouslySetInnerHTML={{ __html: company.iconSvg }} 
            />
            <span className="outlier-chip-text">{company.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
