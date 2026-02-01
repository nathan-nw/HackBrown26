import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL;

interface User {
  id: string;
  name: string;
  color: string;
  cursor: { x: number; y: number } | null;
}

export const useSocket = (roomId: string, name: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });
    setSocket(newSocket);
    
    // Random color for this session
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('user_join', roomId, name, color);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('current_users', (currentUsers: User[]) => {
      setUsers(currentUsers);
    });

    newSocket.on('user_connected', (user: User) => {
      setUsers(prev => [...prev, user]);
    });

    newSocket.on('user_disconnected', (userId: string) => {
      setUsers(prev => prev.filter(u => u.id !== userId));
    });

    newSocket.on('cursor_update', (userId: string, cursor: { x: number; y: number }) => {
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, cursor } : user
      ));
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, name]);

  const lastCursorEmit = useRef<number>(0);
  
  const moveCursor = useCallback((x: number, y: number) => {
    if (socket) {
      const now = Date.now();
      // Throttle to ~60fps (16ms) to reduce network overhead
      if (now - lastCursorEmit.current >= 16) {
        socket.emit('cursor_move', { x, y }, roomId);
        lastCursorEmit.current = now;
      }
    }
  }, [socket, roomId]);

  const emitNodeChange = useCallback((changes: any[]) => {
      if (socket) {
          socket.emit('node_change', changes, roomId);
      }
  }, [socket, roomId]);

  const emitEdgeChange = useCallback((changes: any[]) => {
      if (socket) {
          socket.emit('edge_change', changes, roomId);
      }
  }, [socket, roomId]);

  return { socket, users, isConnected, moveCursor, emitNodeChange, emitEdgeChange };
};
