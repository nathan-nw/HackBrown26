import { Plus } from 'lucide-react';

interface CreateNewIdeaCardProps {
  onClick?: () => void;
}

export const CreateNewIdeaCard = ({ onClick }: CreateNewIdeaCardProps) => {
  return (
    <div className="create-card" onClick={onClick}>
      <div className="create-icon-circle">
        <Plus size={32} />
      </div>
      <span className="create-title">Create New Idea</span>
    </div>
  );
};
