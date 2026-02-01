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
    iconSvg: '<path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.1 2.1-.74 3.4-.6 1.48.17 2.6.96 3.32 2.01-3.34 1.76-2.73 5.86.37 7.02-.27.8-.57 1.58-1.12 2.37-.87 1.25-1.68 1.26-1.05 1.37zM12.9 6.47c-.2-1.55 1.05-3.1 2.5-3.47.38 1.95-2.27 3.84-2.5 3.47z"></path>',
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
    iconSvg: '<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.1-1.147 8.24-3.387 2.16-2.16 2.853-5.213 2.853-7.613 0-.747-.08-1.48-.213-2.08h-10.88z"></path>',
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
    iconSvg: '<path d="M22.513 15.548c-1.353-.61-3.69-1.574-4.225-3.085-.303-.86.294-1.996.113-2.793-.418-1.84-2.812-1.92-3.13-3.68-.13-1.378 1.077-2.227.18-3.414-.657-.872-2.338-.804-3.488-.06-.59.38-1.444.665-1.996 1.18-.707.662-1.282 2.383-.34 3.033.402.276 1.398-.217 1.58.293.308.868-2.678 3.518-2.617 4.22.09.995 2.13.91 1.763 2.05-.205.626-1.57.85-2.08.793-1.97-.22-3.435-1.94-4.832-3.238C1.59 12.637 0 14.885 0 17.587c0 4.195 4.39 6.208 7.91 6.262 5.56.082 8.783-2.658 11.41-4.708 1.15-.898 3.235-2.316 3.193-3.593z"></path>',
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
    iconSvg: '<path d="M12.43 0C6.34 0 .53 4.2.53 11.75c0 2.25.5 3.97 1.34 5.48l1.62-.97c-.67-1.18-1.06-2.58-1.06-4.51 0-6.42 4.93-9.92 9.99-9.92 5.09 0 10.03 3.5 10.03 9.92 0 1.93-.4 3.32-1.06 4.5l1.62.97c.84-1.51 1.34-3.23 1.34-5.48C24.34 4.2 18.52 0 12.43 0zm1.18 5.7c-3.1 0-4.67 1.83-4.67 4.51 0 1.13.25 1.99.64 2.66l1.65-.94c-.22-.38-.36-.89-.36-1.72 0-1.88 1-2.69 2.74-2.69 1.76 0 2.74.81 2.74 2.69 0 .84-.14 1.35-.36 1.72l1.65.94c.39-.67.64-1.54.64-2.66 0-2.69-1.57-4.51-4.67-4.51zm8.39 12.72c-.89 1.32-2.32 2.77-5.06 4.09l.75 1.77c3.27-1.59 5.06-3.36 6.15-5.03l-1.84-.83zM1.98 18.42l-1.84.83c1.09 1.67 2.88 3.44 6.15 5.03l.75-1.77c-2.74-1.32-4.17-2.77-5.06-4.09z"></path>',
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
    iconSvg: '<path d="M13.9 12.2c0 2.1-1.6 3.1-3.1 3.1-2.9 0-3.3-2.1-5.3-2.1-1 0-1.6.4-1.6.9 0 .5.3.8 1.4.9 2.1.2 4.6 1.2 4.6 3.6 0 2.2-1.8 3.4-4.5 3.4-2.7 0-4.4-1.1-4.4-3 0-1 .5-1.5.8-1.9l2 1.3c-.3.2-.4.4-.4.7 0 .4.4 1.9.8 1.6 0 2.1-.6 2.1-1.4 0-.8-.7-1.1-1.7-1.2-2.3-.3-4.3-1.4-4.3-3.5 0-2.1 1.7-3.1 4.2-3.1 2.3 0 3.8.9 3.8 2.7 0 .6-.2 1.1-.6 1.4l-1.9-1.2c.2-.2.3-.3.3-.6 0-.6-.7-.8-1.7-.8-1.3 0-1.8.5-1.8 1.1 0 .6.7.9 1.9.9 2 .2 3.8.7 3.8 3.1h4.5V1.2h-4.5v11z"></path>',
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
    iconSvg: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>',
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
    iconSvg: '<path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.094z"></path>',
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
    iconSvg: '<path d="M23.903 14.819c-.318-.845-1.077-1.465-1.956-1.593.764-.783 1.096-1.942.802-3.085-.357-1.391-1.674-2.288-3.078-2.096 1.41-1.127 1.838-3.15.932-4.706-1.042-1.789-3.324-2.181-4.966-.856C15.657 1.01 14.078.04 12.302.261 10.535.48 9.17 1.815 8.97 3.56c-1.479-.906-3.398-.69-4.664.577-1.353 1.352-1.385 3.528-.073 4.918C2.559 8.683.992 9.695.275 11.528c-.68 1.737-.024 3.722 1.554 4.7-1.246 1.298-1.408 3.32-.387 4.802 1.033 1.5 2.977 1.956 4.606 1.079.034 1.536 1.109 2.871 2.607 3.238 1.761.431 3.535-.558 4.192-2.204.992 1.05 2.585 1.352 3.882.735 1.484-.707 2.193-2.428 1.725-3.957 1.632.41 3.279-.537 3.842-2.13.415-1.171.166-2.423-.591-3.344l1.493-1.096a1.144 1.144 0 0 0 .705-1.473zM7.34 2.836l10.966 12.753-2.195 1.887L5.145 4.723 7.34 2.836z"></path>',
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
