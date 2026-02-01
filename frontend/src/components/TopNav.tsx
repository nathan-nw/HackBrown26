import { Box, Settings, Search, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/layout.css';
import { Button } from './ui/Button';

export const TopNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      alert("Asking VentureLabs AI: " + e.currentTarget.value);
      e.currentTarget.value = '';
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="top-nav">
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <Box size={24} color="var(--primary)" />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700 }}>VentureLabs</span>
          <span style={{ 
            fontSize: '10px', 
            border: '1px solid var(--text-secondary)', 
            padding: '1px 4px', 
            borderRadius: '2px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.05em'
          }}>OUTLIER</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/portfolio')}
          style={{ 
            color: isActive('/portfolio') ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: isActive('/portfolio') ? '1px solid var(--primary)' : 'none',
            borderRadius: 0,
            paddingBottom: '4px'
          }}
        >
          Portfolio
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/planning')}
          style={{ 
             color: isActive('/planning') ? 'var(--primary)' : 'var(--text-secondary)',
             borderBottom: isActive('/planning') ? '1px solid var(--primary)' : 'none',
             borderRadius: 0,
             paddingBottom: '4px'
          }}
        >
          Canvas
        </Button>
        <Button variant="ghost" style={{ color: 'var(--text-secondary)' }}>Network</Button>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', maxWidth: '400px', margin: '0 20px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '6px',
          padding: '4px 12px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Search size={16} color="var(--text-secondary)" style={{ marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Ask VentureLabs AI..." 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              width: '100%',
              outline: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '14px'
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ width: '1px', height: '24px', background: 'var(--forest-light)', margin: '0 8px' }}></div>
        <Button variant="icon"><Settings size={20} /></Button>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: 'var(--forest-light)', 
          border: '1px solid var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)'
        }}>
          <User size={18} />
        </div>
      </div>
    </nav>
  );
};
