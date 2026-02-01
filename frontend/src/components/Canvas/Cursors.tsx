import { useViewport } from 'reactflow';
import { MousePointer2 } from 'lucide-react';

interface CursorProps {
  x: number;
  y: number;
  color: string;
  name: string;
}

const Cursor = ({ x, y, color, name }: CursorProps) => {
  const { x: vpX, y: vpY, zoom } = useViewport();

  // Convert world coordinates to screen coordinates (relative to the flow container)
  const screenX = x * zoom + vpX;
  const screenY = y * zoom + vpY;

  return (
    <div 
      style={{ 
        position: 'absolute', 
        left: screenX, 
        top: screenY, 
        pointerEvents: 'none',
        zIndex: 1000,
        transition: 'all 0.1s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <MousePointer2 fill={color} color={color} size={20} />
      <div 
        style={{ 
          backgroundColor: color, 
          padding: '2px 6px', 
          borderRadius: '4px', 
          fontSize: '12px', 
          color: 'white',
          marginTop: '2px',
          whiteSpace: 'nowrap'
        }}
      >
        {name}
      </div>
    </div>
  );
};

interface CursorsProps {
  users: any[]; // Using any for simplicity as User type is in useSocket
}

export const Cursors = ({ users }: CursorsProps) => {
  if (!users) return null;

  return (
    <>
      {users.filter(u => u.cursor).map(user => (
        <Cursor 
          key={user.id}
          x={user.cursor.x}
          y={user.cursor.y}
          color={user.color}
          name={user.name}
        />
      ))}
    </>
  );
};
