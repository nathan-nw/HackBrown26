import type { Edge, Node } from 'reactflow';

export const initialNodes: Node[] = [
  {
    id: '2',
    type: 'paperNode',
    position: { x: 400, y: 100 },
    data: { 
      title: 'CORE LOOP', 
      label: 'Solve for Power Users',
      sublabel: 'Prioritize depth of features over breadth. Focus on retention metrics for the top 5% of active users.',
      progress: 75
    },
  },
];

export const initialEdges: Edge[] = [];
