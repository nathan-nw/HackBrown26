import ReactFlow, { 
  Background, 
  Controls, 
  ReactFlowProvider,
  useReactFlow,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

import { initialNodes, initialEdges } from '../data/mockCanvas';
import { DarkNode, PaperNode } from './Nodes';
import '../styles/canvas.css';
import { Button } from './ui/Button';
import { RefreshCcw, Maximize } from 'lucide-react';

const nodeTypes = {
  darkNode: DarkNode,
  paperNode: PaperNode,
};

const CanvasContent = () => {
  const { fitView } = useReactFlow();

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={2}
      >
        <Background gap={20} color="#1A3326" />
        {/* Custom Controls position if needed, or default */}
        <Panel position="bottom-left" className="bottom-left-controls">
           <Button variant="icon" onClick={() => fitView({ padding: 0.2 })} title="Fit View">
             <Maximize size={20} />
           </Button>
           <Button variant="icon" title="Reset Layout">
             <RefreshCcw size={20} />
           </Button>
        </Panel>
        <Controls position="bottom-right" showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export const CanvasBoard = () => {
  return (
    <div className="canvas-area">
      <ReactFlowProvider>
        <CanvasContent />
      </ReactFlowProvider>
    </div>
  );
};
