import { create } from 'zustand';
import Peer, { DataConnection } from 'peerjs';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  type: 'TEXT' | 'FILE' | 'ALERT';
  content: string;
  sender: string;
  timestamp: number;
}

interface PeerState {
  peer: Peer | null;
  connections: DataConnection[];
  messages: Message[];
  peerId: string;
  initialize: () => void;
  sendMessage: (content: string, type?: Message['type']) => void;
  addMessage: (message: Message) => void;
  addConnection: (connection: DataConnection) => void;
}

export const usePeerStore = create<PeerState>((set, get) => ({
  peer: null,
  connections: [],
  messages: [],
  peerId: '',

  initialize: () => {
    const peer = new Peer(uuidv4());
    
    peer.on('open', (id) => {
      set({ peerId: id });
    });

    peer.on('connection', (conn) => {
      get().addConnection(conn);
    });

    set({ peer });
  },

  sendMessage: (content: string, type: Message['type'] = 'TEXT') => {
    const message: Message = {
      id: uuidv4(),
      type,
      content,
      sender: get().peerId,
      timestamp: Date.now()
    };

    get().connections.forEach((conn) => {
      conn.send(message);
    });

    get().addMessage(message);
  },

  addMessage: (message: Message) => {
    set((state) => ({
      messages: [...state.messages, message]
    }));
  },

  addConnection: (connection: DataConnection) => {
    connection.on('data', (data: Message) => {
      get().addMessage(data);
    });

    set((state) => ({
      connections: [...state.connections, connection]
    }));
  }
}));