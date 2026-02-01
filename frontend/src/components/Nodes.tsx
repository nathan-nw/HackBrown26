import { Handle, Position, type NodeProps } from 'reactflow';
import { MoreHorizontal, Triangle } from 'lucide-react';
import '../styles/components.css';

export const DarkNode = ({ data }: NodeProps) => {
  return (
    <div className="node-card node-dark">
      <Handle type="target" position={Position.Left} />
      <div className="node-header">
        <span>{data.title}</span>
        {data.type && <span style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase' }}>{data.type}</span>}
      </div>
      <div className="node-body">
        {data.label}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export const PaperNode = ({ data }: NodeProps) => {
  return (
    <div className="node-card node-paper">
      <Handle type="target" position={Position.Left} style={{ background: 'var(--primary)', width: '12px', height: '12px', left: '-6px' }} />
      
      <div className="node-paper-header">
        <span className="node-paper-title">{data.category || data.title}</span>
        <div className="menu-icon">
          <MoreHorizontal size={20} color="#9CA3AF" />
        </div>
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
