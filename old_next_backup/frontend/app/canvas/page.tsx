import CanvasStage from "@/components/canvas/CanvasStage";
import LeftRail from "@/components/layout/LeftRail";
import TopNav from "@/components/layout/TopNav";
import InsightsPanel from "@/components/layout/InsightsPanel";

export default function CanvasPage() {
  return (
    <main className="h-screen w-screen flex flex-col overflow-hidden bg-forest-dark font-display">
      <TopNav />
      <div className="flex flex-1 overflow-hidden relative">
        <LeftRail />
        <CanvasStage />
        <InsightsPanel />
      </div>
    </main>
  );
}
