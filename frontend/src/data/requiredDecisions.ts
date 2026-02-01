import { 
  DollarSign, 
  Target, 
  Share2, 
  AlertTriangle, 
  Users, 
  Layers, 
  PieChart,
  Percent,
  Rocket,
  Lock,
  Flag,
  GitBranch,
  Megaphone
} from 'lucide-react';

export interface RequiredDecision {
  id: string;
  label: string;
  icon: any; // Lucide icon component
  description: string;
  type: string; // Matches node.data.type
}

export const REQUIRED_DECISIONS: RequiredDecision[] = [
  {
    id: 'pricing-model',
    label: 'Pricing Model',
    icon: DollarSign,
    description: 'Define your revenue streams and pricing strategy.',
    type: 'PRICING',
  },
  {
    id: 'target-market',
    label: 'Target Market',
    icon: Target,
    description: 'Identify your primary customer segments and beachhead market.',
    type: 'MARKET',
  },
  {
    id: 'distribution',
    label: 'Distribution',
    icon: Share2,
    description: 'Plan how you will reach and acquire customers.',
    type: 'DISTRIBUTION',
  },
  {
    id: 'problem-space',
    label: 'Problem Space',
    icon: AlertTriangle,
    description: 'Articulate the core pain points you are solving.',
    type: 'PROBLEM',
  },
  {
    id: 'user-segments',
    label: 'User Segments',
    icon: Users,
    description: 'Detailed personas of your ideal users.',
    type: 'SEGMENT',
  },
  {
    id: 'solution-arch',
    label: 'Solution Arch',
    icon: Layers,
    description: 'High-level technical or functional architecture.',
    type: 'SOLUTION',
  },
  {
    id: 'market-sizing',
    label: 'Market Sizing',
    icon: PieChart,
    description: 'TAM, SAM, and SOM analysis.',
    type: 'SIZING',
  },
  {
    id: 'equity',
    label: 'Equity',
    icon: Percent,
    description: 'Structure of ownership and equity distribution.',
    type: 'EQUITY',
  },
  {
    id: 'launch',
    label: 'Launch',
    icon: Rocket,
    description: 'Strategy for the initial product launch.',
    type: 'LAUNCH',
  },
  {
    id: 'friction',
    label: 'Friction',
    icon: Lock,
    description: 'Decide between pay-to-play vs free entry models.',
    type: 'FRICTION',
  },
  {
    id: 'pit-stop',
    label: 'Pit Stop',
    icon: Flag,
    description: 'Choose between pure research vs interim revenue focus.',
    type: 'PIT_STOP',
  },
  {
    id: 'evolution',
    label: 'Evolution',
    icon: GitBranch,
    description: 'Decision to cannibalize or protect the core business.',
    type: 'EVOLUTION',
  },
  {
    id: 'gtm-narrative',
    label: 'GTM Narrative',
    icon: Megaphone,
    description: 'Positioning: better features vs creating a new category.',
    type: 'NARRATIVE',
  },
];
