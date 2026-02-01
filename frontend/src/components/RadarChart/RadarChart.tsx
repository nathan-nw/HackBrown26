import React from 'react';

interface RadarChartProps {
  metrics: {
    novelty: number;
    coherence: number;
    execution: number;
    pacing: number;
  };
  color?: string; // Default to green
}

export const RadarChart: React.FC<RadarChartProps> = ({ metrics, color = '#00854A' }) => {
  const size = 200;
  const center = size / 2;
  const maxRadius = 80;

  // Map 0-100 to radius
  const getPoint = (value: number, angle: number) => {
    const r = (value / 100) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  };

  // Angles for 4 axes (Novelty Top, Coherence Right, Execution Bottom, Pacing Left)
  // SVG coordinates: 0 is Right, -90 is Top.
  const pNovelty = getPoint(metrics.novelty, -Math.PI / 2);
  const pCoherence = getPoint(metrics.coherence, 0);
  const pExecution = getPoint(metrics.execution, Math.PI / 2);
  const pPacing = getPoint(metrics.pacing, Math.PI);

  const points = `${pNovelty} ${pCoherence} ${pExecution} ${pPacing}`;

  return (
    <div className="relative h-64 w-full flex items-center justify-center">
      {/* Grid Circles */}
      <div className="absolute border border-forest/5 rounded-full w-48 h-48" style={{ width: 160, height: 160, borderColor: 'rgba(0,43,21,0.05)', borderRadius: '50%', borderStyle: 'solid', borderWidth: 1 }}></div>
      <div className="absolute border border-forest/5 rounded-full w-32 h-32" style={{ width: 106, height: 106, borderColor: 'rgba(0,43,21,0.05)', borderRadius: '50%', borderStyle: 'solid', borderWidth: 1 }}></div>
      <div className="absolute border border-forest/5 rounded-full w-16 h-16" style={{ width: 53, height: 53, borderColor: 'rgba(0,43,21,0.05)', borderRadius: '50%', borderStyle: 'solid', borderWidth: 1 }}></div>
      
      {/* Axes */}
      <div style={{ position: 'absolute', width: 160, height: 1, backgroundColor: 'rgba(0,43,21,0.05)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
      <div style={{ position: 'absolute', height: 160, width: 1, backgroundColor: 'rgba(0,43,21,0.05)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <polygon 
          points={points} 
          fill={color} 
          fillOpacity="0.1" 
          stroke={color} 
          strokeWidth="1.5"
        />
        {/* Vertex Dots */}
        {[pNovelty, pCoherence, pExecution, pPacing].map((pt, i) => {
            const [cx, cy] = pt.split(',');
            return <circle key={i} cx={cx} cy={cy} r="2.5" fill={color} />;
        })}
      </svg>

      {/* Labels */}
      <span style={{ position: 'absolute', top: '10px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5A6660', fontFamily: 'var(--font-sans)' }}>Novelty</span>
      <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5A6660', fontFamily: 'var(--font-sans)' }}>Coherence</span>
      <span style={{ position: 'absolute', bottom: '10px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5A6660', fontFamily: 'var(--font-sans)' }}>Execution</span>
      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5A6660', fontFamily: 'var(--font-sans)' }}>Pacing</span>
    </div>
  );
};
