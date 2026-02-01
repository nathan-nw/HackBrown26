import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CreateNewIdeaCardProps {
  onClick?: () => void;
}
// export const CreateNewIdeaCard = () => {
  export const CreateNewIdeaCard = ({ onClick }: CreateNewIdeaCardProps) => {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    // Generate a random ID (e.g., base36 string)
    const newId = Math.random().toString(36).substr(2, 9);
    navigate(`/planning/${newId}`);
  };

  return (
    <div className="create-card" onClick={onClick}>
      <div className="create-icon-circle">
        <Plus size={32} />
      </div>
      <span className="create-title">Create New Idea</span>
    </div>
  );
};
