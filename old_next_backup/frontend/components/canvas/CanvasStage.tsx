"use client";

import { useState, useRef, useEffect, MouseEvent, WheelEvent } from 'react';
import DecisionCard, { CardProps } from './DecisionCard';

const INITIAL_CARDS: Omit<CardProps, 'onMouseDown'>[] = [
  {
    id: '1',
    type: 'foundation',
    title: 'Market Entry',
    tag: 'Foundation',
    body: 'Initial wedge strategy targeting underserved developer segments.',
    validated: true,
    x: 50,
    y: 350,
  },
  {
    id: '2',
    type: 'core',
    title: 'Solve for Power Users',
    tag: 'Core Loop',
    body: 'Prioritize depth of features over breadth. Focus on retention metrics for the top 5% of active users.',
    progress: 75,
    x: 450,
    y: 320,
  },
  {
      id: '3',
      type: 'hypothesis',
      title: 'Automated Concierge',
      tag: 'Hypothesis',
      body: 'Replace manual onboarding with AI-driven flows.',
      highlight: true,
      x: 900,
      y: 200,
  },
  {
      id: '4',
      type: 'draft',
      title: 'Enterprise Sales Motion',
      tag: 'Draft',
      x: 900,
      y: 450,
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

  // Pan handler (Stage)
  const handleMouseDown = (e: MouseEvent) => {
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
    e.stopPropagation();
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
  };

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

  const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const s = Math.exp(-e.deltaY * 0.001);
      const newScale = Math.min(Math.max(view.scale * s, 0.5), 2);
      setView(prev => ({ ...prev, scale: newScale }));
    }
  };

  const adjustZoom = (delta: number) => {
      const newScale = Math.min(Math.max(view.scale + delta, 0.5), 2);
      setView(prev => ({ ...prev, scale: newScale }));
  }

  const resetView = () => {
      setView({ x: 0, y: 0, scale: 1 });
  }

  // Dynamic SVG Paths
  const hub = cards.find(c => c.id === '2')!;
  const origin = cards.find(c => c.id === '1')!;
  const topBranch = cards.find(c => c.id === '3')!;
  const bottomBranch = cards.find(c => c.id === '4')!;
  
  const p1_start = { x: origin.x + 300, y: origin.y + 75 };
  const p1_end = { x: hub.x, y: hub.y + 100 };
  
  const p2_start = { x: hub.x + 340, y: hub.y + 100 };
  const p2_end_top = { x: topBranch.x, y: topBranch.y + 75 };
  const p2_end_bottom = { x: bottomBranch.x, y: bottomBranch.y + 50 };

  return (
    <section className="flex-1 relative overflow-hidden bg-forest-dark grid-bg flex flex-col">
      {/* Breadcrumbs & Heading Overlay */}
      <div className="absolute top-0 left-0 right-0 p-8 pointer-events-none z-10 bg-gradient-to-b from-forest-dark to-transparent pb-24">
        <div className="pointer-events-auto max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-2 text-sm mb-4">
            <a href="#" className="text-text-secondary-dark hover:text-primary transition-colors font-medium">Series A</a>
            <span className="text-[#1A3326]">/</span>
            <span className="text-white font-medium">Strategic Roadmap</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">Sequoia Genesis Canvas</h1>
              <p className="text-text-secondary-dark mt-2 font-light text-lg">Designing the path to market dominance.</p>
            </div>
            <div className="flex gap-3">
              <button className="h-10 px-4 rounded-lg bg-[#1A3326] hover:bg-[#234532] text-white text-sm font-semibold transition-colors flex items-center gap-2 border border-transparent hover:border-[#2C4A3A]">
                 <span className="material-symbols-outlined text-lg">share</span>
                 Share
              </button>
              <button className="h-10 px-4 rounded-lg bg-primary text-forest-deep text-sm font-bold shadow-[0_0_15px_rgba(19,236,91,0.2)] hover:shadow-[0_0_20px_rgba(19,236,91,0.4)] transition-all flex items-center gap-2">
                 <span className="material-symbols-outlined text-lg">play_arrow</span>
                 Run Simulation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The Canvas */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        className="flex-1 overflow-auto relative p-0 flex justify-center items-start min-w-[1000px]"
      >
        {/* Connection Lines (SVG Overlay) */}
        <svg 
            className="absolute top-0 left-0 w-[5000px] h-[5000px] pointer-events-none z-0 overflow-visible"
            style={{
                transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
                transformOrigin: 'top left'
            }}
        >
            <path 
                d={`M${p1_start.x} ${p1_start.y} C ${p1_start.x + 50} ${p1_start.y}, ${p1_end.x - 50} ${p1_end.y}, ${p1_end.x} ${p1_end.y}`} 
                fill="none" 
                stroke="#1A3326" 
                strokeDasharray="4 4" 
                strokeWidth="2"
            />
            
            <path 
                d={`M${p2_start.x} ${p2_start.y} C ${p2_start.x + 100} ${p2_start.y}, ${p2_end_top.x - 100} ${p2_end_top.y}, ${p2_end_top.x} ${p2_end_top.y}`} 
                fill="none" 
                stroke="#1A3326" 
                strokeWidth="2"
            />

            <path 
                d={`M${p2_start.x} ${p2_start.y} C ${p2_start.x + 100} ${p2_start.y}, ${p2_end_bottom.x - 100} ${p2_end_bottom.y}, ${p2_end_bottom.x} ${p2_end_bottom.y}`} 
                fill="none" 
                stroke="#1A3326" 
                strokeWidth="2"
            />
        </svg>

        <div 
            className="absolute top-0 left-0 w-full h-full transform-origin-top-left will-change-transform"
            style={{
                transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`
            }}
        >
             {cards.map(card => (
                 <DecisionCard key={card.id} {...card} onMouseDown={handleCardMouseDown} />
             ))}
             
             {/* Connector Dots (Global ref for stage, but here attached to card positions for visual test) */}
             <div className="absolute top-[320px] left-[50px] pointer-events-none"></div>
        </div>
      </div>

      {/* Canvas Controls */}
      <div className="absolute bottom-8 left-8 flex gap-2 z-30">
        <div className="bg-forest-light/90 backdrop-blur border border-[#2C4A3A] rounded-lg p-1 flex items-center shadow-lg">
          <button onClick={() => adjustZoom(-0.1)} className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#2C4A3A] rounded">
             <span className="material-symbols-outlined text-sm">remove</span>
          </button>
          <span className="text-xs font-mono text-text-secondary-dark w-12 text-center select-none">{Math.round(view.scale * 100)}%</span>
          <button onClick={() => adjustZoom(0.1)} className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#2C4A3A] rounded">
             <span className="material-symbols-outlined text-sm">add</span>
          </button>
        </div>
        <button onClick={resetView} className="bg-forest-light/90 backdrop-blur border border-[#2C4A3A] rounded-lg h-10 px-3 flex items-center gap-2 text-white text-xs font-bold hover:bg-[#2C4A3A] shadow-lg transition-colors">
           <span className="material-symbols-outlined text-sm">fit_screen</span> Fit
        </button>
      </div>
    </section>
  );
}
