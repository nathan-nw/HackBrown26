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

export interface OutlierCompany {
  id: string;
  name: string;
  iconSvg: string;
  items: PortfolioItem[];
}
