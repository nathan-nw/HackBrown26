import React, { useState } from 'react';
import { MY_CASES, SEQUENTIAL_OUTLIERS } from '../../data/caseStudies';


interface CasePickerPanelProps {
  side: 'left' | 'right';
  selectedId: string | null;
  onSelect: (id: string) => void;
  otherSelectedId: string | null;
}

export const CasePickerPanel: React.FC<CasePickerPanelProps> = ({ side, selectedId, onSelect, otherSelectedId }) => {
  const [activeTab, setActiveTab] = useState<'MY_CASES' | 'OUTLIERS'>('MY_CASES');
  const [searchQuery, setSearchQuery] = useState('');

  const list = activeTab === 'MY_CASES' ? MY_CASES : SEQUENTIAL_OUTLIERS;
  
  const filteredList = list.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
    c.id !== otherSelectedId // Optional: exclude already selected on other side? Maybe fine to compare same? References imply comparison of 2 diff things usually.
  );

  return (
    <div className="csc-selection-panel">
      <h3 className="csc-font-display csc-italic" style={{ fontSize: '24px', marginBottom: '24px' }}>
        Select {side} case
      </h3>

      <input 
        type="text" 
        placeholder="Search cases..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ 
          width: '100%', 
          padding: '12px', 
          marginBottom: '24px', 
          border: '1px solid var(--csc-border-refined)', 
          borderRadius: '4px',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px'
        }}
      />

      <div className="csc-tabs">
        <button 
          className={`csc-tab ${activeTab === 'MY_CASES' ? 'active' : ''}`}
          onClick={() => setActiveTab('MY_CASES')}
        >
          My Cases
        </button>
        <button 
          className={`csc-tab ${activeTab === 'OUTLIERS' ? 'active' : ''}`}
          onClick={() => setActiveTab('OUTLIERS')}
        >
          Sequential Outliers
        </button>
      </div>

      <div className="csc-card-list">
        {filteredList.map(item => (
          <div 
            key={item.id} 
            className={`csc-card-item ${selectedId === item.id ? 'selected' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '16px' }}>{item.name}</span>
              <span style={{ 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                padding: '2px 6px', 
                border: '1px solid #E5E1D8', 
                borderRadius: '4px', 
                color: '#5A6660' 
              }}>
                {item.stage}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#5A6660', margin: 0, lineHeight: 1.4 }}>
              {item.description}
            </p>
          </div>
        ))}
        {filteredList.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
            No cases found.
          </div>
        )}
      </div>

      {selectedId && (
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
           <button 
             onClick={(e) => { e.stopPropagation(); onSelect(''); }} // Hacky way to allow clear if needed, but UI flow might just replace
             style={{ fontSize: '12px', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
           >
             Clear Selection
           </button>
        </div>
      )}
    </div>
  );
};
