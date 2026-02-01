import express, { Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, User } from './types';
import { mockOutliers } from './ExampleIdeas/mockOutliers';
import { OUTLIER_BOARDS } from './ExampleIdeas/outlierBoards';
import { initialNodes, initialEdges } from './ExampleIdeas/mockCanvas';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key in .env');
  process.exit(1);
}

// Global anonymous client (for public data if needed)
// For user data, we will create scoped clients using the Authorization header
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ... (Socket.IO logic remains mostly the same, simplified for clarity or modularized in future) ...
// State to track users per room: RoomId -> (UserId -> User)
const rooms = new Map<string, Map<string, User>>();

// Helper functions for backend state management
function applyBackendNodeChange(changes: any[], roomId: string) {
  if (!OUTLIER_BOARDS[roomId]) {
     // Initialize if not exists using a default template
     OUTLIER_BOARDS[roomId] = { 
       id: roomId, 
       title: 'New Idea', 
       subtitle: 'Draft Board',
       nodes: initialNodes, 
       edges: initialEdges, 
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
        console.log(`[DEBUG] Adding node ${change.item.id} to board ${roomId}`);
        if (!board.nodes.find((n: any) => n.id === change.item.id)) {
            board.nodes.push(change.item);
        } else {
            console.log(`[DEBUG] Node ${change.item.id} already exists`);
        }
     } else if (change.type === 'remove') {
        board.nodes = board.nodes.filter((n: any) => n.id !== change.id);
     } else if (change.type === 'update') {
        console.log(`[DEBUG] Updating node ${change.id} on board ${roomId}. Data keys: ${Object.keys(change.data).join(', ')}`);
        const node = board.nodes.find((n: any) => n.id === change.id);
        if (node) {
            console.log(`[DEBUG] Found node ${change.id}. Old price: ${node.data.price}, New price: ${change.data.price}`);
            // Merge data updates
            node.data = { ...node.data, ...change.data };
            console.log(`[DEBUG] Node data merged. New price: ${node.data.price}`);
        } else {
            console.log(`[DEBUG] Node ${change.id} not found for update.`);
        }
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

// Helper to persist board state to DB
async function persistBoard(roomId: string, board: any) {
    try {
        // We need an admin/service role client or just use the global one (which is anon but might have RLS issues)
        // For simplicity in this dev environment, we'll try to use the global client.
        // Ideally we'd store the creator's ID or use a service key.
        // Assuming 'projects' table has 'nodes' and 'edges' columns (JSONB).
        // If not, User needs to add them.
        const { error } = await supabase
            .from('projects')
            .update({
                // We are saving the raw nodes/edges.
                // Note: The schema must exist!
                nodes: board.nodes,
                edges: board.edges,
                // Also update last_edited or similar if needed
            })
            .eq('id', roomId);

        if (error) {
            console.error(`[PERSIST] Error saving board ${roomId}:`, error.message);
        } else {
            console.log(`[PERSIST] Saved board ${roomId}`);
        }
    } catch (err) {
        console.error(`[PERSIST] Unexpected error for ${roomId}:`, err);
    }
}

// Sync & Persist Loop
setInterval(() => {
  rooms.forEach((_, roomId) => {
      if (OUTLIER_BOARDS[roomId]) {
          const board = OUTLIER_BOARDS[roomId];
          
          // Emit sync to clients
          io.to(roomId).emit('board_sync', {
              nodes: board.nodes,
              edges: board.edges
          });
          
          // Persist to DB (fire and forget for this loop, or throttle)
          // To avoid slamming DB, maybe checks if dirty? For now, we just save every 5s.
          persistBoard(roomId, board);
      }
  });
}, 5000);

io.on('connection', (socket) => {
  // ... socket logic ... (keeping it concise for this replacement, assuming previous logic is sound)
  console.log(`User connected: ${socket.id}`);

  socket.on('user_join', (roomId: string, name: string, color: string) => {
    if (socket.data.roomId && socket.data.roomId !== roomId) {
      handleLeaveRoom(socket.id, socket.data.roomId);
      socket.leave(socket.data.roomId);
    }
    socket.join(roomId);
    socket.data.roomId = roomId;
    socket.data.name = name;
    socket.data.color = color;

    const newUser: User = { id: socket.id, cursor: null, name, color, roomId };
    
    if (!rooms.has(roomId)) rooms.set(roomId, new Map());
    const roomUsers = rooms.get(roomId)!;
    roomUsers.set(socket.id, newUser);
    
    // Send existing data first
    const currentUsers = Array.from(roomUsers.values());
    socket.emit('current_users', currentUsers);
    socket.to(roomId).emit('user_connected', newUser);
  });

  socket.on('cursor_move', (cursor, roomIdFromClient) => {
    const roomId = socket.data.roomId || roomIdFromClient;
    if (!roomId || !rooms.has(roomId)) return;
    const roomUsers = rooms.get(roomId)!;
    const user = roomUsers.get(socket.id);
    if (user) {
      user.cursor = cursor;
      socket.to(roomId).emit('cursor_update', socket.id, cursor);
    }
  });

  socket.on('node_change', (changes, roomId) => {
      applyBackendNodeChange(changes, roomId);
      socket.to(roomId).emit('node_change', changes);
  });

  socket.on('edge_change', (changes, roomId) => {
      applyBackendEdgeChange(changes, roomId);
      socket.to(roomId).emit('edge_change', changes);
  });

  socket.on('leave_room', (roomId) => {
    handleLeaveRoom(socket.id, roomId);
    socket.leave(roomId);
    socket.data.roomId = undefined;
  });

  socket.on('disconnect', () => {
    if (socket.data.roomId) {
      handleLeaveRoom(socket.id, socket.data.roomId);
    }
  });

  function handleLeaveRoom(userId: string, roomId: string) {
    if (rooms.has(roomId)) {
      const roomUsers = rooms.get(roomId)!;
      if (roomUsers.has(userId)) {
        roomUsers.delete(userId);
        io.to(roomId).emit('user_disconnected', userId);
        if (roomUsers.size === 0) rooms.delete(roomId);
      }
    }
  }
});


// API Endpoints using Supabase
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Sequoia Genesis Backend Running' });
});

// GET /api/portfolio
app.get('/api/portfolio', async (req: Request, res: Response) => {
  // Extract Bearer token to use user's context
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
     res.status(401).json({ error: 'Missing Authorization header' });
     return;
  }

  // Create a client scoped to the user
  const userClient = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: authHeader } }
  });

  // Fetch projects for this user
  const { data, error } = await userClient
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    res.status(500).json({ error: error.message });
    return;
  }

  // Map database fields to frontend structure if necessary
  // The frontend expects: id, title, category, description, strategicFit, marketRisk, validationProgress, wedgeLabel, wedgeValue
  // Our DB has: id, name, stage, description, radar, core_strategy, coherence_score
  
  const mappedPortfolio = data.map((p: any) => ({
    id: p.id,
    title: p.name,
    category: p.stage || 'Seed', // Default or map from DB
    description: p.description || '',
    strategicFit: p.coherence_score ? Math.round(Number(p.coherence_score)) : 0, 
    marketRisk: p.radar?.pacing || 'Medium', // Example mapping
    validationProgress: 0, // Placeholder or allow DB to store this
    wedgeLabel: 'Primary Wedge',
    wedgeValue: p.core_strategy?.primaryWedge || 'TBD' 
  }));

  res.json(mappedPortfolio);
});

