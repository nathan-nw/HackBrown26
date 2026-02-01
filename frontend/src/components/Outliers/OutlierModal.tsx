import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import type { OutlierCompany } from '../../data/mockOutliers';
import { PortfolioCard } from '../Portfolio/PortfolioCard';
import '../../styles/outliers.css';

interface OutlierModalProps {
  isOpen: boolean;
  company: OutlierCompany | null;
  onClose: () => void;
}

export const OutlierModal = ({ isOpen, company, onClose }: OutlierModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Esc key and scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Click outside
  const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
          onClose();
      }
  };

  if (!isOpen || !company) return null;

  return (
    <div className="outlier-modal-overlay" onClick={handleOverlayClick}>
      <div className="outlier-modal-content" ref={modalRef}>
        
        <div className="outlier-modal-header">
            <div className="outlier-modal-title-group">
                <h2 className="outlier-modal-title">
                    <div 
                        style={{ width: 24, height: 24, fill: '#1A1A1A' }}
                        dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24">${company.iconSvg}</svg>` }} 
                    />
                    {company.name}
                    <span className="outlier-modal-badge">Sequoia Outlier</span>
                </h2>
                <span className="outlier-modal-subtitle">A snapshot of their early decisions</span>
            </div>
            
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} color="#64748B" />
            </button>
        </div>

        <div className="outlier-modal-body">
            <div className="outlier-modal-grid">
                {company.items.map(item => (
                    // We modify generic cards to non-clickable in modal context
                    <PortfolioCard 
                        key={item.id} 
                        item={item} 
                        onClick={() => {}} // No-op, prevent navigation
                    />
                ))}
            </div>
        </div>

        <div className="outlier-modal-footer">
            <button className="btn-secondary" onClick={onClose}>Close</button>
            <button className="btn-secondary" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>View Canvas</button>
        </div>
      </div>
    </div>
  );
};
