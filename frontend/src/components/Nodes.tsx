import { Handle, Position, type NodeProps } from 'reactflow';
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
      <Handle type="target" position={Position.Left} style={{ background: 'var(--primary)' }} />
      <div className="node-header">
        <span>{data.title}</span>
        {typeof data.progress === 'number' && <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{data.progress}%</span>}
      </div>
      <div className="node-body">
        {data.label}
        {typeof data.progress === 'number' && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${data.progress}%` }}></div>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} style={{ background: 'var(--primary)' }} />
    </div>
  );
};
