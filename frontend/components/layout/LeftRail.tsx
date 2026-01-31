import { Send, Plus, Activity } from 'lucide-react';

export default function LeftRail() {
  return (
    <div className="fixed left-6 top-24 bottom-6 w-12 flex flex-col gap-4 z-40 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-4">
        {[
          { icon: Send, label: "Select" },
          { icon: Plus, label: "Add Node" },
          { icon: Activity, label: "Analytics" },
        ].map((Item, i) => (
          <button
            key={i}
            className="w-10 h-10 bg-venture-dark/80 backdrop-blur-sm border border-venture-border rounded flex items-center justify-center text-gray-400 hover:text-white hover:border-venture-green hover:bg-venture-green/10 transition-all group"
          >
            <Item.icon size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}
