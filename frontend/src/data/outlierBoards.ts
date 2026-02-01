
import type { Node, Edge } from 'reactflow';

export type OutlierBoard = {
  id: string;
  title: string;
  subtitle?: string;
  nodes: Node[];
  edges: Edge[];
  insights: {
    strategicFitScore: number; // 0-100
    strategicFitText: string;
    suggestedActionTitle: string;
    suggestedActionBody: string;
    marketRiskLabel: "Low" | "Medium" | "High";
    marketRiskText: string;
  };
};

// Reusable edge style
const defaultEdgeStyle = { stroke: '#4ade80', strokeWidth: 2, opacity: 0.5 };
const animatedEdge = { type: 'default', animated: true, style: defaultEdgeStyle, className: 'connection-glow' };

export const OUTLIER_BOARDS: Record<string, OutlierBoard> = {
  'apple': {
    id: 'apple',
    title: 'Apple — 1976 Strategy',
    subtitle: 'Focus on personal computing experience and integrated design.',
    nodes: [
      { id: '1', type: 'paperNode', position: { x: 400, y: 100 }, data: { title: 'CORE LOOP', label: 'Integrated User Experience', sublabel: 'Control both hardware and software to ensure simplicity.', category: 'STRATEGY', wedge: 'Aesthetics', strategicFit: 98, marketRisk: 'Medium', progress: 100 } },
      { id: '2', type: 'darkNode', position: { x: 100, y: 300 }, data: { title: 'TARGET USER', label: 'Hobbyists & Educators', type: 'MARKET' } },
      { id: '3', type: 'darkNode', position: { x: 700, y: 300 }, data: { title: 'DISTRIBUTION', label: 'Specialty Retail', type: 'GROWTH' } },
      { id: '4', type: 'darkNode', position: { x: 400, y: 500 }, data: { title: 'PRICING', label: 'Premium Tier', type: 'BUSINESS' } },
      { id: '5', type: 'darkNode', position: { x: 400, y: -100 }, data: { title: 'WEDGE', label: 'Personal Computer Kit', type: 'PRODUCT' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', ...animatedEdge },
      { id: 'e1-3', source: '1', target: '3', ...animatedEdge },
      { id: 'e1-4', source: '1', target: '4', ...animatedEdge },
      { id: 'e5-1', source: '5', target: '1', ...animatedEdge },
    ],
    insights: {
      strategicFitScore: 98,
      strategicFitText: 'Exceptionally high. The focus on design differentiation is a perfect match for the emerging consumer market.',
      suggestedActionTitle: 'Scale Production',
      suggestedActionBody: 'Move from kit-based sales to fully assembled units (Apple II) to capture the mass market.',
      marketRiskLabel: 'Medium',
      marketRiskText: 'Competition from established electronics giants (IBM, HP) is the primary threat.'
    }
  },
  'google': {
    id: 'google',
    title: 'Google — 1998 Strategy',
    subtitle: 'Organize the world\'s information.',
    nodes: [
      { id: '1', type: 'paperNode', position: { x: 400, y: 100 }, data: { title: 'CORE LOOP', label: 'Better Search Results', sublabel: 'PageRank algorithm delivers relevant results, increasing retention.', category: 'CORE TECH', wedge: 'PageRank', strategicFit: 99, marketRisk: 'High', progress: 100 } },
      { id: '2', type: 'darkNode', position: { x: 100, y: 300 }, data: { title: 'MONETIZATION', label: 'Targeted Ads (AdWords)', type: 'BUSINESS' } },
      { id: '3', type: 'darkNode', position: { x: 700, y: 300 }, data: { title: 'INFRASTRUCTURE', label: 'Scalable Linux Clusters', type: 'TECH' } },
      { id: '4', type: 'darkNode', position: { x: 400, y: 500 }, data: { title: 'DISTRIBUTION', label: 'Viral / Word of Mouth', type: 'GROWTH' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', ...animatedEdge },
      { id: 'e1-3', source: '1', target: '3', ...animatedEdge },
      { id: 'e1-4', source: '1', target: '4', ...animatedEdge },
    ],
    insights: {
      strategicFitScore: 99,
      strategicFitText: 'The technical wedge is exceedingly strong. PageRank is 10x better than AltaVista.',
      suggestedActionTitle: 'Monetize Intents',
      suggestedActionBody: 'Users reveal high intent search queries. Auction off this intent to advertisers.',
      marketRiskLabel: 'High',
      marketRiskText: 'Yahoo and Microsoft could easily pivot or copy features given their resources.'
    }
  },
  'airbnb': {
    id: 'airbnb',
    title: 'Airbnb — 2008 Strategy',
    subtitle: 'Belong anywhere.',
    nodes: [
      { id: '1', type: 'paperNode', position: { x: 400, y: 100 }, data: { title: 'CORE LOOP', label: 'Trust & Transact', sublabel: 'Reviews and payments build trust between strangers.', category: 'PLATFORM', wedge: 'Design/Trust', strategicFit: 90, marketRisk: 'High', progress: 100 } },
      { id: '2', type: 'darkNode', position: { x: 100, y: 300 }, data: { title: 'SUPPLY', label: 'Airbeds & Spare Rooms', type: 'MARKET' } },
      { id: '3', type: 'darkNode', position: { x: 700, y: 300 }, data: { title: 'DEMAND', label: 'Conference Attendees', type: 'User' } },
      { id: '4', type: 'darkNode', position: { x: 400, y: 400 }, data: { title: 'GROWTH', label: 'Craigslist Crossposting', type: 'HACK' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', ...animatedEdge },
      { id: 'e1-3', source: '1', target: '3', ...animatedEdge },
      { id: 'e4-1', source: '4', target: '1', ...animatedEdge },
    ],
    insights: {
      strategicFitScore: 90,
      strategicFitText: 'Design-led founder team is solving the core trust issue effectively.',
      suggestedActionTitle: 'Focus on Photography',
      suggestedActionBody: 'Listings with professional photos convert 2x better. Scale the photography program.',
      marketRiskLabel: 'High',
      marketRiskText: 'Regulatory pushback from hotels and cities is a major existential risk.'
    }
  },
  'nvidia': {
    id: 'nvidia',
    title: 'Nvidia — 1993 Strategy',
    subtitle: 'Accelerated computing.',
    nodes: [
      { id: '1', type: 'paperNode', position: { x: 400, y: 100 }, data: { title: 'CORE LOOP', label: 'GPU Acceleration', sublabel: '3D Graphics for gaming and multimedia.', category: 'HARDWARE', wedge: 'Gaming', strategicFit: 96, marketRisk: 'High', progress: 100 } },
      { id: '2', type: 'darkNode', position: { x: 100, y: 300 }, data: { title: 'MARKET', label: 'PC Gamers', type: 'USER' } },
      { id: '3', type: 'darkNode', position: { x: 700, y: 300 }, data: { title: 'TECH', label: 'Quadrilaterals vs Triangles', type: 'RISK' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', ...animatedEdge },
      { id: 'e1-3', source: '1', target: '3', ...animatedEdge },
    ],
    insights: {
      strategicFitScore: 96,
      strategicFitText: 'Betting on 3D graphics is the right move for the future of computing.',
      suggestedActionTitle: 'Pivot to Standards',
      suggestedActionBody: 'Move away from proprietary NV1 quad rendering to standard texture mapping (DirectX/OpenGL).',
      marketRiskLabel: 'High',
      marketRiskText: 'Dozens of graphics chip competitors exist. Only the one with best software support will win.'
    }
  },
  'stripe': {
    id: 'stripe',
    title: 'Stripe — 2010 Strategy',
    subtitle: 'Increase the GDP of the internet.',
    nodes: [
      { id: '1', type: 'paperNode', position: { x: 400, y: 100 }, data: { title: 'CORE LOOP', label: 'Seamless Comparison', sublabel: '7 lines of code to accept payments.', category: 'PRODUCT', wedge: 'Dev Experience', strategicFit: 98, marketRisk: 'Medium', progress: 100 } },
      { id: '2', type: 'darkNode', position: { x: 200, y: 300 }, data: { title: 'USER', label: 'Developers / Startups', type: 'MARKET' } },
      { id: '3', type: 'darkNode', position: { x: 600, y: 300 }, data: { title: 'PROBLEM', label: 'Legacy Gateways (PayPal/Auth.net)', type: 'CONTEXT' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', ...animatedEdge },
      { id: 'e3-1', source: '3', target: '1', ...animatedEdge },
    ],
    insights: {
      strategicFitScore: 98,
      strategicFitText: 'Solving the developer pain point is a massive leverage point.',
      suggestedActionTitle: 'Expand Globally',
      suggestedActionBody: 'Internet commerce is global. Support more currencies and legal entities rapidly.',
      marketRiskLabel: 'Medium',
      marketRiskText: 'Banks could modernize, or huge players like PayPal could improve their API.'
    }
  },
  'whatsapp': {
    id: 'whatsapp',
    title: 'WhatsApp — 2009 Strategy',
    subtitle: 'No Ads. No Games. No Gimmicks.',
    nodes: [
      { id: '1', type: 'paperNode', position: { x: 400, y: 100 }, data: { title: 'CORE LOOP', label: 'Instant Status / Msg', sublabel: 'Free SMS alternative using data.', category: 'PRODUCT', wedge: 'Status Updates', strategicFit: 94, marketRisk: 'Low', progress: 100 } },
      { id: '2', type: 'darkNode', position: { x: 200, y: 300 }, data: { title: 'GROWTH', label: 'Address Book Import', type: 'VIRALITY' } },
      { id: '3', type: 'darkNode', position: { x: 600, y: 300 }, data: { title: 'PLATFORM', label: 'Cross-OS (iOS, Android, BB)', type: 'TECH' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', ...animatedEdge },
      { id: 'e1-3', source: '1', target: '3', ...animatedEdge },
    ],
    insights: {
      strategicFitScore: 94,
      strategicFitText: 'Extremely efficient growth loop via address book.',
      suggestedActionTitle: 'Maintain Simplicity',
      suggestedActionBody: 'Resist adding features. Speed and reliability are the core value props.',
      marketRiskLabel: 'Low',
      marketRiskText: 'Carrier SMS costs are high, so free data messaging is an inevitable shift.'
    }
  },
  'reddit': {
    id: 'reddit',
    title: 'Reddit — 2005 Strategy',
    subtitle: 'The front page of the internet.',
    nodes: [
      { id: '1', type: 'paperNode', position: { x: 400, y: 100 }, data: { title: 'CORE LOOP', label: 'User Submitted Content', sublabel: 'Voting system determines visibility.', category: 'COMMUNITY', wedge: 'News Aggregation', strategicFit: 92, marketRisk: 'Medium', progress: 100 } },
      { id: '2', type: 'darkNode', position: { x: 200, y: 300 }, data: { title: 'PROBLEM', label: 'Slashdot is too slow', type: 'CONTEXT' } },
      { id: '3', type: 'darkNode', position: { x: 600, y: 300 }, data: { title: 'GROWTH', label: 'Fake Accounts (initially)', type: 'HACK' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', ...animatedEdge },
      { id: 'e1-3', source: '1', target: '3', ...animatedEdge },
    ],
    insights: {
      strategicFitScore: 92,
      strategicFitText: 'Democratizing content curation is a powerful concept.',
      suggestedActionTitle: 'Enable Sub-communities',
      suggestedActionBody: 'Allow users to create their own subreddits to capture niche interests endlessly.',
      marketRiskLabel: 'Medium',
      marketRiskText: 'Digg is the massive incumbent. We need to be faster and less corporate.'
    }
  },
  'doordash': {
    id: 'doordash',
    title: 'DoorDash — 2013 Strategy',
    subtitle: 'Delivery for every restaurant.',
    nodes: [
      { id: '1', type: 'paperNode', position: { x: 400, y: 100 }, data: { title: 'CORE LOOP', label: 'Logistics Marketplace', sublabel: 'Connecting drivers, restaurants, and eaters.', category: 'LOGISTICS', wedge: 'Palo Alto Delivery', strategicFit: 88, marketRisk: 'High', progress: 100 } },
      { id: '2', type: 'darkNode', position: { x: 200, y: 300 }, data: { title: 'MARKET', label: 'Suburban Families', type: 'USER' } },
      { id: '3', type: 'darkNode', position: { x: 600, y: 300 }, data: { title: 'OPS', label: 'Tablet for Restaurants', type: 'TECH' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', ...animatedEdge },
      { id: 'e1-3', source: '1', target: '3', ...animatedEdge },
    ],
    insights: {
      strategicFitScore: 88,
      strategicFitText: 'Operations-heavy but the suburban wedge is unique vs Uber/Postmates.',
      suggestedActionTitle: 'Optimize Routing',
      suggestedActionBody: 'Batching orders and predicting prep times is the only way to unit economics.',
      marketRiskLabel: 'High',
      marketRiskText: 'The space is crowded with well-funded competitors (GrubHub, UberEats).'
    }
  }
};
