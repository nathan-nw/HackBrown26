
import { useEffect, useState } from 'react';
import ReactFlow, { 
  Background, 
  ReactFlowProvider,
  useReactFlow,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ChevronLeft } from 'lucide-react';
import { DarkNode, PaperNode } from '../Nodes';
import '../../styles/canvas.css';

interface OutlierBoardModalViewProps {
  outlierId: string;
  onBack: () => void;
}

const nodeTypes = {
  darkNode: DarkNode,
  paperNode: PaperNode,
};

// Internal component to handle ReactFlow hooks
const BoardContent = ({ outlierId, onBack }: OutlierBoardModalViewProps) => {
  const { fitView, setNodes, setEdges } = useReactFlow();
  
  const [board, setBoard] = useState<any>(null); // Use proper type if available, or any for now
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ideas/${outlierId}`);
        if (response.ok) {
           const data = await response.json();
           setBoard(data);
           setNodes(data.nodes || []);
           setEdges(data.edges || []);
           
            // Fit view on mount after a short delay to ensure rendering
            setTimeout(() => {
                fitView({ padding: 0.2, duration: 800 });
            }, 100);
        }
      } catch (error) {
        console.error('Failed to fetch board:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, [outlierId, fitView, setNodes, setEdges]);

  if (loading) {
      return <div style={{ color: 'white', padding: 20 }}>Loading...</div>;
  }

  if (!board) {
      return <div style={{ color: 'white', padding: 20 }}>Board data not found for {outlierId}</div>;
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative' }}>
      {/* Canvas Area */}
      <div style={{ flex: 1, position: 'relative', height: '100%' }}>
         <ReactFlow
            defaultNodes={[]}
            defaultEdges={[]}
            nodeTypes={nodeTypes}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
            zoomOnDoubleClick={false}
            panOnDrag={true}
            proOptions={{ hideAttribution: true }}
            minZoom={0.5}
            maxZoom={2}
         >
            <Background gap={20} color="#1A3326" />
            
            {/* Top Bar Overlay */}
            <Panel position="top-left" style={{ margin: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button 
                            onClick={onBack}
                            style={{ 
                                background: 'rgba(5, 22, 16, 0.8)', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                borderRadius: '8px',
                                padding: '8px',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                backdropFilter: 'blur(4px)'
                            }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'white', margin: 0, fontFamily: 'var(--font-headline)' }}>
                                {board.title}
                            </h2>
                            {board.subtitle && (
                                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                                    {board.subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Panel>
         </ReactFlow>
      </div>

      {/* Right Sidebar - Read Only Insights */}
      <aside style={{
        width: '320px',
        background: '#0B1D15',
        borderLeft: '1px solid #1A3326',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        gap: '24px',
        overflowY: 'auto'
      }}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-headline)', color: 'white', fontSize: '16px', marginBottom: '4px' }}>
                  Strategic Analysis
              </h3>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Auto-generated from connection graph</p>
          </div>

          {/* Strategic Fit Score */}
          <div style={{ background: '#132A20', borderRadius: '8px', padding: '16px', border: '1px solid #1A3326' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' }}>Strategic Fit</span>
                  <span style={{ fontSize: '16px', color: 'white', fontWeight: 700, fontFamily: 'monospace' }}>{board.insights.strategicFitScore}/100</span>
              </div>
              <p style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: '1.5', margin: 0 }}>
                  {board.insights.strategicFitText}
              </p>
          </div>

          {/* Suggested Action */}
          <div>
              <h4 style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Suggested Action</h4>
              <div style={{ background: 'rgba(19, 236, 91, 0.05)', border: '1px solid rgba(19, 236, 91, 0.2)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                     {board.insights.suggestedActionTitle}
                  </div>
                  <p style={{ fontSize: '13px', color: '#D1D5DB', margin: 0, lineHeight: '1.4' }}>
                     {board.insights.suggestedActionBody}
                  </p>
              </div>
          </div>

           {/* Market Risk */}
           <div>
              <h4 style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Market Risk</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      textTransform: 'uppercase',
                      background: board.insights.marketRiskLabel === 'High' ? '#FEE2E2' : board.insights.marketRiskLabel === 'Medium' ? '#FEF3C7' : '#DCFCE7',
                      color: board.insights.marketRiskLabel === 'High' ? '#991B1B' : board.insights.marketRiskLabel === 'Medium' ? '#92400E' : '#166534',
                  }}>
                      {board.insights.marketRiskLabel}
                  </span>
              </div>
               <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
                  {board.insights.marketRiskText}
              </p>
          </div>

      </aside>
    </div>
  );
};

export const OutlierBoardModalView = (props: OutlierBoardModalViewProps) => {
    return (
        <ReactFlowProvider>
            <BoardContent {...props} />
        </ReactFlowProvider>
    );
};
