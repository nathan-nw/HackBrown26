import { useState, useMemo } from 'react';
import { mockPortfolio } from '../data/mockPortfolio';
import { PortfolioCard } from '../components/Portfolio/PortfolioCard';
import { CreateNewIdeaCard } from '../components/Portfolio/CreateNewIdeaCard';
import { TopNav } from '../components/TopNav';
import { Filter, ArrowUpDown, Search } from 'lucide-react';
import '../styles/portfolio.css';

export const PortfolioPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPortfolio = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return mockPortfolio.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="portfolio-page">
      <TopNav />
      
      <div className="grid-bg">
        <div className="portfolio-container">
          
          <header className="portfolio-header">
            <span className="breadcrumb-label">
              <span className="breadcrumb-number">01</span>
              / VENTURE LABS
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
                 <button className="action-pill">
                   <ArrowUpDown size={14} />
                   Sort by Score
                 </button>
              </div>
            </div>
            
            <p className="portfolio-subtitle">
              Manage and validate your high-conviction startup hypotheses.
            </p>
          </header>
          
          <div className="portfolio-grid">
            <CreateNewIdeaCard />
            {filteredPortfolio.map(item => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};
