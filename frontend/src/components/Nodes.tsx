import { Handle, Position, type NodeProps } from 'reactflow';
import { Pen } from 'lucide-react';
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
        <span className="node-paper-title">{data.title}</span>
        <div className="edit-icon">
          <Pen size={12} fill="currentColor" />
        </div>
      </div>
      
      <div className="node-paper-body">
        <h3 className="node-paper-heading">{data.label}</h3>
        {data.sublabel && <p className="node-paper-sublabel">{data.sublabel}</p>}
      </div>

      <div className="node-paper-footer">
        {typeof data.progress === 'number' && (
          <div className="progress-container">
             <div className="progress-bar-bg">
               <div className="progress-fill" style={{ width: `${data.progress}%` }}></div>
             </div>
             <span className="progress-text">Progress</span>
             <span className="progress-percent">{data.progress}%</span>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} style={{ background: 'var(--primary)', width: '12px', height: '12px', right: '-6px' }} />
    </div>
  );
};
