import { User, LogOut, ChevronDown, Copy, Check, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../styles/layout.css';
import { Button } from './ui/Button';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

export const TopNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <nav className="top-nav">
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="Sequoia Genesis" style={{ height: '32px' }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700 }}>Sequoia Genesis</span>
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

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {isActive('/canvas') || location.pathname.includes('/canvas') ? (
            <div style={{ position: 'relative' }} ref={shareRef}>
                <Button
                    variant="ghost" 
                    onClick={() => setIsShareOpen(!isShareOpen)}
                    style={{ 
                        height: '32px', 
                        fontSize: '12px', 
                        border: '1px solid var(--border-light)',
                        backgroundColor: isShareOpen ? 'var(--bg-secondary)' : 'transparent'
                    }}
                >
                    Share
                </Button>
                
                {isShareOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: '8px',
                        width: '320px',
                        backgroundColor: 'white',
                        border: '1px solid var(--border-light)',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        zIndex: 100,
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Share this board</span>
                            <button 
                                onClick={() => setIsShareOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                            >
                                <X size={16} />
                            </button>
                        </div>
                        
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            Anyone with the link can view this board.
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input 
                                readOnly
                                value={window.location.href}
                                style={{
                                    flex: 1,
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid var(--border-light)',
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    fontSize: '13px',
                                    outline: 'none',
                                    textOverflow: 'ellipsis'
                                }}
                            />
                            <button
                                onClick={handleCopy}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    backgroundColor: isCopied ? '#DCFCE7' : 'var(--color-forest-dark)', // Green-100 or Dark
                                    color: isCopied ? '#166534' : 'white',
                                    cursor: 'pointer',
                                    minWidth: '60px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        ) : null}

        <div style={{ width: '1px', height: '24px', background: 'var(--border-light)', margin: '0 8px' }}></div>
        
        {/* User Profile Section */}
        <div 
          ref={dropdownRef}
          style={{ position: 'relative' }}
        >
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '6px',
              transition: 'background-color 0.2s'
            }}
            className="user-profile-trigger"
          >
            {user?.email && (
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {user.email}
              </span>
            )}
            
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}>
              <User size={18} />
            </div>
            <ChevronDown size={14} color="var(--text-secondary)" />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              width: '180px',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-md)',
              zIndex: 100,
              padding: '4px'
            }}>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 12px',
                  border: 'none',
                  background: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
