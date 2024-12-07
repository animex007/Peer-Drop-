import { Nearby } from '@nativescript/nearby';
import { BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  type: 'TEXT' | 'FILE' | 'ALERT';
  content: string;
  sender: string;
  timestamp: number;
}

export class PeerService {
  private static instance: PeerService;
  private nearby: Nearby;
  private deviceId: string;

  public messages$ = new BehaviorSubject<Message[]>([]);
  public peers$ = new BehaviorSubject<string[]>([]);
  public newMessage$ = new Subject<Message>();

  private constructor() {
    this.nearby = new Nearby();
    this.deviceId = uuidv4();
    this.initializeNearby();
  }

  static getInstance(): PeerService {
    if (!PeerService.instance) {
      PeerService.instance = new PeerService();
    }
    return PeerService.instance;
  }

  private initializeNearby() {
    this.nearby.init();
    
    this.nearby.on('peerDiscovered', (peer: any) => {
      const currentPeers = this.peers$.value;
      if (!currentPeers.includes(peer.id)) {
        this.peers$.next([...currentPeers, peer.id]);
      }
    });

    this.nearby.on('peerLost', (peer: any) => {
      const currentPeers = this.peers$.value;
      this.peers$.next(currentPeers.filter(p => p !== peer.id));
    });

    this.nearby.on('messageReceived', (message: any) => {
      const parsedMessage: Message = JSON.parse(message.content);
      this.handleNewMessage(parsedMessage);
    });
  }

  startAdvertising() {
    this.nearby.startAdvertising(this.deviceId);
  }

  startDiscovery() {
    this.nearby.startDiscovery();
  }

  sendMessage(content: string, type: Message['type'] = 'TEXT') {
    const message: Message = {
      id: uuidv4(),
      type,
      content,
      sender: this.deviceId,
      timestamp: Date.now()
    };

    this.nearby.sendMessage(JSON.stringify(message));
    this.handleNewMessage(message);
  }

  private handleNewMessage(message: Message) {
    const currentMessages = this.messages$.value;
    this.messages$.next([...currentMessages, message]);
    this.newMessage$.next(message);
  }
}