import { Users, Triangle, Box, Clock } from 'lucide-react';
import { Button } from './ui/Button';
import '../styles/components.css';

interface BottomBarProps {
  onAddNode: (type: string) => void;
}

export const BottomBar = ({ onAddNode }: BottomBarProps) => {
  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '10px',
    height: 'auto',
    padding: '8px 12px',
    color: 'var(--text-secondary)'
  };

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      padding: '8px',
      backgroundColor: 'var(--forest-dark)',
      border: '1px solid var(--forest-light)',
      borderRadius: '12px',
      boxShadow: 'var(--shadow-deep)',
      pointerEvents: 'all' 
    }}>
      <Button variant="ghost" onClick={() => onAddNode('Segment')} style={buttonStyle}>
        <Users size={20} />
        SEGMENT
      </Button>
      <div style={{ width: '1px', background: 'var(--forest-light)' }} />
      <Button variant="ghost" onClick={() => onAddNode('Wedge')} style={buttonStyle}>
        <Triangle size={20} />
        WEDGE
      </Button>
      <div style={{ width: '1px', background: 'var(--forest-light)' }} />
       <Button variant="ghost" onClick={() => onAddNode('Product')} style={buttonStyle}>
        <Box size={20} />
        PRODUCT
      </Button>
      <div style={{ width: '1px', background: 'var(--forest-light)' }} />
       <Button variant="ghost" onClick={() => onAddNode('Pacing')} style={buttonStyle}>
        <Clock size={20} />
        PACING
      </Button>
    </div>
  );
};
