export interface Cursor {
  x: number;
  y: number;
}

export interface User {
  id: string;
  cursor: Cursor | null;
  color: string;
  name: string;
  roomId: string;
}



export interface ServerToClientEvents {
  user_connected: (user: User) => void;
  user_disconnected: (userId: string) => void;
  cursor_update: (userId: string, cursor: Cursor) => void;
  current_users: (users: User[]) => void;
  node_change: (changes: any[]) => void;
  edge_change: (changes: any[]) => void;
  board_sync: (board: { nodes: any[], edges: any[] }) => void;
}

export interface ClientToServerEvents {
  cursor_move: (cursor: Cursor, roomId: string) => void;
  user_join: (roomId: string, name: string, color: string) => void;
  leave_room: (roomId: string) => void;
  node_change: (changes: any[], roomId: string) => void;
  edge_change: (changes: any[], roomId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name?: string;
  color?: string;
  roomId?: string;
}
