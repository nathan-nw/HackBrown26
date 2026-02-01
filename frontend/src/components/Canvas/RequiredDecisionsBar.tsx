import React from 'react';
import { GripHorizontal, Plus, Grid } from 'lucide-react';
import { REQUIRED_DECISIONS } from '../../data/requiredDecisions';
import '../../styles/canvas-ui.css';

interface RequiredDecisionsBarProps {
  completedIds: string[]; // List of decision IDs that are already on the canvas
  onAddNode: (type: string) => void;
  onToggleChecklist: () => void;
}

export const RequiredDecisionsBar = ({ completedIds, onAddNode, onToggleChecklist }: RequiredDecisionsBarProps) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start drag if not clicking a draggable pill (which prevents conflict with DnD)
    // Actually, we can check if the target is the container or a non-draggable area
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="required-decisions-bar-container">
      {/* Library Button */}
      <button className="library-button" onClick={onToggleChecklist}>
        <Grid size={20} />
        <span className="library-label">Library</span>
      </button>

      <div className="bar-divider" />

      {/* Draggable Pills */}
      <div 
        className={`pills-scroll-container ${isDragging ? 'is-dragging' : ''}`}
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {REQUIRED_DECISIONS.map((decision) => {
          const isCompleted = completedIds.includes(decision.type);
          const Icon = decision.icon;

          return (
            <div
              key={decision.id}
              className={`decision-pill ${isCompleted ? 'completed' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, decision.type)}
              onClick={() => onAddNode(decision.type)}
              title={decision.description}
            >
              <Icon size={20} className={isCompleted ? 'text-primary' : 'text-text-secondary'} color={isCompleted ? 'var(--primary)' : 'var(--text-secondary)'} />
              <span className="pill-label">{decision.label}</span>
              
              <div className="pill-divider" />
              
              <GripHorizontal size={14} className="drag-handle" />
              
              {isCompleted && <div className="status-dot" />}
            </div>
          );
        })}

        {/* Plus Placeholder */}
        <div className="decision-pill" style={{ opacity: 0.5, cursor: 'default', borderStyle: 'dashed' }}>
          <Plus size={20} />
        </div>
      </div>
    </div>
  );
};
