import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/theme.css';
import '../styles/layout.css';
import { TopNav } from '../components/TopNav';
import { InsightsPanel } from '../components/InsightsPanel';
import { CanvasBoard } from '../components/CanvasBoard';
import { useIdeas } from '../context/IdeasContext';
import { useAuth } from '../context/AuthContext';

export const CanvasPage = () => {
  const { ideaId } = useParams();
  const [isInsightsOpen, setIsInsightsOpen] = useState(true);
  const { getIdea } = useIdeas();
  const { session } = useAuth();
  
  // Get idea metadata from context
  const idea = ideaId ? getIdea(ideaId) : undefined;
  
  // Canvas data will be fetched by InsightsPanel if needed
  const [canvasData, setCanvasData] = useState<{ nodes: any[]; edges: any[] } | undefined>(undefined);
  
  // Fetch canvas data for the panel
  useEffect(() => {
    if (!ideaId) return;
    
    const fetchCanvas = async () => {
      try {
        const headers: HeadersInit = {};
        if (session?.access_token) {
          headers['Authorization'] = `Bearer ${session.access_token}`;
        }
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ideas/${ideaId}`, { headers });
        if (response.ok) {
          const data = await response.json();
          setCanvasData({ nodes: data.nodes || [], edges: data.edges || [] });
        }
      } catch (err) {
        console.error('Failed to fetch canvas for insights:', err);
      }
    };
    
    fetchCanvas();
  }, [ideaId, session]);

  return (
    <div 
      className="app-layout" 
      style={{ 
        gridTemplateColumns: `1fr ${isInsightsOpen ? 'var(--insights-width)' : '50px'}`,
        gridTemplateAreas: `
          "nav nav"
          "canvas insights"
        `
      }}
    >
      <TopNav />
      <CanvasBoard ideaId={ideaId} />
      <InsightsPanel 
        isOpen={isInsightsOpen} 
        onToggle={() => setIsInsightsOpen(!isInsightsOpen)} 
        ideaId={ideaId}
        ideaMeta={idea ? {
          title: idea.name,
          description: idea.description,
          wedge: idea.wedge,
          differentiation: idea.differentiation,
          category: idea.category,
          stage: idea.stage,
        } : undefined}
        canvas={canvasData}
      />
    </div>
  );
};
