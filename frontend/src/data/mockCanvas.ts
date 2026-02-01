import type { Edge, Node } from 'reactflow';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'darkNode',
    position: { x: 100, y: 100 },
    data: { 
      title: 'Foundation', 
      label: 'Define the core problem and user segment.',
      type: 'Foundation'
    },
  },
  {
    id: '2',
    type: 'paperNode',
    position: { x: 400, y: 100 },
    data: { 
      title: 'Core Loop', 
      label: 'User signs up -> Creates Project -> Invites Team',
      progress: 60
    },
  },
  {
    id: '3',
    type: 'darkNode',
    position: { x: 750, y: 50 },
    data: { 
      title: 'Hypothesis A', 
      label: 'Teams need real-time collaboration.',
      type: 'Hypothesis'
    },
  },
  {
    id: '4',
    type: 'darkNode',
    position: { x: 750, y: 200 },
    data: { 
      title: 'Draft V1', 
      label: 'Initial mockups for the dashboard.',
      type: 'Draft' 
    },
  },
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true, style: { stroke: '#9CABA3', opacity: 0.5 } },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', style: { stroke: '#9CABA3', opacity: 0.5 } },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', style: { stroke: '#9CABA3', opacity: 0.5 } },
];
