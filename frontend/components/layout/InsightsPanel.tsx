"use client";

import { Sparkles, Lightbulb, ArrowUp } from 'lucide-react';

export default function InsightsPanel() {
  return (
    <div className="fixed right-0 top-16 bottom-0 w-80 bg-venture-dark border-l border-venture-border flex flex-col z-40">
      <div className="p-6 overflow-y-auto flex-1 scrollbar-hide">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-venture-green" />
          <span className="text-venture-green text-xs font-bold tracking-widest uppercase">Venture Insights</span>
        </div>
        
        <h2 className="text-2xl font-serif text-white mb-6">Pattern Recognition</h2>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold tracking-wider text-gray-400">STRATEGIC FIT</span>
          <span className="text-venture-green font-mono font-bold">92/100</span>
        </div>
        
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Your focus on <span className="text-venture-green">Power Users</span> aligns with early-stage marketplace winners. Historical data suggests retaining this cohort yields 3x LTV compared to broad acquisition.
        </p>
        
        <div className="bg-venture-green/5 border border-venture-green/20 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2 mb-2 text-gray-300">
            <Lightbulb size={16} className="text-venture-green" />
            <span className="text-xs font-bold">Suggested Action</span>
          </div>
          <p className="text-gray-300 text-sm">
            Double down on the concierge MVP for the top 50 users.
          </p>
        </div>
        
        <div className="border-t border-venture-border pt-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold tracking-wider text-gray-400">MARKET RISK</span>
            <span className="text-orange-500 font-bold text-sm">Medium</span>
          </div>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            The &quot;Enterprise Sales Motion&quot; node is currently a draft but may conflict with your product-led growth core loop.
          </p>
          <button onClick={() => alert("Risk Analysis module loading...")} className="w-full py-2 bg-transparent border border-venture-border hover:border-venture-green text-white text-sm rounded transition-colors">
            Generate Risk Analysis
          </button>
        </div>
      </div>
      
      <div className="p-4 border-t border-venture-border bg-venture-dark">
        <div className="bg-venture-green-dim/30 rounded border border-venture-border flex items-center p-2">
          <input 
            type="text" 
            placeholder="Ask VentureLabs AI..." 
            className="bg-transparent border-none text-white text-sm flex-1 outline-none placeholder:text-gray-600 ml-2"
          />
          <button className="p-1.5 bg-venture-green/10 hover:bg-venture-green/20 text-venture-green rounded transition-colors">
            <ArrowUp size={16} />
          </button>
        </div>
        <p className="text-[10px] text-gray-700 mt-2 text-center">
          AI insights are generated based on proprietary portfolio data.
        </p>
      </div>
    </div>
  );
}
