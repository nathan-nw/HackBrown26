import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Idea {
  id: string;
  name: string;
  description: string;
  wedge?: string;
  differentiation: 'insight' | 'speed' | 'ux' | 'tech';
  category: 'consumer' | 'enterprise' | 'devtools' | 'fintech' | 'healthcare' | 'climate' | 'defense';
  stage?: 'pre-seed' | 'seed' | 'series-a';
  createdAt: string;
}

interface IdeasContextType {
  ideas: Idea[];
  addIdea: (idea: Idea) => void;
  getIdea: (id: string) => Idea | undefined;
}

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

export const IdeasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedIdeas = localStorage.getItem('venturelabs.ideas');
    if (savedIdeas) {
      try {
        setIdeas(JSON.parse(savedIdeas));
      } catch (e) {
        console.error('Failed to parse ideas from localStorage', e);
      }
    }
  }, []);

  // Save to localStorage whenever ideas change
  useEffect(() => {
    localStorage.setItem('venturelabs.ideas', JSON.stringify(ideas));
  }, [ideas]);

  const addIdea = (idea: Idea) => {
    setIdeas(prev => [idea, ...prev]);
  };

  const getIdea = (id: string) => {
    return ideas.find(i => i.id === id);
  };

  return (
    <IdeasContext.Provider value={{ ideas, addIdea, getIdea }}>
      {children}
    </IdeasContext.Provider>
  );
};

export const useIdeas = () => {
  const context = useContext(IdeasContext);
  if (context === undefined) {
    throw new Error('useIdeas must be used within an IdeasProvider');
  }
  return context;
};
