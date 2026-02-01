import React, { useEffect, useRef } from 'react';
import { REQUIRED_DECISIONS } from '../../data/requiredDecisions';
import '../../styles/canvas-ui.css';

interface ChecklistPanelProps {
  completedIds: string[];
  onAddNode: (type: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const ChecklistPanel = ({ completedIds, onAddNode, onClose, isOpen }: ChecklistPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = REQUIRED_DECISIONS.length;
  const completedCount = completedIds.length;
  const percentage = Math.round((completedCount / total) * 100);

  return (
    <div className="checklist-panel" ref={panelRef}>
      <div className="checklist-header">
        <h3 className="checklist-title">Decision Checklist</h3>
        <span className="checklist-progress">{percentage}% Complete</span>
      </div>

      <div className="checklist-content">
        {REQUIRED_DECISIONS.map((decision) => {
          const isCompleted = completedIds.includes(decision.type);
          const Icon = decision.icon;

          return (
            <div 
              key={decision.id} 
              className={`checklist-item ${isCompleted ? 'completed' : 'missing'}`}
              onClick={() => {
                if (!isCompleted) {
                  onAddNode(decision.type);
                }
              }}
            >
              <div className="checklist-icon-box">
                <Icon size={18} />
              </div>
              
              <div className="checklist-info">
                <h4>{decision.label}</h4>
                <p>{decision.description}</p>
              </div>

              <div className="checklist-status-icon">
                {isCompleted ? (
                   <div className="checklist-status-indicator status-done">DONE</div>
                ) : (
                   <div className="checklist-status-indicator status-missing">ADD</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
