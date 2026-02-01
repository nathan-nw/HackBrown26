
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import '../../styles/layout.css';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/'); 
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      background: '#F3F4F3', // Light gray/greenish tint often found in refined designs
      color: '#1A1A1A',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div className="auth-card" style={{
        background: '#ffffff',
        padding: '3rem',
        borderRadius: '12px',
        border: '1px solid rgba(0,0,0,0.06)',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            marginBottom: '1.5rem',
            padding: '8px',
            background: 'rgba(11, 29, 21, 0.05)',
            borderRadius: '50%'
          }}>
           <svg fill="none" height="24" viewBox="0 0 40 40" width="24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" stroke="#0B1D15" strokeWidth="2"></circle>
                <circle cx="20" cy="20" r="12" stroke="#0B1D15" strokeWidth="2"></circle>
                <circle cx="20" cy="20" fill="#0B1D15" r="5"></circle>
            </svg>
          </div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '400', 
            fontFamily: 'var(--font-headline), serif', 
            color: '#0B1D15', 
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            {isSignUp ? 'Join the Portfolio' : 'Welcome Back'}
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: '15px',
            lineHeight: '1.5'
          }}>
            {isSignUp ? 'Start documenting your outlier ideas.' : 'Access your investment memos and canvas.'}
          </p>
        </div>

        {error && (
          <div style={{
            background: '#FFF2F0',
            border: '1px solid #FFCCC7',
            color: '#CF1322',
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '16px' }}>!</span> {error}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ position: 'relative' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '12px', 
              fontWeight: '600', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              color: '#666' 
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <input
                type="email"
                placeholder="founder@sequoia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  borderRadius: '6px',
                  border: '1px solid #E1E4E8',
                  background: '#fff',
                  color: '#1A1A1A',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0B1D15';
                  e.target.style.boxShadow = '0 0 0 3px rgba(11, 29, 21, 0.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E1E4E8';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '12px', 
              fontWeight: '600', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              color: '#666' 
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  borderRadius: '6px',
                  border: '1px solid #E1E4E8',
                  background: '#fff',
                  color: '#1A1A1A',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0B1D15';
                  e.target.style.boxShadow = '0 0 0 3px rgba(11, 29, 21, 0.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E1E4E8';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {isSignUp && (
            <div style={{ position: 'relative' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontSize: '12px', 
                fontWeight: '600', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                color: '#666' 
              }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    borderRadius: '6px',
                    border: '1px solid #E1E4E8',
                    background: '#fff',
                    color: '#1A1A1A',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0B1D15';
                    e.target.style.boxShadow = '0 0 0 3px rgba(11, 29, 21, 0.05)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E1E4E8';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '1rem',
              padding: '14px',
              borderRadius: '6px',
              border: 'none',
              background: '#0B1D15', // Forest Dark
              color: '#fff',
              fontWeight: '500',
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.2s ease',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#051610'}
            onMouseOut={(e) => e.currentTarget.style.background = '#0B1D15'}
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (
              <>
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          borderTop: '1px solid #F0F0F0',
          paddingTop: '1.5rem',
          marginTop: '0.5rem'
        }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#0B1D15', 
                fontWeight: '600', 
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                textDecoration: 'underline',
                padding: '0 4px'
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
      
      {/* Footer / Branding */}
      <div style={{ marginTop: '2rem', opacity: 0.5, fontSize: '12px', color: '#666' }}>
        <span>&copy; 2026 Sequoia Design System</span>
      </div>
    </div>
  );
};

export default Auth;
