import { MoreHorizontal, PenLine, CheckCircle2 } from 'lucide-react';
import { type MouseEvent } from 'react';

export interface CardProps {
  id: string;
  type: 'foundation' | 'core';
  title: string;
  tag: string;
  body: string;
  validated?: boolean;
  progress?: number;
  selected?: boolean;
  x: number;
  y: number;
  onMouseDown: (e: MouseEvent, id: string) => void;
}

export default function DecisionCard({ 
  id, type, title, tag, body, validated, progress, selected, x, y, onMouseDown 
}: CardProps) {
  const isDark = type === 'foundation';
  
  return (
    <div
      onMouseDown={(e) => onMouseDown(e, id)}
      style={{ 
        transform: `translate(${x}px, ${y}px)`,
        cursor: 'grab'
      }}
      className={`absolute w-[320px] rounded-xl p-5 shadow-2xl transition-shadow duration-200
        ${isDark 
          ? 'bg-venture-green-dim/90 backdrop-blur-md border border-venture-border text-white' 
          : 'bg-white text-gray-900 border-l-4 border-l-venture-green'}
        ${selected ? 'ring-2 ring-venture-green shadow-[0_0_30px_rgba(0,255,102,0.15)]' : 'hover:shadow-lg'}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {tag}
        </span>
        {isDark ? (
          <MoreHorizontal size={16} className="text-gray-500" />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            <PenLine size={12} className="text-gray-600" />
          </div>
        )}
      </div>

      <h3 className="font-serif text-2xl mb-2 leading-tight">{title}</h3>
      <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {body}
      </p>

      {validated && (
        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-venture-green/10 border border-venture-green/30 rounded text-[10px] font-bold text-venture-green uppercase tracking-wide">
          <span className="w-1 h-1 rounded-full bg-venture-green animate-pulse" />
          Validated
        </div>
      )}

      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex -space-x-2 mb-3">
            {[1, 2].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="avatar" />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-900 flex items-center justify-center text-[10px] font-bold text-white z-10">
              +2
            </div>
          </div>
          <div className="bg-gray-100 h-1 rounded-full overflow-hidden w-full relative">
            <div 
              className="absolute top-0 left-0 bottom-0 bg-venture-green rounded-full" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] uppercase font-bold text-gray-400">Progress</span>
            <span className="text-[10px] font-bold text-gray-500">{progress}%</span>
          </div>
        </div>
      )}
      
      {/* Handle for connecting lines - visual only for now */}
       <div className={`absolute top-1/2 -right-1 w-2 h-2 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
    </div>
  );
}
