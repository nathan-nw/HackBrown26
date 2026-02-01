import React, { useCallback, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  ReactFlowProvider,
  useReactFlow,
  Panel,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import type { NodeChange, EdgeChange, Connection } from 'reactflow';
import 'reactflow/dist/style.css';

import { DarkNode, PaperNode } from './Nodes';
import '../styles/canvas.css';
import { Button } from './ui/Button';
import { Maximize, Plus, Minus, ChevronUp, ChevronDown } from 'lucide-react';
import { RequiredDecisionsBar } from './Canvas/RequiredDecisionsBar';
import { REQUIRED_DECISIONS } from '../data/requiredDecisions';
import { ChecklistPanel } from './Canvas/ChecklistPanel';
import { useSocket } from '../hooks/useSocket';
import { Cursors } from './Canvas/Cursors';
import { NodeEditModal } from './modals/NodeEditModal';



interface CanvasContentProps {
  ideaId?: string;
}

const CanvasContent = ({ ideaId }: CanvasContentProps) => {
  const { fitView, addNodes, project, zoomIn, zoomOut } = useReactFlow();

  const nodeTypes = React.useMemo(() => ({
    darkNode: DarkNode,
    paperNode: PaperNode,
  }), []);

  const [nodes, setNodesState] = React.useState<any[]>([]);
  const [edges, setEdgesState] = React.useState<any[]>([]);
  const [isChecklistOpen, setIsChecklistOpen] = React.useState(false);
  const [isControlsOpen, setIsControlsOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [editingNode, setEditingNode] = React.useState<any>(null);
  const isDragging = React.useRef(false);

  const handleEditNode = useCallback((nodeId: string) => {
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
          setEditingNode(node);
      }
  }, [nodes]);

  const handleSaveNode = useCallback((nodeId: string, newData: any) => {
      setNodesState((nds) => nds.map((node) => {
          if (node.id === nodeId) {
              const updatedNode = { 
                  ...node, 
                  data: { ...node.data, ...newData }
              };
              
              // Emit update if socket is connected (Need custom event or use 'replace' if supported by backend logic, 
              // but for now local update + optimistic UI)
              // Ideally: backend.post('/api/nodes/update', updatedNode)
              
              return updatedNode;
          }
          return node;
      }));
  }, []);

  // Inject handlers into nodes
  const nodesWithHandlers = React.useMemo(() => {
      return nodes.map(node => ({
          ...node,
          data: {
              ...node.data,
              onEdit: (id: string) => handleEditNode(id)
          }
      }));
  }, [nodes, handleEditNode]);

  // Socket connection
  // Generate a random user ID/name for now since we don't have auth
  const [userName] = React.useState(() => 'User ' + Math.floor(Math.random() * 1000));
  const { socket, users, moveCursor, emitNodeChange, emitEdgeChange, isConnected } = useSocket(ideaId || 'default', userName);

  // Fetch initial data based on ideaId
  React.useEffect(() => {
    const fetchCanvasData = async () => {
      setLoading(true);
      try {
        const idToFetch = ideaId || 'default';
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ideas/${idToFetch}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        // Reset the flow with fetched data
        setNodesState(data.nodes || []);
        setEdgesState(data.edges || []);
        
        // Fit view after a tick to allow rendering
        setTimeout(() => fitView({ padding: 0.2 }), 50);

      } catch (error) {
        console.error('Error loading canvas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCanvasData();
  }, [ideaId]);

  // Handle incoming socket events
  useEffect(() => {
    if (!socket) return;

    const handleNodeChange = (changes: NodeChange[]) => {
      setNodesState((nds) => applyNodeChanges(changes, nds));
    };

    const handleEdgeChange = (changes: EdgeChange[]) => {
      setEdgesState((eds) => applyEdgeChanges(changes, eds));
    };

    socket.on('node_change', handleNodeChange);
    socket.on('edge_change', handleEdgeChange);
    
    // Handle full board sync
    socket.on('board_sync', (board: { nodes: any[], edges: any[] }) => {
        // We only sync if we are not interacting to avoid jitter
        if (!isDragging.current) {
            if (board.nodes) setNodesState(board.nodes);
            if (board.edges) setEdgesState(board.edges);
        }
    });

    return () => {
      socket.off('node_change', handleNodeChange);
      socket.off('edge_change', handleEdgeChange);
      socket.off('board_sync');
    };
  }, [socket]);


  // Derive completed IDs from current nodes
  const completedIds = React.useMemo(() => {
    return nodes
      .filter(n => n.data?.type) // Check if node has a type property in data
      .map(n => n.data.type);
  }, [nodes]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Project screen coordinates to world coordinates
    // Assuming header is ~40px, but better to use clientY directly if project handles it loosely
    // We used -40 in drop, let's try to be consistent or just use clientY and see if standard project works.
    // Note: project takes coordinates relative to the flow pane.
    // If we use onMouseMove on the wrapper, clientY is screen.
    const position = project({ x: e.clientX, y: e.clientY - 40 });
    moveCursor(position.x, position.y);
  }, [project, moveCursor]);

  const handleAddNode = (type: string, position?: { x: number, y: number }) => {
     const id = Math.random().toString(36).substr(2, 9);
     
     // Default to center if no position provided
     const finalPos = position || { 
       x: window.innerWidth / 2 - 150, // rough center with card offset
       y: window.innerHeight / 2 - 100 
     };

     const decision = REQUIRED_DECISIONS.find(d => d.type === type);
     
     const newNode = {
       id,
       type: 'darkNode',
       position: finalPos,
       data: { 
         title: decision?.label || type, 
         label: decision?.description || `Define your ${type} strategy here.`, // Use description as the "detailed one-line"
         type: type 
       },
     };

     addNodes(newNode);
     
     // Emit add change
     emitNodeChange([{ type: 'add', item: newNode }]);
  };

  // Update cursor during drag-to-add
  const onDragOver = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    
    // Track cursor
    const position = project({ x: event.clientX, y: event.clientY - 40 });
    moveCursor(position.x, position.y);
  }, [project, moveCursor]);

  // Update cursor during node dragging
  const onNodeDrag = React.useCallback((event: React.MouseEvent, _node: any) => {
      const position = project({ x: event.clientX, y: event.clientY - 40 });
      moveCursor(position.x, position.y);
  }, [project, moveCursor]);

  const onNodeDragStart = React.useCallback(() => {
      isDragging.current = true;
  }, []);

  const onNodeDragStop = React.useCallback(() => {
      isDragging.current = false;
  }, []);

  const onDrop = React.useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = project({
        x: event.clientX,
        y: event.clientY - 40,
      });

      handleAddNode(type, position);
    },
    [project]
  );

  const onConnect = React.useCallback(
    (params: Connection) => {
      const newEdge = { 
        ...params, 
        className: 'connection-glow',
        type: 'default',
        animated: true,
      };
      setEdgesState((eds) => addEdge(newEdge, eds));
      // Emit add change for edge
      // Edge add change type requires 'item'
      // But addEdge returns the array.
      // We can construct the 'add' change.
      // Wait, params is Connection, newEdge is Edge.
      // We need to generate ID for edge if not present?
      // addEdge generates id if not present.
      // But to emit 'add', we need the final edge object.
      // Let's create the edge object with ID first.
      const edgeWithId = { ...newEdge, id: `e${params.source}-${params.target}` };
       setEdgesState((eds) => addEdge(edgeWithId, eds)); // Re-do but with ID
       emitEdgeChange([{ type: 'add', item: edgeWithId }]);
    },
    [emitEdgeChange]
  );

  const onNodesChange = useCallback((changes: NodeChange[]) => {
      // Apply changes locally immediately for responsive UI
      setNodesState((nds) => applyNodeChanges(changes, nds));
      // Then broadcast to other clients
      emitNodeChange(changes);
  }, [emitNodeChange]);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
      // Apply changes locally immediately for responsive UI
      setEdgesState((eds) => applyEdgeChanges(changes, eds));
      // Then broadcast to other clients
      emitEdgeChange(changes);
  }, [emitEdgeChange]);

  if (loading) {
    return <div className="flex items-center justify-center h-full text-white">Loading...</div>;
  }

  return (
    <div 
      style={{ width: '100%', height: '100%' }} 
      onDrop={onDrop} 
      onDragOver={onDragOver}
      onMouseMove={handleMouseMove}
    >
      <ReactFlow
        nodes={nodesWithHandlers}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDrag={onNodeDrag}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
        onPaneMouseMove={handleMouseMove}
      >
        <Background gap={20} color="#1A3326" />
        <Cursors users={users} />
        
        <Panel position="top-right" style={{ margin: '16px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(5, 22, 16, 0.8)', 
            padding: '8px 12px', 
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: isConnected ? '#4ADE80' : '#EF4444',
              boxShadow: isConnected ? '0 0 8px #4ADE80' : 'none',
              transition: 'background-color 0.3s ease'
            }} />
            <span style={{ 
                color: isConnected ? '#4ADE80' : '#EF4444', 
                fontSize: '12px', 
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.02em'
            }}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </Panel>

        
        <Panel position="bottom-left" className="bottom-left-controls" style={{ marginBottom: '80px', marginLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
           {isControlsOpen && (
             <>
               <Button variant="icon" onClick={() => zoomIn()} title="Zoom In">
                 <Plus size={20} />
               </Button>
               <Button variant="icon" onClick={() => zoomOut()} title="Zoom Out">
                 <Minus size={20} />
               </Button>
               <Button variant="icon" onClick={() => fitView({ padding: 0.2 })} title="Fit View">
                 <Maximize size={20} />
               </Button>
             </>
           )}
           <Button variant="icon" onClick={() => setIsControlsOpen(!isControlsOpen)} title={isControlsOpen ? "Hide Controls" : "Show Controls"}>
             {isControlsOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
           </Button>
        </Panel>
      </ReactFlow>

      {/* Overlays positioned relative to the container */}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 5
      }}>
        <RequiredDecisionsBar 
          completedIds={completedIds}
          onAddNode={(type) => handleAddNode(type)} 
          onToggleChecklist={() => setIsChecklistOpen(!isChecklistOpen)}
        />
      </div>

      <ChecklistPanel 
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        completedIds={completedIds}
        onAddNode={(type) => {
          handleAddNode(type);
        }}
      />

      <NodeEditModal 
        isOpen={!!editingNode}
        node={editingNode}
        onClose={() => setEditingNode(null)}
        onSave={handleSaveNode}
      />
    </div>
  );
};

export const CanvasBoard = ({ ideaId }: { ideaId?: string }) => {
  return (
    <div className="canvas-area">
      <ReactFlowProvider>
        <CanvasContent ideaId={ideaId} />
      </ReactFlowProvider>
    </div>
  );
};
