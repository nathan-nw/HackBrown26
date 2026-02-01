import { Box, Settings, Search } from 'lucide-react';
import '../styles/layout.css';
import { Button } from './ui/Button';

export const TopNav = () => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      alert("Asking VentureLabs AI: " + e.currentTarget.value);
      e.currentTarget.value = '';
    }
  };

  return (
    <nav className="top-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
        <Box size={24} color="var(--primary)" />
        <span style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700 }}>VentureLabs</span>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <Button variant="ghost">Dashboard</Button>
        <Button variant="ghost" style={{ color: 'var(--primary)' }}>Canvas</Button>
        <Button variant="ghost">Team</Button>
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
        <Button variant="primary" onClick={() => alert("Simulation UI coming next")}>Run Simulation</Button>
        <div style={{ width: '1px', height: '24px', background: 'var(--forest-light)', margin: '0 8px' }}></div>
        <Button variant="icon"><Settings size={20} /></Button>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--forest-light)', border: '1px solid var(--primary)' }}></div>
      </div>
    </nav>
  );
};
