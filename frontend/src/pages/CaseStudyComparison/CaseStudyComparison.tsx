import { useState } from 'react';
import { Box, Share } from 'lucide-react'; // Stub icons
import './CaseStudyComparison.css';
import { CasePickerPanel } from '../../components/CasePickerPanel/CasePickerPanel';
import { RadarChart } from '../../components/RadarChart/RadarChart';
import { CoherenceBar } from '../../components/CoherenceBar/CoherenceBar';
import { MY_CASES, SEQUENTIAL_OUTLIERS } from '../../data/caseStudies';
import { TopNav } from '../../components/TopNav';

export const CaseStudyComparison = () => {
  const [leftCaseId, setLeftCaseId] = useState<string | null>(null);
  const [rightCaseId, setRightCaseId] = useState<string | null>(null);

  // Helper to find case by ID
  const findCase = (id: string | null) => {
    if (!id) return null;
    return [...MY_CASES, ...SEQUENTIAL_OUTLIERS].find(c => c.id === id);
  };

  const leftCase = findCase(leftCaseId);
  const rightCase = findCase(rightCaseId);

  const isComplete = leftCaseId && rightCaseId;

  const handleExport = () => {
    alert("Export Report feature coming soon!");
  };

  return (
    <div className="csc-page-container">
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
         <TopNav />
      </div>
      
      <div className="csc-container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        
        {/* State A: Selection View */}
        {!isComplete && (
          <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="csc-font-display csc-italic" style={{ fontSize: '48px', color: 'var(--csc-forest)' }}>
                   Start Case Study
                </h1>
                <p style={{ color: 'var(--csc-muted-text)' }}>Select two cases to evaluate strategic alignment.</p>
             </div>
             
             <div className="csc-selection-grid bg-white border border-border-refined rounded-xl overflow-hidden shadow-sm">
                <CasePickerPanel 
                  side="left" 
                  selectedId={leftCaseId} 
                  onSelect={setLeftCaseId} 
                  otherSelectedId={rightCaseId}
                />
                <CasePickerPanel 
                  side="right" 
                  selectedId={rightCaseId} 
                  onSelect={setRightCaseId} 
                  otherSelectedId={leftCaseId}
                />
             </div>
          </div>
        )}

        {/* State B: Comparison View */}
        {isComplete && leftCase && rightCase && (
           <div className="animate-in fade-in zoom-in-95 duration-500">
              
              {/* Reset/Back Button (Optional) */}
              <div style={{ marginBottom: '20px' }}>
                <button 
                  onClick={() => { setLeftCaseId(null); setRightCaseId(null); }}
                  style={{ fontSize: '12px', textDecoration: 'underline', color: 'var(--csc-muted-text)', background: 'none', border:'none', cursor:'pointer' }}
                >
                  &larr; Start Over
                </button>
              </div>

              {/* Title Section */}
              <div className="csc-header">
                 <div>
                    <p className="csc-font-sans csc-uppercase csc-tracking-widest" style={{ color: 'var(--csc-primary)', fontSize: '12px', fontWeight: 700, marginBottom: '16px' }}>
                       Portfolio Decision Engine
                    </p>
                    <h1 className="csc-font-display csc-italic" style={{ fontSize: '64px', lineHeight: 1.1, marginBottom: '16px' }}>
                       Strategic Evaluation
                    </h1>
                    <p className="csc-font-sans" style={{ fontSize: '18px', color: 'var(--csc-muted-text)' }}>
                       Direct methodology comparison: {leftCase.name} vs. {rightCase.name}
                    </p>
                 </div>
                 <button 
                   onClick={handleExport}
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     padding: '10px 20px', 
                     border: '1px solid var(--csc-border-refined)', 
                     borderRadius: '8px', 
                     background: 'white', 
                     color: 'var(--csc-forest)',
                     fontWeight: 700,
                     fontSize: '14px',
                     cursor: 'pointer'
                   }}
                 >
                   <Share size={18} />
                   Export Report
                 </button>
              </div>

              {/* Comparison Columns */}
              <div className="csc-comp-grid">
                 <div className="csc-comp-divider"></div>

                 {/* LEFT COLUMN */}
                 <div className="csc-column">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--csc-border-refined)', paddingBottom: '24px' }}>
                       <h2 className="csc-font-display csc-italic" style={{ fontSize: '36px' }}>{leftCase.name}</h2>
                       <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 8px', border: '1px solid var(--csc-border-refined)', borderRadius: '4px', background: 'white', color: 'var(--csc-muted-text)' }}>
                          {leftCase.stage}
                       </span>
                    </div>

                    <div className="csc-radar-card">
                       <p className="csc-font-sans csc-uppercase csc-tracking-widest" style={{ fontSize: '10px', color: 'var(--csc-muted-text)', marginBottom: '32px' }}>
                          Signal Intensity
                       </p>
                       <RadarChart metrics={leftCase.radar} color="#00854A" />
                    </div>

                    <div className="flex flex-col gap-6">
                       <h3 className="csc-font-display csc-italic" style={{ fontSize: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--csc-border-refined)' }}>
                          Core Strategy
                       </h3>
                       <div className="csc-strategy-card">
                          <p className="csc-font-sans csc-uppercase csc-tracking-widest" style={{ fontSize: '10px', color: 'var(--csc-muted-text)', marginBottom: '8px' }}>
                             Primary Wedge
                          </p>
                          <p className="csc-font-display csc-italic" style={{ fontSize: '24px', marginBottom: '12px' }}>
                             {leftCase.coreStrategy.primaryWedge.title}
                          </p>
                          <p style={{ fontSize: '14px', color: 'var(--csc-muted-text)', lineHeight: 1.6 }}>
                             {leftCase.coreStrategy.primaryWedge.description}
                          </p>
                       </div>
                       
                       {leftCase.coreStrategy.goToMarket && (
                          <div className="csc-strategy-card">
                             <p className="csc-font-sans csc-uppercase csc-tracking-widest" style={{ fontSize: '10px', color: 'var(--csc-muted-text)', marginBottom: '8px' }}>
                                Go-to-Market
                             </p>
                             <p className="csc-font-display csc-italic" style={{ fontSize: '24px' }}>
                                {leftCase.coreStrategy.goToMarket.title}
                             </p>
                             {leftCase.coreStrategy.goToMarket.description && (
                                <p style={{ fontSize: '14px', color: 'var(--csc-muted-text)', marginTop: '8px' }}>
                                   {leftCase.coreStrategy.goToMarket.description}
                                </p>
                             )}
                          </div>
                       )}
                    </div>
                    
                    <button style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid var(--csc-border-refined)', background: 'white', color: 'var(--csc-muted-text)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '18px', cursor: 'pointer', marginTop: 'auto' }}>
                       Deep Dive {leftCase.name}
                    </button>
                 </div>

                 {/* RIGHT COLUMN */}
                 <div className="csc-column">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--csc-border-refined)', paddingBottom: '24px' }}>
                       <h2 className="csc-font-display csc-italic" style={{ fontSize: '36px' }}>{rightCase.name}</h2>
                       <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 8px', border: '1px solid var(--csc-border-refined)', borderRadius: '4px', background: 'white', color: 'var(--csc-muted-text)' }}>
                          {rightCase.stage}
                       </span>
                    </div>

                    <div className="csc-radar-card">
                       <p className="csc-font-sans csc-uppercase csc-tracking-widest" style={{ fontSize: '10px', color: 'var(--csc-primary)', fontWeight: 700, marginBottom: '32px' }}>
                          Sequoia Signal
                       </p>
                       <RadarChart metrics={rightCase.radar} color="#00854A" />
                    </div>

                    <div className="flex flex-col gap-6">
                       <h3 className="csc-font-display csc-italic" style={{ fontSize: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--csc-border-refined)' }}>
                          Core Strategy
                       </h3>
                       
                       <div className="csc-strategy-card">
                          <p className="csc-font-sans csc-uppercase csc-tracking-widest" style={{ fontSize: '10px', color: 'var(--csc-muted-text)', marginBottom: '8px' }}>
                             Primary Wedge
                          </p>
                          <p className="csc-font-display csc-italic" style={{ fontSize: '24px', marginBottom: '12px' }}>
                             {rightCase.coreStrategy.primaryWedge.title}
                          </p>
                          <p style={{ fontSize: '14px', color: 'var(--csc-muted-text)', lineHeight: 1.6 }}>
                             {rightCase.coreStrategy.primaryWedge.description}
                          </p>
                       </div>

                       {rightCase.coreStrategy.pricingAdvantage && (
                          <div className={`csc-strategy-card ${rightCase.coreStrategy.pricingAdvantage.isWinner ? 'winner' : ''}`}>
                             {rightCase.coreStrategy.pricingAdvantage.isWinner && (
                                <div className="csc-winner-badge">Winner</div>
                             )}
                             <p className="csc-font-sans csc-uppercase csc-tracking-widest" style={{ fontSize: '10px', color: rightCase.coreStrategy.pricingAdvantage.isWinner ? 'var(--csc-primary)' : 'var(--csc-muted-text)', fontWeight: rightCase.coreStrategy.pricingAdvantage.isWinner ? 700 : 400, marginBottom: '8px' }}>
                                Pricing Advantage
                             </p>
                             <p className="csc-font-display csc-italic" style={{ fontSize: '24px' }}>
                                {rightCase.coreStrategy.pricingAdvantage.title}
                             </p>
                          </div>
                       )}
                    </div>
                    
                    <button style={{ width: '100%', padding: '16px', borderRadius: '8px', background: 'var(--csc-primary)', color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginTop: 'auto' }}>
                       Select {rightCase.name} for Deep Dive
                    </button>
                 </div>
              </div>

              {/* Coherence Section */}
              <div className="csc-coherence-section">
                 <h3 className="csc-font-display csc-italic" style={{ fontSize: '30px', borderBottom: '1px solid var(--csc-border-refined)', paddingBottom: '24px', marginBottom: '40px' }}>
                    Portfolio Coherence
                 </h3>
                 <div className="csc-insight-card">
                    <div className="flex-1 flex gap-8 items-start">
                        <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '50%', border: '1px solid var(--csc-border-refined)' }}>
                             <Box size={32} color="var(--csc-primary)" />
                        </div>
                        <div>
                            <h4 className="csc-font-display csc-italic" style={{ fontSize: '24px', marginBottom: '16px' }}>
                                Stronger Path-to-Liquidity
                            </h4>
                            <p style={{ fontSize: '18px', color: 'var(--csc-muted-text)', lineHeight: 1.6 }}>
                                {rightCase.name}'s GTM model exhibits significantly higher efficiency compared to {leftCase.name}. 
                                The current landscape favors high-velocity motions where 'Pacing' aligns with present market liquidity requirements.
                            </p>
                        </div>
                    </div>
                    
                    <CoherenceBar 
                      leftName={leftCase.name} 
                      rightName={rightCase.name} 
                      leftScore={leftCase.coherenceScore} 
                      rightScore={rightCase.coherenceScore} 
                    />
                 </div>
              </div>

              {/* Footer */}
              <footer style={{ padding: '48px 0', borderTop: '1px solid var(--csc-border-refined)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--csc-muted-text)', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '32px' }}>
                      <span>Confidential Memorandum</span>
                      <span>No. 882-01</span>
                  </div>
                  <div>&copy; 2024 Strategic Engine Methodology</div>
              </footer>

           </div>
        )}
      </div>
    </div>
  );
};
