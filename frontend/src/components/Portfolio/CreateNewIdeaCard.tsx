import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreateNewIdeaCard = () => {
  const navigate = useNavigate();

  return (
    <div className="create-card" onClick={() => navigate('/planning')}>
      <div className="create-icon-circle">
        <Plus size={32} />
      </div>
      <h3 className="create-title">Create New Idea</h3>
      <p className="create-caption">Start a new venture definition from scratch.</p>
    </div>
  );
};
