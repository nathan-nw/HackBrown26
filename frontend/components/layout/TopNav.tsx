import { User } from 'lucide-react';
import Link from 'next/link';

export default function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-venture-border bg-venture-dark z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-venture-green" />
        <span className="font-serif text-lg font-medium tracking-wide text-white">VentureLabs</span>
        <span className="text-gray-500 text-sm ml-2 font-light">OUTLIER</span>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-8 text-sm">
        <Link href="#" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link>
        <Link href="#" className="text-white border-b-2 border-venture-green pb-1">Canvas</Link>
        <Link href="#" className="text-gray-400 hover:text-white transition-colors">Network</Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-venture-green/20 flex items-center justify-center border border-venture-green/30 text-venture-green hover:bg-venture-green/30 cursor-pointer transition-colors">
          <User size={16} />
        </div>
      </div>
    </nav>
  );
}
