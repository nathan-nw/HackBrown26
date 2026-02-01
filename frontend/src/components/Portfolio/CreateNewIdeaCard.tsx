import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreateNewIdeaCard = () => {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    // Generate a random ID (e.g., base36 string)
    const newId = Math.random().toString(36).substr(2, 9);
    navigate(`/planning/${newId}`);
  };

  return (
    <div className="create-card" onClick={handleCreateNew}>
      <div className="create-icon-circle">
        <Plus size={32} />
      </div>
      <h3 className="create-title">Create New Idea</h3>
      <p className="create-caption">Start a new venture definition from scratch.</p>
    </div>
  );
};
