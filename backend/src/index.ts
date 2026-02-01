import express, { Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, User } from './types';
import { mockPortfolio } from './ExampleIdeas/mockPortfolio';
import { mockOutliers } from './ExampleIdeas/mockOutliers';
import { OUTLIER_BOARDS } from './ExampleIdeas/outlierBoards';
import { initialNodes, initialEdges } from './ExampleIdeas/mockCanvas';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: true, // Reflects the request origin, enabling all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
  cors: {
    origin: true, // Match Express CORS - reflects request origin
    methods: ["GET", "POST"],
    credentials: true
  }
});

// State to track users per room: RoomId -> (UserId -> User)
const rooms = new Map<string, Map<string, User>>();

// Helper functions for backend state management
function applyBackendNodeChange(changes: any[], roomId: string) {
  if (!OUTLIER_BOARDS[roomId]) {
     // Initialize if not exists (for new blank boards)
     OUTLIER_BOARDS[roomId] = { 
       id: roomId, 
       title: 'New Idea', 
       subtitle: 'Draft Board',
       nodes: [], 
       edges: [], 
       insights: {
         strategicFitScore: 0,
         strategicFitText: 'Not enough data.',
         suggestedActionTitle: 'Start Planning',
         suggestedActionBody: 'Add nodes to map your strategy.',
         marketRiskLabel: 'Medium',
         marketRiskText: 'TBD'
       } 
     };
  }
  const board = OUTLIER_BOARDS[roomId];
  
  changes.forEach((change: any) => {
     if (change.type === 'position') {
        const node = board.nodes.find((n: any) => n.id === change.id);
        if (node && change.position) {
           node.position = change.position;
        }
     } else if (change.type === 'add') {
        // Avoid duplicates if possible, or just push
        if (!board.nodes.find((n: any) => n.id === change.item.id)) {
            board.nodes.push(change.item);
        }
     } else if (change.type === 'remove') {
        board.nodes = board.nodes.filter((n: any) => n.id !== change.id);
     }
  });
}

function applyBackendEdgeChange(changes: any[], roomId: string) {
   if (!OUTLIER_BOARDS[roomId]) return;
   const board = OUTLIER_BOARDS[roomId];
   
   changes.forEach((change: any) => {
       if (change.type === 'add') {
           if (!board.edges.find((e: any) => e.id === change.item.id)) {
               board.edges.push(change.item);
           }
       } else if (change.type === 'remove') {
           board.edges = board.edges.filter((e: any) => e.id !== change.id);
       }
   });
}

// Sync Loop: Broadcast state every 5 seconds to active rooms
setInterval(() => {
  rooms.forEach((_, roomId) => {
      if (OUTLIER_BOARDS[roomId]) {
          io.to(roomId).emit('board_sync', {
              nodes: OUTLIER_BOARDS[roomId].nodes,
              edges: OUTLIER_BOARDS[roomId].edges
          });
      }
  });
}, 5000);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining a room
  socket.on('user_join', (roomId: string, name: string, color: string) => {
    // Leave previous room if any
    if (socket.data.roomId && socket.data.roomId !== roomId) {
      handleLeaveRoom(socket.id, socket.data.roomId);
      socket.leave(socket.data.roomId);
    }

    // Join new room
    socket.join(roomId);
    socket.data.roomId = roomId;
    socket.data.name = name;
    socket.data.color = color;

    const newUser: User = {
      id: socket.id,
      cursor: null,
      name,
      color,
      roomId
    };

    // Initialize room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Map());
    }
    
    const roomUsers = rooms.get(roomId)!;
    roomUsers.set(socket.id, newUser);
    
    console.log(`User ${name} (${socket.id}) joined room ${roomId}`);

    // Wrapper to get array of users
    const currentUsers = Array.from(roomUsers.values());

    // Send current users to the new user
    socket.emit('current_users', currentUsers);
    
    // Broadcast to other users in the room that a new user has joined
    socket.to(roomId).emit('user_connected', newUser);
  });

  // Handle cursor movement
  socket.on('cursor_move', (cursor, roomIdFromClient) => {
    // Prefer server-side tracked roomId, fallback to client provided if needed (though logic suggests server side is best)
    const roomId = socket.data.roomId || roomIdFromClient;
    
    if (!roomId || !rooms.has(roomId)) return;

    const roomUsers = rooms.get(roomId)!;
    const user = roomUsers.get(socket.id);

    if (user) {
      user.cursor = cursor;
      // Broadcast cursor update to everyone else in the room
      socket.to(roomId).emit('cursor_update', socket.id, cursor);
    }
  });

  // Handle node changes
  socket.on('node_change', (changes, roomId) => {
      applyBackendNodeChange(changes, roomId);
      // Broadcast to others in the room
      socket.to(roomId).emit('node_change', changes);
  });

  // Handle edge changes
  socket.on('edge_change', (changes, roomId) => {
      applyBackendEdgeChange(changes, roomId);
      // Broadcast to others in the room
      socket.to(roomId).emit('edge_change', changes);
  });

  // Handle explicit room leave
  socket.on('leave_room', (roomId) => {
    handleLeaveRoom(socket.id, roomId);
    socket.leave(roomId);
    socket.data.roomId = undefined;
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    if (socket.data.roomId) {
      handleLeaveRoom(socket.id, socket.data.roomId);
    }
  });

  // Helper to handle removal logic
  function handleLeaveRoom(userId: string, roomId: string) {
    if (rooms.has(roomId)) {
      const roomUsers = rooms.get(roomId)!;
      if (roomUsers.has(userId)) {
        roomUsers.delete(userId);
        // Notify others in the room
        io.to(roomId).emit('user_disconnected', userId);
        
        // Clean up empty rooms
        if (roomUsers.size === 0) {
          rooms.delete(roomId);
        }
      }
    }
  }
});

const endpoints = [
  { path: '/', method: 'GET', description: 'Heartbeat check and available endpoints' },
  { path: '/api/test', method: 'GET', description: 'Test endpoint' },
  { path: '/api/echo', method: 'POST', description: 'Echoes back the request body' },
  { path: '/socket.io', method: 'WS', description: 'WebSocket endpoint. Events: user_join, cursor_move, user_connected, user_disconnected, cursor_update, leave_room' },
  { path: '/api/portfolio', method: 'GET', description: 'Get list of portfolio items' },
  { path: '/api/outliers', method: 'GET', description: 'Get list of outlier companies' },
  { path: '/api/ideas/:ideaId', method: 'GET', description: 'Get canvas board data for a specific idea' }
];

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    endpoints: endpoints
  });
});

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'Test endpoint working' });
});

app.get('/api/portfolio', (req: Request, res: Response) => {
  res.json(mockPortfolio);
});

app.get('/api/outliers', (req: Request, res: Response) => {
  res.json(mockOutliers);
});

app.get('/api/ideas/:ideaId', (req: Request, res: Response) => {
  const ideaId = req.params.ideaId as string;
  
  if (OUTLIER_BOARDS[ideaId]) {
    res.json(OUTLIER_BOARDS[ideaId]);
  } else {
    // Return default/empty canvas for unknown IDs
    res.json({
      id: ideaId,
      nodes: initialNodes,
      edges: initialEdges
    });
  }
});

app.post('/api/echo', (req: Request, res: Response) => {
  res.json({
    message: 'Echo received',
    data: req.body
  });
});


httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
