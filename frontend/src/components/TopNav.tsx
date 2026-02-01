import { Box, Settings, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/layout.css';
import { Button } from './ui/Button';

export const TopNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
        </div>
      </div>

      <div style={{ flex: 1 }}>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginRight: '32px' }}>
        <Button
          variant="ghost"
          onClick={() => navigate('/portfolio')}
          style={{
            color: isActive('/portfolio') ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: isActive('/portfolio') ? '1px solid var(--primary)' : '1px solid transparent',
            borderRadius: 0,
            paddingBottom: '4px'
          }}
        >
          Portfolio
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/comparison/new')}
          style={{ 
            color: isActive('/comparison/new') ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: isActive('/comparison/new') ? '1px solid var(--primary)' : '1px solid transparent',
            borderRadius: 0,
            paddingBottom: '4px'
          }}
        >
          Case Study
        </Button>
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
