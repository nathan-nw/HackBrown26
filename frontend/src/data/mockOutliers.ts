import type { PortfolioItem } from './mockPortfolio';

export interface OutlierCompany {
  id: string;
  name: string;
  iconSvg: string;
  items: PortfolioItem[];
}

export const mockOutliers: OutlierCompany[] = [
  {
    id: 'apple',
    name: 'Apple',
    iconSvg: '<svg viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.1 2.1-.74 3.4-.6 1.48.17 2.6.96 3.32 2.01-3.34 1.76-2.73 5.86.37 7.02-.27.8-.57 1.58-1.12 2.37-.87 1.25-1.68 1.26-1.05 1.37zM12.9 6.47c-.2-1.55 1.05-3.1 2.5-3.47.38 1.95-2.27 3.84-2.5 3.47z"></path></svg>',
    items: [
      {
        id: 'apple-1',
        title: 'Wedge',
        category: 'STRATEGY',
        description: 'Design + usability as the product moat.',
        wedgeLabel: 'Focus',
        wedgeValue: 'Consumer Experience',
        strategicFit: 98,
        marketRisk: 'Medium',
        validationProgress: 100,
      },
      {
        id: 'apple-2',
        title: 'Distribution',
        category: 'GROWTH',
        description: 'Premium retail + brand obsession.',
        wedgeLabel: 'Channel',
        wedgeValue: 'Direct Retail',
        strategicFit: 95,
        marketRisk: 'Low',
        validationProgress: 100,
      },
      {
        id: 'apple-3',
        title: 'Differentiation',
        category: 'PRODUCT',
        description: 'Integrated hardware/software ecosystem.',
        wedgeLabel: 'Moat',
        wedgeValue: 'Walled Garden',
        strategicFit: 99,
        marketRisk: 'Low',
        validationProgress: 100,
      }
    ]
  },
  {
    id: 'google',
    name: 'Google',
    iconSvg: '<svg viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.1-1.147 8.24-3.387 2.16-2.16 2.853-5.213 2.853-7.613 0-.747-.08-1.48-.213-2.08h-10.88z"></path></svg>',
    items: [
      {
        id: 'google-1',
        title: 'Search Algorithm',
        category: 'CORE TECH',
        description: 'PageRank gave significantly better results than competitors.',
        wedgeLabel: 'Tech',
        wedgeValue: 'PageRank',
        strategicFit: 99,
        marketRisk: 'High',
        validationProgress: 100,
      },
      {
        id: 'google-2',
        title: 'Business Model',
        category: 'MONETIZATION',
        description: 'AdWords introduced auction-based targeted advertising.',
        wedgeLabel: 'Revenue',
        wedgeValue: 'CPC Auction',
        strategicFit: 97,
        marketRisk: 'Medium',
        validationProgress: 100,
      }
    ]
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 48"><path d="m43.2 33.5-.2-.6c-.2-.4-.3-.8-.5-1.1-.2-.4-.3-.8-.5-1.1l-.6-1.2-.1-.1C38 22.2 34.6 15.3 31.2 8.7l-.1-.3c-.4-.7-.8-1.4-1.1-2.2l-.2-.2c-.4-.8-.9-1.6-1.6-2.4-1.5-1.9-3.8-3-6.2-3-2.4 0-4.6 1-6.2 2.9-.7.9-1.2 1.8-1.7 2.6-.4.7-.7 1.5-1.1 2.2l-.1.3C9 16.1 5.6 22.9 2.7 29.3l-.1.1c-.2.4-.4.8-.5 1.2-.2.4-.3.7-.5 1.1-.2.5-.5 1.1-.7 1.7-.6 1.8-.8 3.5-.6 5.2.5 3.6 2.9 6.6 6.3 8 1.2.5 2.5.8 3.9.8.4 0 .9-.1 1.3-.1 1.6-.2 3.3-.7 4.8-1.6 1.8-1 3.5-2.4 5.5-4.5 1.9 2 3.7 3.4 5.5 4.5 1.5.9 3.1 1.4 4.8 1.6.3 0 .8.1 1.3.1 1.4 0 2.8-.3 3.9-.8 3.3-1.3 5.7-4.4 6.3-8 .1-1.5-.1-3.2-.7-5.1zm-25.5-8.7c.1-.6.3-1.2.6-1.7.8-1.2 2.1-1.8 3.6-1.8 1.6 0 2.9.7 3.6 1.8.4.5.6 1.1.7 1.7.1.8.1 1.7-.1 2.6-.5 2.2-1.9 4.9-4.2 7.9-2.2-2.9-3.7-5.6-4.2-7.9-.1-1-.1-1.8 0-2.6zM30 28.4c.3-1.4.4-2.7.2-4.1-.2-1.2-.6-2.4-1.3-3.3-1.5-2.2-4-3.5-6.9-3.5-2.8 0-5.3 1.3-6.9 3.5-.7 1-1.1 2.1-1.3 3.3-.2 1.3-.1 2.7.2 4.1.7 3 2.5 6.4 5.4 10.1-1.7 1.9-3.3 3.2-4.8 4.1-1.1.6-2.2 1-3.3 1.1-1.1.1-2.2 0-3.3-.4-2.1-.9-3.6-2.8-3.9-5-.1-1.3 0-2.3.5-3.5.1-.3.2-.6.4-.9.1-.2.1-.3.2-.5.3-.7.7-1.5 1-2.3V31c3.4-7.2 6.8-14.2 10.1-20.6l.1-.3c.2-.3.4-.7.6-1.1.2-.4.4-.7.6-1.1.4-.8.8-1.4 1.2-1.9.9-1 2-1.5 3.3-1.5s2.4.5 3.3 1.5c.4.5.8 1.1 1.2 1.9.2.3.4.7.5 1.1.2.4.4.7.5 1l.1.3c3.5 6.8 6.8 13.7 10 20.5l.1.2c.2.4.3.7.5 1.1.2.4.4.8.5 1.1.1.2.1.3.2.5.2.3.3.6.4.9.4 1.2.5 2.3.3 3.3-.3 2.2-1.8 4.1-3.9 5-1 .4-2.1.6-3.2.4-1.1-.1-2.2-.5-3.3-1.1-1.5-.8-3-2.1-4.8-4.1 3-3.3 4.8-6.7 5.5-9.7z"></path></svg>',
    items: [
      {
        id: 'airbnb-1',
        title: 'Trust',
        category: 'PLATFORM',
        description: 'Solved the stranger-danger problem with reviews and insurance.',
        wedgeLabel: 'Mechanism',
        wedgeValue: 'Two-sided Reviews',
        strategicFit: 90,
        marketRisk: 'High',
        validationProgress: 100,
      },
      {
        id: 'airbnb-2',
        title: 'Design',
        category: 'GROWTH',
        description: 'Founders personally took high-quality photos of listings.',
        wedgeLabel: 'Tactic',
        wedgeValue: 'Professional Photos',
        strategicFit: 94,
        marketRisk: 'Medium',
        validationProgress: 100,
      }
    ]
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 163.3 108"><path d="M60.9,32.2v-9.7c1-0.1,1.9-0.1,2.9-0.1c26.7-0.8,44.2,23,44.2,23S89.1,71.5,68.8,71.5c-2.7,0-5.3-0.4-7.9-1.3 V40.7c10.4,1.3,12.5,5.8,18.7,16.2l13.9-11.7c0,0-10.2-13.3-27.2-13.3C64.5,31.9,62.7,32,60.9,32.2 M60.9,0v14.5l2.9-0.2 c37.1-1.3,61.3,30.4,61.3,30.4S97.3,78.6,68.4,78.6c-2.5,0-5-0.2-7.5-0.7v9c2,0.2,4.1,0.4,6.2,0.4c26.9,0,46.4-13.8,65.3-30 c3.1,2.5,15.9,8.6,18.6,11.2c-17.9,15-59.7,27.1-83.4,27.1c-2.3,0-4.4-0.1-6.6-0.4V108h102.3V0C163.3,0,60.9,0,60.9,0z M60.9,70.3 v7.7C36,73.5,29.1,47.6,29.1,47.6s12-13.2,31.8-15.4v8.4h-0.1c-10.4-1.3-18.6,8.5-18.6,8.5S46.9,65.5,60.9,70.3 M16.7,46.5 c0,0,14.7-21.8,44.2-24v-7.9C28.2,17.2,0,44.8,0,44.8s16,46.3,60.9,50.5v-8.4C27.9,82.8,16.7,46.5,16.7,46.5z"></path></svg>',
    items: [
      {
        id: 'nvidia-1',
        title: 'GPU Compute',
        category: 'HARDWARE',
        description: 'Did not just build graphics for games, but parallel compute for AI.',
        wedgeLabel: 'Pivot',
        wedgeValue: 'CUDA Platform',
        strategicFit: 96,
        marketRisk: 'High',
        validationProgress: 100,
      }
    ]
  },
  {
    id: 'stripe',
    name: 'Stripe',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.423-.977 1.667 0 3.379.642 4.558 1.22l.666-4.111c-.935-.446-2.847-1.177-5.49-1.177-1.87 0-3.425.489-4.536 1.401-1.155.954-1.757 2.334-1.757 4 0 3.023 1.847 4.312 4.847 5.403 1.936.688 2.579 1.178 2.579 1.934 0 .732-.629 1.155-1.762 1.155-1.403 0-3.716-.689-5.231-1.578l-.674 4.157c1.304.732 3.705 1.488 6.197 1.488 1.976 0 3.624-.467 4.735-1.356 1.245-.977 1.89-2.422 1.89-4.289 0-3.091-1.889-4.38-4.935-5.468h.002z"></path></svg>',
    items: [
      {
        id: 'stripe-1',
        title: 'Developer EXP',
        category: 'PRODUCT',
        description: '7 lines of code to accept payments.',
        wedgeLabel: 'User',
        wedgeValue: 'Developers',
        strategicFit: 98,
        marketRisk: 'Medium',
        validationProgress: 100,
      }
    ]
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    iconSvg: '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>',
    items: [
      {
        id: 'whatsapp-1',
        title: 'Network Effect',
        category: 'GROWTH',
        description: 'Zero marketing spend, viral growth through status updates.',
        wedgeLabel: 'Strategy',
        wedgeValue: 'Status',
        strategicFit: 94,
        marketRisk: 'Low',
        validationProgress: 100,
      }
    ]
  },
  {
    id: 'reddit',
    name: 'Reddit',
    iconSvg: '<svg viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.094z"></path></svg>',
    items: [
      {
        id: 'reddit-1',
        title: 'Pseudo-Anonymity',
        category: 'COMMUNITY',
        description: 'Focus on content rather than identity.',
        wedgeLabel: 'Value',
        wedgeValue: 'Authenticity',
        strategicFit: 92,
        marketRisk: 'Medium',
        validationProgress: 100,
      }
    ]
  },
  {
    id: 'doordash',
    name: 'DoorDash',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path class="a" d="M32.4813,35.0374l-6.9545.0158-7.8326-8.3746,15.0819-.0769a2.659,2.659,0,0,0,2.6456-2.659h0a2.6591,2.6591,0,0,0-2.671-2.659l-19.51.0874L4.5,12.9468l27.9576.0033A11.0436,11.0436,0,0,1,43.5,23.9938h0A11.0436,11.0436,0,0,1,32.4813,35.0374Z"/></svg>',
    items: [
      {
        id: 'doordash-1',
        title: 'Suburbs',
        category: 'MARKET',
        description: 'Focused on unserved suburban markets instead of cities.',
        wedgeLabel: 'Geo',
        wedgeValue: 'Suburbs',
        strategicFit: 88,
        marketRisk: 'High',
        validationProgress: 100,
      }
    ]
  }
];
