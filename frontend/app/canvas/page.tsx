import CanvasStage from "@/components/canvas/CanvasStage";
import LeftRail from "@/components/layout/LeftRail";
import TopNav from "@/components/layout/TopNav";
import InsightsPanel from "@/components/layout/InsightsPanel";

export default function CanvasPage() {
  return (
    <main className="h-screen w-screen relative overflow-hidden bg-venture-dark text-white font-sans">
      <TopNav />
      <LeftRail />
      <CanvasStage />
      <InsightsPanel />
    </main>
  );
}