// POST /api/portfolio - Create New Idea
app.post('/api/portfolio', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Missing Authorization header' });
    return;
  }
  
  const userClient = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: authHeader } }
  });

  const { title, description } = req.body;

  // Get user ID first to ensure we know who is owning it (though RLS handles it, good for owner_id field)
  const { data: { user }, error: userError } = await userClient.auth.getUser();
  if (userError || !user) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }

  const { data, error } = await userClient
    .from('projects')
    .insert([
      { 
        owner_id: user.id,
        name: title || 'Untitled Idea',
        description: description || '',
        stage: 'Concept',
        coherence_score: 50, // Default start
        radar: { novelty: 50, coherence: 50, execution: 50, pacing: 'Medium' },
        core_strategy: { primaryWedge: 'Undecided' }
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Create error:', error);
    res.status(500).json({ error: error.message });
    return;
  }

  // Initialize in-memory board for immediate collaboration
  if (data && data.id) {
    OUTLIER_BOARDS[data.id] = {
      id: data.id,
      title: data.name,
      subtitle: data.stage,
      nodes: initialNodes,
      edges: initialEdges,
      insights: {
         strategicFitScore: 50,
         strategicFitText: 'Initial Draft',
         suggestedActionTitle: 'Define Nodes',
         suggestedActionBody: 'Start mapping your idea.',
         marketRiskLabel: 'Medium',
         marketRiskText: 'Unknown'
       }
    };
  }

  res.json(data);
});

