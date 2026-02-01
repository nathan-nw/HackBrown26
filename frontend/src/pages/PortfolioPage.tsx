import { useState, useMemo, useEffect } from 'react';

import { PortfolioCard } from '../components/Portfolio/PortfolioCard';
import { CreateNewIdeaCard } from '../components/Portfolio/CreateNewIdeaCard';
import { TopNav } from '../components/TopNav';
import { Filter, ArrowUpDown, Search } from 'lucide-react';
import { OutliersBar } from '../components/Outliers/OutliersBar';
import { OutlierModal } from '../components/Outliers/OutlierModal';
import type { PortfolioItem, OutlierCompany } from '../types';
import '../styles/portfolio.css';

export const PortfolioPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOutlier, setSelectedOutlier] = useState<OutlierCompany | null>(null);
  const [sortBy, setSortBy] = useState<'fit' | 'validation'>('fit');
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/portfolio`);
        if (response.ok) {
          const data = await response.json();
          setPortfolioItems(data);
        }
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const filteredPortfolio = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filtered = portfolioItems.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'fit') {
        return b.strategicFit - a.strategicFit;
      }
      return b.validationProgress - a.validationProgress;
    });
  }, [searchQuery, sortBy, portfolioItems]);

  return (
    <div className="portfolio-page">
      <TopNav />
      
      <div className="grid-bg">
        <div className="portfolio-container">
          
          <header className="portfolio-header">
            <span className="breadcrumb-label">
              <span className="breadcrumb-number">01</span>
              / Sequoia Genesis
            </span>
            
            <div className="portfolio-title-row">
              <h1 className="portfolio-title">Founder Portfolio</h1>
              
              <div className="header-actions">
                 <div className="search-pill-container">
                    <Search size={14} className="search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search portfolio..." 
                      className="search-pill-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
                 <button className="action-pill">
                   <Filter size={14} />
                   Filter
                 </button>
                 <div style={{ position: 'relative' }}>
                   <button 
                    className="action-pill" 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    style={{ minWidth: '180px', justifyContent: 'space-between' }}
                   >
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                       <ArrowUpDown size={14} />
                       Sort by: {sortBy === 'fit' ? 'Strategic Fit' : 'Validation Process'}
                     </div>
                   </button>
                   
                   {isSortOpen && (
                     <div style={{
                       position: 'absolute',
                       top: '100%',
                       right: 0,
                       marginTop: '8px',
                       background: '#1A1A1A',
                       border: '1px solid rgba(255, 255, 255, 0.1)',
                       borderRadius: '8px',
                       padding: '4px',
                       zIndex: 50,
                       minWidth: '180px',
                       boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                     }}>
                       <button
                         onClick={() => { setSortBy('fit'); setIsSortOpen(false); }}
                         style={{
                           display: 'block',
                           width: '100%',
                           textAlign: 'left',
                           padding: '8px 12px',
                           fontSize: '14px',
                           color: sortBy === 'fit' ? 'white' : 'var(--text-secondary)',
                           background: sortBy === 'fit' ? 'rgba(255,255,255,0.1)' : 'transparent',
                           border: 'none',
                           borderRadius: '4px',
                           cursor: 'pointer',
                           fontFamily: 'var(--font-body)'
                         }}
                       >
                         Strategic Fit
                       </button>
                       <button
                         onClick={() => { setSortBy('validation'); setIsSortOpen(false); }}
                         style={{
                           display: 'block',
                           width: '100%',
                           textAlign: 'left',
                           padding: '8px 12px',
                           fontSize: '14px',
                           color: sortBy === 'validation' ? 'white' : 'var(--text-secondary)',
                           background: sortBy === 'validation' ? 'rgba(255,255,255,0.1)' : 'transparent',
                           border: 'none',
                           borderRadius: '4px',
                           cursor: 'pointer',
                           fontFamily: 'var(--font-body)'
                         }}
                       >
                         Validation Process
                       </button>
                     </div>
                   )}
                 </div>
              </div>
            </div>
            
            <p className="portfolio-subtitle">
              Manage and validate your high-conviction startup hypotheses.
            </p>
          </header>

          <OutliersBar onSelect={setSelectedOutlier} />
          
          <div className="portfolio-grid">
            <CreateNewIdeaCard />
            {loading ? (
              <div style={{ color: 'white' }}>Loading...</div>
            ) : (
              filteredPortfolio.map(item => (
                <PortfolioCard key={item.id} item={item} />
              ))
            )}
          </div>
          
        </div>
      </div>

      <OutlierModal 
        isOpen={!!selectedOutlier} 
        company={selectedOutlier} 
        onClose={() => setSelectedOutlier(null)} 
      />
    </div>
  );
};
