import { Handle, Position, type NodeProps } from 'reactflow';
import { MoreHorizontal, Triangle } from 'lucide-react';
import '../styles/components.css';
import { REQUIRED_DECISIONS } from '../data/requiredDecisions';

const renderNodeSummary = (type: string, data: any) => {
    switch (type) {
        case 'PRICING':
            if (data.pricingModel) {
                 return (
                    <div style={{ marginTop: '8px', color: 'var(--primary)', fontWeight: 600 }}>
                        {data.pricingModel}: {data.price || 'TBD'} {data.billingFrequency ? `/ ${data.billingFrequency}` : ''}
                    </div>
                 );
            }
            return null;
        case 'MARKET': 
            if (data.targetCustomer) {
                 return (
                    <div style={{ marginTop: '8px', color: 'var(--primary)', fontWeight: 600 }}>
                        {data.targetCustomer} <br/>
                        <span style={{ fontSize: '0.85em', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>{data.beachhead}</span>
                    </div>
                 );
            }
            return null;
        case 'DISTRIBUTION':
            if (data.channel) {
                return (
                    <div style={{ marginTop: '8px', color: 'var(--primary)', fontWeight: 600 }}>
                        {data.channel} {data.cac ? `(CAC: ${data.cac})` : ''}
                    </div>
                );
            }
            return null;
         case 'PROBLEM':
            if (data.painPoints) {
                return (
                    <div style={{ marginTop: '8px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'  }}>
                        {data.painPoints}
                    </div>
                );
            }
            return null;
        default:
            // For other types, try to find a key field or return nothing if just generic
            return null;
    }
};

export const DarkNode = ({ id, data }: NodeProps) => {
  const decisionConfig = REQUIRED_DECISIONS.find(d => d.type === data.type);
  const description = decisionConfig?.description || data.label;

  return (
    <div className="node-card node-dark">
      <Handle type="target" position={Position.Left} />
      <div className="node-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
            <span>{data.title}</span>
            {data.type && <span style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase' }}>{data.type}</span>}
        </div>
        <button 
          className="menu-icon" 
          onClick={(e) => {
            e.stopPropagation();
            if (data.onEdit) data.onEdit(id);
          }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, opacity: 0.8 }}
        >
          <MoreHorizontal size={16} color="#E5E7EB" />
        </button>
      </div>
      <div className="node-body">
        <div style={{ fontSize: '0.9em', opacity: 0.8, marginBottom: '4px' }}>
             {description}
        </div>
        {renderNodeSummary(data.type, data)}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export const PaperNode = ({ id, data }: NodeProps) => {
  return (
    <div className="node-card node-paper">
      <Handle type="target" position={Position.Left} style={{ background: 'var(--primary)', width: '12px', height: '12px', left: '-6px' }} />
      
      <div className="node-paper-header">
        <span className="node-paper-title">{data.category || data.title}</span>
        <button 
          className="menu-icon" 
          onClick={(e) => {
            e.stopPropagation(); // Prevent ensuring node selection doesn't conflict
            if (data.onEdit) data.onEdit(id);
          }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <MoreHorizontal size={20} color="#9CA3AF" />
        </button>
      </div>
      
      <div className="node-paper-body">
        <h3 className="node-paper-heading">{data.label}</h3>
        {data.sublabel && <p className="node-paper-sublabel">{data.sublabel}</p>}
        
        {data.wedge && (
          <div className="primary-wedge-container">
            <span className="wedge-label">PRIMARY WEDGE</span>
            <div className="wedge-content">
              <Triangle size={12} fill="currentColor" className="wedge-icon" />
              <span className="wedge-value">{data.wedge}</span>
            </div>
          </div>
        )}
      </div>

      <div className="node-paper-footer">
        {(data.strategicFit || data.marketRisk) && (
          <>
            <div className="metrics-row">
              <div className="metric-item">
                <span className="metric-label">STRATEGIC FIT</span>
                <span className="metric-value-large">{data.strategicFit}/100</span>
              </div>
              <div className="metric-item right-align">
                <span className="metric-label">MARKET RISK</span>
                <span className={`metric-tag ${data.marketRisk?.toLowerCase()}`}>{data.marketRisk}</span>
              </div>
            </div>
            <div className="divider-line" />
          </>
        )}

        {typeof data.progress === 'number' && (
          <div className="progress-container">
             <div className="progress-info">
               <span className="progress-text">Validation Progress</span>
               <span className="progress-percent">{data.progress}%</span>
             </div>
             <div className="progress-bar-bg">
               <div className="progress-fill" style={{ width: `${data.progress}%` }}></div>
             </div>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} style={{ background: 'var(--primary)', width: '12px', height: '12px', right: '-6px' }} />
    </div>
  );
};
