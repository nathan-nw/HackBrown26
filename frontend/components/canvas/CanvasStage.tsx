"use client";

import { useState, useRef, useEffect, MouseEvent, WheelEvent } from 'react';
import { Play, Share2, Settings, Scan, Minimize, Minus, Plus } from 'lucide-react';
import DecisionCard, { CardProps } from './DecisionCard';

const INITIAL_CARDS: Omit<CardProps, 'onMouseDown'>[] = [
  {
    id: '1',
    type: 'foundation',
    title: 'Market Entry',
    tag: 'FOUNDATION',
    body: 'Initial wedge strategy targeting underserved developer segments.',
    validated: true,
    x: 100,
    y: 300,
    selected: false,
  },
  {
    id: '2',
    type: 'core',
    title: 'Solve for Power Users',
    tag: 'CORE LOOP',
    body: 'Prioritize depth of features over breadth. Focus on retention metrics for the top 5% of active users.',
    progress: 75,
    x: 500,
    y: 250,
    selected: false,
  }
];

export default function CanvasStage() {
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 });
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [dragState, setDragState] = useState<{
    type: 'stage' | 'card';
    id?: string;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Pan handler (Canvas)
  const handleMouseDown = (e: MouseEvent) => {
    // Only drag stage if clicking directly on the background
    if (e.target === containerRef.current) {
      setDragState({
        type: 'stage',
        startX: e.clientX,
        startY: e.clientY,
        initialX: view.x,
        initialY: view.y
      });
    }
  };

  // Drag handler (Card)
  const handleCardMouseDown = (e: MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent stage drag
    const card = cards.find(c => c.id === id);
    if (!card) return;

    setDragState({
      type: 'card',
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: card.x,
      initialY: card.y
    });

    // Select card
    setCards(prev => prev.map(c => ({
      ...c,
      selected: c.id === id
    })));
  };

  // Global move/up handlers
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!dragState) return;

      const dx = (e.clientX - dragState.startX) / (dragState.type === 'card' ? view.scale : 1);
      const dy = (e.clientY - dragState.startY) / (dragState.type === 'card' ? view.scale : 1);

      if (dragState.type === 'stage') {
        setView(prev => ({
          ...prev,
          x: dragState.initialX + (e.clientX - dragState.startX),
          y: dragState.initialY + (e.clientY - dragState.startY)
        }));
      } else if (dragState.type === 'card' && dragState.id) {
        setCards(prev => prev.map(c => {
          if (c.id === dragState.id) {
            return {
              ...c,
              x: dragState.initialX + dx,
              y: dragState.initialY + dy
            };
          }
          return c;
        }));
      }
    };

    const handleMouseUp = () => {
      setDragState(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, view.scale]);

  // Zoom handler
  const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const s = Math.exp(-e.deltaY * 0.001);
      const newScale = Math.min(Math.max(view.scale * s, 0.5), 2);
      setView(prev => ({ ...prev, scale: newScale }));
    }
  };
  
  // Manual Zoom Controls
  const adjustZoom = (delta: number) => {
      const newScale = Math.min(Math.max(view.scale + delta, 0.5), 2);
      setView(prev => ({ ...prev, scale: newScale }));
  }
  
  const resetView = () => {
      setView({ x: 0, y: 0, scale: 1 });
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-venture-dark select-none">
      {/* Background Grid */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        className="absolute inset-0 z-0 bg-grid-pattern cursor-grab active:cursor-grabbing"
        style={{
          backgroundSize: `${40 * view.scale}px ${40 * view.scale}px`,
          backgroundPosition: `${view.x}px ${view.y}px`,
        }}
      >
        {/* Transform Layer */}
        <div 
            className="absolute origin-top-left will-change-transform"
            style={{
                transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`
            }}
        >
            {/* Connecting Curve (Background) */}
            <svg className="absolute top-0 left-0 w-[1000px] h-[1000px] pointer-events-none opacity-20" style={{ overflow: 'visible' }}>
                <path 
                    d={`M ${cards[0].x + 320} ${cards[0].y + 100} C ${cards[0].x + 400} ${cards[0].y + 100}, ${cards[1].x - 80} ${cards[1].y + 100}, ${cards[1].x} ${cards[1].y + 100}`}
                    fill="none"
                    stroke="#00ff66"
                    strokeWidth="2"
                />
            </svg>

            {cards.map(card => (
            <DecisionCard 
                key={card.id} 
                {...card} 
                onMouseDown={handleCardMouseDown}
            />
            ))}
        </div>
      </div>

      {/* Floating UI Overlay (Top Left Title) */}
      <div className="absolute top-24 left-24 pointer-events-none fade-in">
        <div className="flex items-center gap-2 mb-2 text-gray-400 text-xs font-medium">
             <span>Series A</span>
             <span className="text-gray-600">/</span>
             <span className="text-white">Strategic Roadmap</span>
        </div>
        <h1 className="text-5xl font-serif text-white mb-2 tracking-tight">VentureLabs Canvas</h1>
        <p className="text-gray-400 text-lg font-light">Designing the path to market dominance.</p>
      </div>

      {/* Top Center Actions */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        <button onClick={() => alert("Sharing feature coming soon")} className="flex items-center gap-2 px-4 py-2 bg-venture-dark border border-venture-border rounded-lg text-white text-sm font-medium hover:bg-white/5 transition-colors">
            <Share2 size={16} />
            Share
        </button>
        <button onClick={() => alert("Simulation engine initializing...")} className="flex items-center gap-2 px-6 py-2 bg-venture-green text-venture-dark rounded-lg text-sm font-bold hover:bg-venture-green/90 transition-colors shadow-[0_0_20px_rgba(0,255,102,0.3)]">
            <Play size={16} fill="currentColor" />
            Run Simulation
        </button>
      </div>

      {/* Bottom Left Controls */}
      <div className="absolute bottom-8 left-24 flex items-center gap-3 z-30">
         <button className="w-10 h-10 bg-venture-dark border border-venture-border rounded flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <Settings size={18} />
         </button>
         
         <div className="flex items-center bg-venture-dark border border-venture-border rounded h-10 px-1">
            <button onClick={() => adjustZoom(-0.1)} className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-sm">
                <Minus size={14} />
            </button>
            <span className="w-12 text-center text-xs font-mono text-gray-300 select-none">
                {Math.round(view.scale * 100)}%
            </span>
             <button onClick={() => adjustZoom(0.1)} className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-sm">
                <Plus size={14} />
            </button>
         </div>

         <button onClick={resetView} className="flex items-center gap-2 px-3 h-10 bg-venture-dark border border-venture-border rounded text-gray-400 hover:text-white text-xs font-medium transition-colors">
            <Scan size={16} />
            Fit
         </button>
      </div>
    </div>
  );
}
