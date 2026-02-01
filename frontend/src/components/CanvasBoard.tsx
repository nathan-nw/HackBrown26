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

import { BottomBar } from './BottomBar';

const CanvasContent = () => {
  const { fitView, addNodes } = useReactFlow();

  const handleAddNode = (type: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    addNodes({
      id,
      type: 'darkNode',
      position: { x: window.innerWidth / 3 + Math.random() * 100, y: window.innerHeight / 3 + Math.random() * 100 },
      data: { 
        title: type, 
        label: `New ${type} block.`,
        type: type.toUpperCase() 
      },
    });
  };

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
        <Panel position="bottom-center">
          <BottomBar onAddNode={handleAddNode} />
        </Panel>
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
