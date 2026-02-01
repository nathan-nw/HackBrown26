import { type MouseEvent } from 'react';

export interface CardProps {
  id: string;
  type: 'foundation' | 'core' | 'hypothesis' | 'draft';
  title: string;
  tag: string;
  body?: string;
  validated?: boolean;
  progress?: number;
  highlight?: boolean; // For hypothesis "High Signal"
  x: number;
  y: number;
  onMouseDown?: (e: MouseEvent, id: string) => void;
}

export default function DecisionCard({ 
  id, type, title, tag, body, validated, progress, highlight, x, y, onMouseDown 
}: CardProps) {
  
  // Node 1: Origin (Foundation)
  if (type === 'foundation') {
    return (
      <div 
        onMouseDown={(e) => onMouseDown && onMouseDown(e, id)}
        className="absolute w-[300px] z-10 group cursor-pointer hover:z-20"
        style={{ transform: `translate(${x}px, ${y}px)` }}
      >
        <div className="bg-forest-light border border-[#2C4A3A] p-5 rounded-lg shadow-xl backdrop-blur-sm group-hover:border-primary/50 transition-all duration-300">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold tracking-widest uppercase text-text-secondary-dark">{tag}</span>
            <span className="material-symbols-outlined text-text-secondary-dark text-sm">more_horiz</span>
          </div>
          <h3 className="text-white font-serif text-xl mb-2">{title}</h3>
          <p className="text-text-secondary-dark text-sm leading-relaxed mb-4">{body}</p>
          {validated && (
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1A3326] text-primary border border-primary/20">VALIDATED</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Node 2: Central Hub (Core Loop)
  if (type === 'core') {
    return (
      <div 
        onMouseDown={(e) => onMouseDown && onMouseDown(e, id)}
        className="absolute w-[340px] z-10 group cursor-pointer hover:z-20"
        style={{ transform: `translate(${x}px, ${y}px)` }}
      >
        <div className="bg-paper text-forest-deep p-6 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-l-4 border-primary transition-transform duration-300 group-hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold tracking-widest uppercase text-forest-light/60">{tag}</span>
            <div className="w-6 h-6 rounded-full bg-forest-light/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-forest-light text-sm">edit</span>
            </div>
          </div>
          <h3 className="text-forest-deep font-serif text-2xl mb-2 font-medium">{title}</h3>
          <p className="text-forest-light/70 text-sm leading-relaxed mb-5">{body}</p>
          
          {progress !== undefined && (
            <>
              <div className="flex -space-x-2 mb-4">
                {[1, 2].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-paper bg-gray-300 bg-cover overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="avatar" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-paper bg-forest-light text-white text-xs flex items-center justify-center font-medium">+2</div>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="flex justify-between mt-2 text-xs font-medium text-forest-light/60">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
            </>
          )}

          {/* Connector Dots (Visual only, attached to card) */}
          <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-primary rounded-full border-2 border-forest-dark"></div>
          <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-white rounded-full border-2 border-forest-dark"></div>
        </div>
      </div>
    );
  }

  // Node 3: Branch Top (Hypothesis)
  if (type === 'hypothesis') {
    return (
      <div 
        onMouseDown={(e) => onMouseDown && onMouseDown(e, id)}
        className="absolute w-[280px] z-10 group cursor-pointer hover:z-20"
        style={{ transform: `translate(${x}px, ${y}px)` }}
      >
        <div className="bg-forest-light border border-[#2C4A3A] p-5 rounded-lg shadow-xl backdrop-blur-sm hover:bg-[#1A3326] transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">{tag}</span>
          </div>
          <h3 className="text-white font-serif text-lg mb-2">{title}</h3>
          <p className="text-text-secondary-dark text-sm leading-relaxed mb-4">{body}</p>
          {highlight && (
            <div className="flex items-center gap-2">
              <span className="text-primary text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span> High Signal
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Node 4: Branch Bottom (Draft)
  if (type === 'draft') {
    return (
      <div 
        onMouseDown={(e) => onMouseDown && onMouseDown(e, id)}
        className="absolute w-[280px] z-10 group cursor-pointer hover:z-20 opacity-60 hover:opacity-100 transition-opacity"
        style={{ transform: `translate(${x}px, ${y}px)` }}
      >
        <div className="bg-forest-dark border border-[#2C4A3A] border-dashed p-5 rounded-lg">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold tracking-widest uppercase text-text-secondary-dark">{tag}</span>
          </div>
          <h3 className="text-text-secondary-dark font-serif text-lg mb-2">{title}</h3>
          <button className="text-xs text-white hover:text-primary mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">add</span> Expand Details
          </button>
        </div>
      </div>
    );
  }

  return null;
}
