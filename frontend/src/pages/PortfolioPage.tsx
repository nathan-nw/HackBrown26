import { useState, useMemo, useEffect } from 'react';

import { PortfolioCard } from '../components/Portfolio/PortfolioCard';
import { CreateNewIdeaCard } from '../components/Portfolio/CreateNewIdeaCard';
import { TopNav } from '../components/TopNav';
import { Filter, ArrowUpDown, Search } from 'lucide-react';
import { OutliersBar } from '../components/Outliers/OutliersBar';
import { OutlierModal } from '../components/Outliers/OutlierModal';
import { NewIdeaFlowModal } from '../components/modals/NewIdeaFlowModal';
// import type { OutlierCompany } from '../data/mockOutliers';
import type { PortfolioItem, OutlierCompany } from '../types';
import '../styles/portfolio.css';

import { useAuth } from '../context/AuthContext';

export const PortfolioPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOutlier, setSelectedOutlier] = useState<OutlierCompany | null>(null);
  const [sortBy, setSortBy] = useState<'fit' | 'validation'>('fit');
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const token = session?.access_token;
        if (!token) {
           // If no token, we might want to delay or handle differently, but assuming protected route
           setLoading(false);
           return;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/portfolio`,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPortfolioItems(data);
        } else {
            console.error('Failed to fetch portfolio', await response.text());
        }
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (session) {
      fetchPortfolio();
    }
  }, [session]);

  const [isNewIdeaOpen, setIsNewIdeaOpen] = useState(false);

  const filteredPortfolio = useMemo(() => {
    // ... existing memo logic ...
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
            {/* ... header content ... */}
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
                       background: 'white',
                       border: '1px solid var(--border-light)',
                       borderRadius: '8px',
                       padding: '4px',
                       zIndex: 50,
                       minWidth: '180px',
                       boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                     }}>
                       <button
                         onClick={() => { setSortBy('fit'); setIsSortOpen(false); }}
                         style={{
                           display: 'block',
                           width: '100%',
                           textAlign: 'left',
                           padding: '8px 12px',
                           fontSize: '14px',
                           color: sortBy === 'fit' ? 'var(--primary)' : 'var(--text-secondary)',
                           background: sortBy === 'fit' ? 'var(--bg-secondary)' : 'transparent',
                           border: 'none',
                           borderRadius: '4px',
                           cursor: 'pointer',
                           fontFamily: 'var(--font-body)',
                           fontWeight: sortBy === 'fit' ? 600 : 400
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
                           color: sortBy === 'validation' ? 'var(--primary)' : 'var(--text-secondary)',
                           background: sortBy === 'validation' ? 'var(--bg-secondary)' : 'transparent',
                           border: 'none',
                           borderRadius: '4px',
                           cursor: 'pointer',
                           fontFamily: 'var(--font-body)',
                           fontWeight: sortBy === 'validation' ? 600 : 400
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
            <CreateNewIdeaCard onClick={() => setIsNewIdeaOpen(true)} />
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
      
      <NewIdeaFlowModal 
        isOpen={isNewIdeaOpen} 
        onClose={() => setIsNewIdeaOpen(false)} 
      />
    </div>
  );
};
