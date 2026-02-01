import './styles/theme.css';
import './styles/layout.css';
import { TopNav } from './components/TopNav';
import { LeftToolbar } from './components/LeftToolbar';
import { InsightsPanel } from './components/InsightsPanel';
import { CanvasBoard } from './components/CanvasBoard';

function App() {
  return (
    <div className="app-layout">
      <TopNav />
      <LeftToolbar />
      <CanvasBoard />
      <InsightsPanel />
    </div>
  );
}

export default App;
