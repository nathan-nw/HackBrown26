import React from 'react';

interface CoherenceBarProps {
  leftName: string;
  rightName: string;
  leftScore: number;
  rightScore: number;
}

export const CoherenceBar: React.FC<CoherenceBarProps> = ({ leftName, rightName, leftScore, rightScore }) => {
  const total = leftScore + rightScore;
  const leftPercent = Math.round((leftScore / total) * 100);
  const rightPercent = 100 - leftPercent;

  return (
    <div className="flex-1 w-full max-w-sm bg-white p-8 rounded-lg border border-border-refined shadow-inner" style={{ padding: '32px', border: '1px solid var(--csc-border-refined)', backgroundColor: 'white', borderRadius: '8px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '20px', fontFamily: 'var(--font-sans)' }}>
        <span style={{ color: 'var(--csc-muted-text)' }}>{leftName}</span>
        <span style={{ color: 'var(--csc-primary)' }}>{rightName}</span>
      </div>
      
      <div style={{ position: 'relative', height: '10px', backgroundColor: '#F3F3F3', borderRadius: '999px', overflow: 'hidden', display: 'flex' }}>
        <div style={{ height: '100%', backgroundColor: 'rgba(90, 102, 96, 0.2)', width: `${leftPercent}%` }}></div>
        <div style={{ height: '100%', backgroundColor: 'var(--csc-primary)', width: `${rightPercent}%` }}></div>
        {/* Divider Tick */}
        <div style={{ position: 'absolute', left: `${leftPercent}%`, top: 0, bottom: 0, width: '2px', backgroundColor: 'white', zIndex: 10 }}></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '24px', color: 'var(--csc-forest)' }}>
        <span style={{ opacity: 0.6 }}>{leftPercent}%</span>
        <span style={{ color: 'var(--csc-primary)' }}>{rightPercent}%</span>
      </div>
    </div>
  );
};
