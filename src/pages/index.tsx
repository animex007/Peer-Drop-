import { useEffect } from 'react';
import { usePeerStore } from '../store/peerStore';
import PeerList from '../components/PeerList';
import Chat from '../components/Chat';
import FileShare from '../components/FileShare';

export default function Home() {
  const initialize = usePeerStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Peer Drop</h1>
      </header>
      
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <PeerList />
          <FileShare />
        </div>
        <Chat />
      </main>
    </div>
  );
}