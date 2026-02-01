import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

export const LandingPage = () => {
  // Initialize theme from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('color-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Effect to apply theme class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  }, [isDark]);

  // Effect to add landing-body class to body
  useEffect(() => {
    document.body.classList.add('landing-body');
    // Ensure the theme class is also on the body if needed for background
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    return () => {
      document.body.classList.remove('landing-body');
      document.body.classList.remove('dark');
    };
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className="landing-container">
      {/* Background Layer - z-index: 0 */}
      <div className="landing-bg-layer">
        <svg className="absolute w-full h-full text-white/5" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,500 C100,400 300,600 500,500 C700,400 900,600 1100,500 C1300,400 1500,600 1700,500" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
          <path d="M-100,600 C100,500 300,700 500,600 C700,500 900,700 1100,600 C1300,500 1500,700 1700,600" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
          <path d="M-100,700 C100,600 300,800 500,700 C700,600 900,800 1100,700 C1300,600 1500,800 1700,700" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
          <path d="M-100,400 C100,300 300,500 500,400 C700,300 900,500 1100,400 C1300,300 1500,500 1700,400" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
          <path d="M-100,300 C100,200 300,400 500,300 C700,200 900,400 1100,300 C1300,200 1500,400 1700,300" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
        </svg>
        <div className="absolute inset-0 bg-gradient"></div>
        <div className="absolute inset-0 bg-grain"></div>
      </div>

      {/* Navigation - z-index: 50 */}
      <nav className="landing-nav">
        <div className="flex items-center gap-2 group nav-group cursor-pointer">
          <div className="logo-circle">V</div>
          <span className="logo-text">Venture Labs</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#" className="nav-link hidden md:block" style={{ display: 'none' }}>Manifesto</a>
          <a href="#" className="nav-link hidden md:block" style={{ display: 'none' }}>Portfolio</a>
          <a href="#" className="nav-link">Manifesto</a>
          <a href="#" className="nav-link">Portfolio</a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20.354 24.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Main Content - z-index: 10 */}
      <main className="landing-main">
        <div className="hero-container">
          
          <div className="relative inline-block animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="hero-title">
              Venture 
              <span className="relative inline-block whitespace-nowrap" style={{ marginLeft: '0.2em' }}>
                Labs
                <svg className="doodle-svg" fill="none" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                  <path className="hand-drawn-circle stroke-primary" stroke="var(--primary)" d="M170,40 C165,20 120,5 90,10 C50,16 10,40 25,75 C35,95 80,95 110,90 C150,83 190,60 180,35 C175,22 150,25 140,30" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                </svg>
              </span>
            </h1>
            <svg className="green-underline" fill="none" viewBox="0 0 300 20">
              <path className="opacity-30" d="M5,10 Q150,25 290,5" stroke="#00854A" strokeLinecap="round" strokeWidth="2"></path>
            </svg>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <p className="hero-subtitle">
              Pressure-test your idea before you bet your life on it. <br className="hidden md:block"/>
              <span className="hero-subtext">We build legendary companies with the daring.</span>
            </p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <Link to="/planning" className="enter-button group">
              <span className="relative z-10 font-medium tracking-wide">Enter the Sandbox</span>
              <svg className="w-4 h-4 relative z-10 arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              <div className="enter-button-overlay"></div>
            </Link>
          </div>

        </div>
        
        <div className="status-widget animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="status-box">
             <div className="flex items-center gap-3 mb-2">
               <div className="w-2 h-2 rounded-full bg-primary" style={{ backgroundColor: 'var(--primary)' }}></div>
               <span className="status-label">Status</span>
             </div>
             <p className="status-text">"Cohort III applications closing soon."</p>
          </div>
        </div>

      </main>

      {/* Footer - z-index: 10 */}
      <footer className="landing-footer">
        <p className="footer-text">
            © 2024 Venture Labs. Defined by audacity.
        </p>
      </footer>
    </div>
  );
};
