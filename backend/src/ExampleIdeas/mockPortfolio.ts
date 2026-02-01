export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  wedgeLabel: string;
  wedgeValue: string;
  strategicFit: number;
  marketRisk: 'Low' | 'Medium' | 'High';
  validationProgress: number;
}

export const mockPortfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'Hyperion',
    category: 'DEFI INFRASTRUCTURE',
    description: 'High-frequency trading execution layer for decentralized exchanges on L2.',
    wedgeLabel: 'Primary Wedge',
    wedgeValue: 'Latency Arbitrage',
    strategicFit: 94,
    marketRisk: 'Medium',
    validationProgress: 75,
  },
  {
    id: '2',
    title: 'Oasis',
    category: 'CONSUMER SOCIAL',
    description: 'Ephemeral social clusters for high-net-worth individuals centered around events.',
    wedgeLabel: 'Primary Wedge',
    wedgeValue: 'Event Gating',
    strategicFit: 88,
    marketRisk: 'High',
    validationProgress: 40,
  },
  {
    id: '3',
    title: 'Synthetix',
    category: 'GENERATIVE AI',
    description: 'Automated video synthesis for enterprise marketing campaigns at scale.',
    wedgeLabel: 'Primary Wedge',
    wedgeValue: 'Cost Reduction',
    strategicFit: 92,
    marketRisk: 'Low',
    validationProgress: 90,
  },
  {
    id: '4',
    title: 'Vertex',
    category: 'INDUSTRIAL IOT',
    description: 'Predictive maintenance sensors for legacy manufacturing equipment.',
    wedgeLabel: 'Primary Wedge',
    wedgeValue: 'Downtime Prevention',
    strategicFit: 85,
    marketRisk: 'Medium',
    validationProgress: 60,
  },
];