// GET /api/outliers (Static for now, could be DB later)
app.get('/api/outliers', (req: Request, res: Response) => {
  res.json(mockOutliers);
});

// GET /api/ideas/:ideaId
app.get('/api/ideas/:ideaId', async (req: Request, res: Response) => {
  const ideaId = req.params.ideaId as string;

  // 1. Try in-memory first to preserve unsaved changes or socket state
  if (OUTLIER_BOARDS[ideaId]) {
    res.json(OUTLIER_BOARDS[ideaId]);
    return;
  }
  
  try {
      const authHeader = req.headers.authorization;
      const client = authHeader 
        ? createClient(supabaseUrl, supabaseKey, { global: { headers: { Authorization: authHeader } } }) 
        : supabase;

      const { data, error } = await client
        .from('projects')
        .select('*')
        .eq('id', ideaId)
        .single();

      if (data) {
          console.log(`[DEBUG] Fetching project ${ideaId}. Name: ${data.name}, Stage: ${data.stage}`);
          
          // Construct dynamic nodes based on project data
          const dynamicNodes = initialNodes.map(node => {
              console.log(`[DEBUG] Processing node ${node.id} (${node.type})`);
              // Assuming node '2' is the main PaperNode in our template.
              // If initialNodes varies, this might need to be more robust (e.g. find by type or ID)
              if (node.id === '2' && node.type === 'paperNode') {
                  console.log(`[DEBUG] Updating node 2 with ${data.name}`);
                  return {
                      ...node,
                      data: {
                          ...node.data,
                          category: (data.stage || 'CONCEPT').toUpperCase(),
                          title: data.name,
                          label: data.name,
                          sublabel: data.description || 'No description provided.',
                          wedge: data.core_strategy?.primaryWedge || 'Undecided',
                          strategicFit: data.coherence_score ? Math.round(data.coherence_score) : 0,
                          marketRisk: (data.radar?.pacing || 'MEDIUM').toUpperCase(),
                          progress: 0 // Default for new projects
                      }
                  };
              }
              return node;
          });

          const board = {
             id: data.id,
             title: data.name,
             subtitle: data.stage || 'Draft',
             nodes: dynamicNodes, // Use dynamic nodes
             edges: initialEdges,
             insights: {
                 strategicFitScore: data.coherence_score || 0,
                 strategicFitText: 'Calculated from DB',
                 suggestedActionTitle: 'Continue Planning',
                 suggestedActionBody: ' refine your strategy.',
                 marketRiskLabel: data.radar?.pacing || 'Medium',
                 marketRiskText: 'Based on initial assessment'
             }
          };
          
          // Cache in memory for socket interactions
          OUTLIER_BOARDS[ideaId] = board;
          
          res.json(board);
          return;
      }
  } catch (err) {
      console.error('Error fetching project from DB:', err);
  }

  // 3. Last resort fallback (e.g. for non-existent IDs or errors)
  res.json({
      id: ideaId,
      nodes: initialNodes,
      edges: initialEdges,
      title: 'Project ' + ideaId.substring(0,4)
  });
});

app.post('/api/echo', (req: Request, res: Response) => {
  res.json({ message: 'Echo received', data: req.body });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
