export interface CaseStudy {
  id: string;
  name: string;
  stage: string;
  description: string;
  radar: {
    novelty: number;
    coherence: number;
    execution: number;
    pacing: number;
  };
  coreStrategy: {
    primaryWedge: {
      title: string;
      description: string;
    };
    goToMarket?: {
      title: string;
      description?: string;
    };
    pricingAdvantage?: {
      title: string;
      description?: string;
      isWinner?: boolean;
    };
  };
  coherenceScore: number;
}

export const MY_CASES: CaseStudy[] = [
  {
    id: 'c1',
    name: 'Lumina',
    stage: 'Seed Stage',
    description: 'AI-driven architectural displacement layer.',
    radar: {
      novelty: 80,
      coherence: 65,
      execution: 70,
      pacing: 60
    },
    coreStrategy: {
      primaryWedge: {
        title: 'Enterprise-First',
        description: 'High-touch architectural displacement for Fortune 500 infrastructure.'
      },
      goToMarket: {
        title: 'Top-Down Sales'
      }
    },
    coherenceScore: 45
  },
  {
    id: 'c2',
    name: 'Nexus',
    stage: 'Pre-Seed',
    description: 'Decentralized data availability layer.',
    radar: {
      novelty: 90,
      coherence: 50,
      execution: 40,
      pacing: 80
    },
    coreStrategy: {
      primaryWedge: {
        title: 'Developer SDK',
        description: 'Open source primitive for crypto-native builders.'
      },
      goToMarket: {
        title: 'Community-Led'
      }
    },
    coherenceScore: 55
  },
  {
    id: 'c3',
    name: 'FlowState',
    stage: 'Series A',
    description: 'Productivity engine for remote teams.',
    radar: {
      novelty: 40,
      coherence: 90,
      execution: 95,
      pacing: 75
    },
    coreStrategy: {
      primaryWedge: {
        title: 'Team-Based Freemium',
        description: 'Viral adoption through bottom-up team invites.'
      },
      goToMarket: {
        title: 'PLG'
      }
    },
    coherenceScore: 82
  },
  {
    id: 'c4',
    name: 'Vault',
    stage: 'Seed Stage',
    description: 'Secure enclave as a service.',
    radar: {
      novelty: 75,
      coherence: 80,
      execution: 60,
      pacing: 50
    },
    coreStrategy: {
      primaryWedge: {
        title: 'Compliance API',
        description: 'Solve SOC2 instantly for fintech startups.'
      },
      goToMarket: {
        title: 'Channel Partners'
      }
    },
    coherenceScore: 70
  },
  {
    id: 'c5',
    name: 'Spectra',
    stage: 'Series B',
    description: 'Hyperspectral imaging platform.',
    radar: {
      novelty: 95,
      coherence: 85,
      execution: 80,
      pacing: 90
    },
    coreStrategy: {
      primaryWedge: {
        title: 'Defense Contracts',
        description: 'Government-first procurement strategy.'
      },
      goToMarket: {
        title: 'Direct Sales'
      }
    },
    coherenceScore: 78
  },
  {
    id: 'c6',
    name: 'Pulse',
    stage: 'Seed Stage',
    description: 'Real-time consumer sentiment analysis.',
    radar: {
      novelty: 60,
      coherence: 70,
      execution: 75,
      pacing: 85
    },
    coreStrategy: {
      primaryWedge: {
        title: 'Brand Agencies',
        description: 'Selling data directly to marketing firms.'
      },
      goToMarket: {
        title: 'Outbound'
      }
    },
    coherenceScore: 65
  }
];

export const SEQUENTIAL_OUTLIERS: CaseStudy[] = [
  {
    id: 'o1',
    name: 'Vector',
    stage: 'Series A',
    description: 'High-velocity API integration methodology.',
    radar: {
      novelty: 70,
      coherence: 95,
      execution: 90,
      pacing: 92
    },
    coreStrategy: {
      primaryWedge: {
        title: 'SMB & Startups',
        description: 'API-first integration for rapid developer adoption and network effects.'
      },
      pricingAdvantage: {
        title: 'Usage-Based Model',
        isWinner: true
      }
    },
    coherenceScore: 92
  },
  {
    id: 'o2',
    name: 'Figma',
    stage: 'Sequential Outlier',
    description: 'Collaborative interface design tool.',
    radar: {
      novelty: 95,
      coherence: 98,
      execution: 95,
      pacing: 88
    },
    coreStrategy: {
      primaryWedge: {
        title: 'Browser-First',
        description: 'Removing friction of local files for real-time multiplayer.'
      },
      pricingAdvantage: {
        title: 'Free for Individuals',
        isWinner: true
      }
    },
    coherenceScore: 96
  },
  {
    id: 'o3',
    name: 'Stripe',
    stage: 'Sequential Outlier',
    description: 'Payments infrastructure for the internet.',
    radar: {
      novelty: 85,
      coherence: 99,
      execution: 98,
      pacing: 90
    },
    coreStrategy: {
      primaryWedge: {
        title: '7 Lines of Code',
        description: 'Radical simplicity for developers.'
      },
      pricingAdvantage: {
        title: 'Pay-as-you-go',
        isWinner: true
      }
    },
    coherenceScore: 98
  },
  {
    id: 'o4',
    name: 'Snowflake',
    stage: 'Sequential Outlier',
    description: 'Cloud data warehouse.',
    radar: {
      novelty: 90,
      coherence: 92,
      execution: 90,
      pacing: 85
    },
    coreStrategy: {
      primaryWedge: {
        title: 'Decoupled Compute/Storage',
        description: 'Architectural advantage enabling infinite scaling.'
      },
      pricingAdvantage: {
        title: 'Consumption Based',
        isWinner: true
      }
    },
    coherenceScore: 91
  },
  {
    id: 'o5',
    name: 'Datadog',
    stage: 'Sequential Outlier',
    description: 'Cloud monitoring as a service.',
    radar: {
      novelty: 60,
      coherence: 95,
      execution: 99,
      pacing: 92
    },
    coreStrategy: {
      primaryWedge: {
        title: 'Infrastructure & APM',
        description: 'Unified view of the stack for devops.'
      },
      pricingAdvantage: {
        title: 'Host-based Pricing',
        isWinner: true
      }
    },
    coherenceScore: 94
  },
  {
    id: 'o6',
    name: 'Notion',
    stage: 'Sequential Outlier',
    description: 'All-in-one workspace.',
    radar: {
      novelty: 88,
      coherence: 90,
      execution: 85,
      pacing: 80
    },
    coreStrategy: {
      primaryWedge: {
        title: 'Personal Wiki',
        description: 'Individual adoption leading to team adoption.'
      },
      pricingAdvantage: {
        title: 'Personal Pro',
        isWinner: false
      }
    },
    coherenceScore: 89
  }
];
