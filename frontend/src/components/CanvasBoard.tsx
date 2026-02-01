import React from 'react';
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
import { RequiredDecisionsBar } from './Canvas/RequiredDecisionsBar';
import { ChecklistPanel } from './Canvas/ChecklistPanel';

const nodeTypes = {
  darkNode: DarkNode,
  paperNode: PaperNode,
};

const CanvasContent = () => {
  const { fitView, addNodes, getNodes, project } = useReactFlow();
  const nodes = getNodes(); // Reactive to flow changes
  const [isChecklistOpen, setIsChecklistOpen] = React.useState(false);

  // Derive completed IDs from current nodes
  const completedIds = React.useMemo(() => {
    return nodes
      .filter(n => n.data?.type) // Check if node has a type property in data
      .map(n => n.data.type);
  }, [nodes]);

  const handleAddNode = (type: string, position?: { x: number, y: number }) => {
     const id = Math.random().toString(36).substr(2, 9);
     
     // Default to center if no position provided
     const finalPos = position || { 
       x: window.innerWidth / 2 - 150, // rough center with card offset
       y: window.innerHeight / 2 - 100 
     };

     addNodes({
       id,
       type: 'darkNode',
       position: finalPos,
       data: { 
         title: type, 
         label: `Define your ${type} strategy here.`,
         type: type 
       },
     });
  };

  const onDragOver = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = React.useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // projected position from screen to flow coords
      const position = project({
        x: event.clientX,
        y: event.clientY - 40,
      });

      handleAddNode(type, position);
    },
    [project]
  );

  return (
    <div style={{ width: '100%', height: '100%' }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={2}
      >
        <Background gap={20} color="#1A3326" />
        
        <Panel position="bottom-center" style={{ marginBottom: '24px' }}>
          <RequiredDecisionsBar 
            completedIds={completedIds}
            onAddNode={(type) => handleAddNode(type)} 
            onToggleChecklist={() => setIsChecklistOpen(!isChecklistOpen)}
          />
        </Panel>

        <ChecklistPanel 
          isOpen={isChecklistOpen}
          onClose={() => setIsChecklistOpen(false)}
          completedIds={completedIds}
          onAddNode={(type) => {
            handleAddNode(type);
            // Optional: close panel on add or keep open
          }}
        />

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
