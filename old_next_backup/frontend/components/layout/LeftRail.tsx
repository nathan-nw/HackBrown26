export default function LeftRail() {
  return (
    <aside className="w-16 border-r border-[#1A3326] bg-forest-deep flex flex-col items-center py-6 gap-6 z-40">
      <button className="w-10 h-10 rounded-lg bg-[#1A3326] text-white flex items-center justify-center hover:bg-primary hover:text-forest-deep transition-all shadow-lg" title="Select">
        <span className="material-symbols-outlined">near_me</span>
      </button>
      
      <button className="w-10 h-10 rounded-lg hover:bg-[#1A3326] text-text-secondary-dark hover:text-white flex items-center justify-center transition-all" title="Add Node">
        <span className="material-symbols-outlined">add_box</span>
      </button>
      
      <button className="w-10 h-10 rounded-lg hover:bg-[#1A3326] text-text-secondary-dark hover:text-white flex items-center justify-center transition-all" title="Connect">
        <span className="material-symbols-outlined">timeline</span>
      </button>
      
      <div className="flex-1"></div>
      
      <button className="w-10 h-10 rounded-lg hover:bg-[#1A3326] text-text-secondary-dark hover:text-white flex items-center justify-center transition-all" title="Settings">
        <span className="material-symbols-outlined">settings</span>
      </button>
    </aside>
  );
}
