import { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { callAI } from '../lib/aiClient';
import '../styles/components.css';
import '../styles/layout.css';

interface InsightsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  ideaId?: string;
  ideaMeta?: {
    title?: string;
    description?: string;
    wedge?: string;
    differentiation?: string;
    category?: string;
    stage?: string;
  };
  canvas?: {
    nodes?: any[];
    edges?: any[];
  };
}

interface PlanningReportResult {
  strategicFit: { score: number; text: string };
  suggestedAction: { title: string; body: string };
  marketRisk: { label: 'Low' | 'Medium' | 'High'; text: string };
  considerations: Array<{ question: string; indicators: string; resolution: string }>;
}

export const InsightsPanel = ({ isOpen, onToggle, ideaId, ideaMeta, canvas }: InsightsPanelProps) => {
  const [report, setReport] = useState<PlanningReportResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sessionId = useRef<string>(`insights-${Date.now()}`);
  const callId = useRef<number>(0);
  const latestCallIdProcessed = useRef<number>(0);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setError(null);
    callId.current += 1;
    const currentCallId = callId.current;

    try {
      const response = await callAI({
        tracker: {
          sessionId: sessionId.current,
          callId: currentCallId,
          kind: 'planning_report',
          step: 1,
          ts: Date.now(),
        },
        payload: {
          ideaId,
          ideaMeta: ideaMeta || {},
          canvas: canvas || { nodes: [], edges: [] },
        },
      });

      // Stale response protection
      if (currentCallId < latestCallIdProcessed.current) {
        return;
      }
      latestCallIdProcessed.current = currentCallId;

      if (response.result) {
        setReport(response.result as PlanningReportResult);
      } else {
        setError('No report data returned.');
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError('Failed to generate report. Please try again.');
        console.error('Report generation error:', err);
      }
    } finally {
      setIsGenerating(false);
    }
  };

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
          <h3>Strategic Report</h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button 
              className="btn btn-primary" 
              style={{ fontSize: '10px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={handleGenerateReport}
              disabled={isGenerating}
            >
              {isGenerating && <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />}
              Generate Report
            </button>
            <Button variant="icon" onClick={onToggle} title="Minimize"><ChevronRight size={18} /></Button>
          </div>
        </div>

        {/* Placeholder before report */}
        {!report && !isGenerating && !error && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', fontStyle: 'italic', marginBottom: '16px' }}>
            Generate a report to pressure-test your strategy.
          </p>
        )}

        {/* Error state */}
        {error && (
          <p style={{ color: '#EF4444', fontSize: '13px', marginBottom: '16px' }}>{error}</p>
        )}

        {/* Report Content */}
        {report && (
          <>
            {/* Strategic Fit */}
            <div className="insight-card" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Strategic Fit</span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--forest-dark)' }}>{report.strategicFit.score}/100</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{report.strategicFit.text}</p>
            </div>

            {/* Suggested Action */}
            <div className="insight-card" style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Suggested Action</span>
              <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{report.suggestedAction.title}</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{report.suggestedAction.body}</p>
            </div>

            {/* Market Risk */}
            <div className="insight-card" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Market Risk</span>
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: 600, 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  backgroundColor: report.marketRisk.label === 'High' ? '#FEE2E2' : report.marketRisk.label === 'Medium' ? '#FEF3C7' : '#D1FAE5',
                  color: report.marketRisk.label === 'High' ? '#991B1B' : report.marketRisk.label === 'Medium' ? '#92400E' : '#065F46'
                }}>
                  {report.marketRisk.label}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{report.marketRisk.text}</p>
            </div>
          </>
        )}
      </div>

      {/* Considerations Section */}
      {report && report.considerations && report.considerations.length > 0 && (
        <div className="insight-section" style={{ marginTop: '16px' }}>
          <h3 style={{ marginBottom: '12px' }}>Considerations</h3>
          {report.considerations.map((item, idx) => (
            <div key={idx} className="insight-card" style={{ marginBottom: '10px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>{item.question}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}><strong>Indicators:</strong> {item.indicators}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}><strong>Resolution:</strong> {item.resolution}</p>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};
