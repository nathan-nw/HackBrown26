import type { Edge, Node } from 'reactflow';

export const initialNodes: Node[] = [
  {
    id: '2',
    type: 'paperNode',
    position: { x: 400, y: 100 },
    data: { 
      category: 'DEFI INFRASTRUCTURE',
      title: 'Hyperion', 
      label: 'Hyperion', // Used as large title
      sublabel: 'High-frequency trading execution layer for decentralized exchanges on L2.',
      wedge: 'Latency Arbitrage',
      strategicFit: 94,
      marketRisk: 'MEDIUM',
      progress: 75
    },
  },
];

export const initialEdges: Edge[] = [];
