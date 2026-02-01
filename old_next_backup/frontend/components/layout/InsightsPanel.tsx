"use client";

export default function InsightsPanel() {
  return (
    <aside className="w-[360px] bg-[#081812] border-l border-[#1A3326] flex flex-col z-40 shadow-2xl h-full">
      <div className="p-6 border-b border-[#1A3326]">
        <div className="flex items-center gap-2 text-primary mb-1">
          <span className="material-symbols-outlined text-lg">auto_awesome</span>
          <span className="text-xs font-bold tracking-widest uppercase">Sequoia Genesis Insights</span>
        </div>
        <h2 className="text-white font-serif text-xl">Pattern Recognition</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {/* Insight Card 1 */}
        <div className="group">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-text-secondary-dark text-xs font-bold uppercase tracking-wide">Strategic Fit</span>
            <span className="text-primary text-sm font-bold font-mono">92/100</span>
          </div>
          <p className="text-white text-sm leading-relaxed mb-3">
            Your focus on <span className="text-primary border-b border-primary/30">Power Users</span> aligns with early-stage marketplace winners. Historical data suggests retaining this cohort yields 3x LTV compared to broad acquisition.
          </p>
          <div className="p-3 bg-[#1A3326] rounded border border-[#2C4A3A] flex gap-3 items-start">
            <span className="material-symbols-outlined text-primary text-lg mt-0.5">lightbulb</span>
            <div>
              <p className="text-xs text-text-secondary-dark mb-2">Suggested Action</p>
              <p className="text-white text-sm font-medium">Double down on the concierge MVP for the top 50 users.</p>
            </div>
          </div>
        </div>
        
        <div className="w-full h-px bg-[#1A3326]"></div>
        
        {/* Insight Card 2 */}
        <div className="group">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-text-secondary-dark text-xs font-bold uppercase tracking-wide">Market Risk</span>
            <span className="text-orange-400 text-sm font-bold font-mono">Medium</span>
          </div>
          <p className="text-white text-sm leading-relaxed mb-3">
            The &quot;Enterprise Sales Motion&quot; node is currently a draft but may conflict with your product-led growth core loop.
          </p>
          <button onClick={() => alert("Risk Analysis module loading...")} className="w-full py-2 border border-[#2C4A3A] rounded text-xs font-bold text-white hover:bg-[#1A3326] hover:border-primary/50 transition-all flex items-center justify-center gap-2">
            Generate Risk Analysis
          </button>
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="mt-auto pt-8 p-6 bg-[#081812]">
        <div className="relative">
          <input 
            className="w-full bg-[#1A3326] border border-[#2C4A3A] rounded-lg py-3 px-4 text-sm text-white placeholder-text-secondary-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all form-input" 
            placeholder="Ask Sequoia Genesis AI..." 
            type="text"
          />
          <button className="absolute right-2 top-2 p-1 text-primary hover:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        </div>
        <p className="text-[10px] text-text-secondary-dark mt-3 text-center opacity-60">
          AI insights are generated based on proprietary portfolio data.
        </p>
      </div>
    </aside>
  );
}
