import Link from 'next/link';

export default function TopNav() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-[#1A3326] bg-forest-deep px-8 py-4 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center text-primary">
          {/* Abstract Logo */}
          <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 22H22L12 2Z" fill="currentColor" fillOpacity="0.2"></path>
            <path d="M12 6L4.5 21H19.5L12 6Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-white text-xl font-serif tracking-wide">
          VentureLabs <span className="text-text-secondary-dark font-display text-sm uppercase tracking-widest ml-1">Outlier</span>
        </h2>
      </div>
      
      <div className="flex flex-1 justify-end gap-8 items-center">
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-text-secondary-dark hover:text-white transition-colors text-sm font-medium">Portfolio</Link>
          <Link href="#" className="text-white text-sm font-medium border-b border-primary pb-0.5">Canvas</Link>
          <Link href="#" className="text-text-secondary-dark hover:text-white transition-colors text-sm font-medium">Network</Link>
        </nav>
        
        <div className="w-px h-6 bg-[#1A3326] mx-2"></div>
        
        <button className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-[#1A3326] flex items-center justify-center text-primary group-hover:bg-[#234532] transition-colors">
            <span className="material-symbols-outlined text-lg">person</span>
          </div>
        </button>
      </div>
    </header>
  );
}
