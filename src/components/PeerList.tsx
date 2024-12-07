import { useState } from 'react';
import { usePeerStore } from '../store/peerStore';

export default function PeerList() {
  const [peerIdToConnect, setPeerIdToConnect] = useState('');
  const { peer, peerId, connections } = usePeerStore();

  const connectToPeer = () => {
    if (peer && peerIdToConnect) {
      const conn = peer.connect(peerIdToConnect);
      usePeerStore.getState().addConnection(conn);
      setPeerIdToConnect('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Peers</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">Your Peer ID:</p>
        <p className="font-mono bg-gray-100 p-2 rounded">{peerId}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Connect to Peer:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={peerIdToConnect}
            onChange={(e) => setPeerIdToConnect(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
            placeholder="Enter peer ID..."
          />
          <button
            onClick={connectToPeer}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Connect
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Connected Peers:</p>
        {connections.length === 0 ? (
          <p className="text-gray-500">No peers connected</p>
        ) : (
          <ul className="space-y-2">
            {connections.map((conn) => (
              <li key={conn.peer} className="bg-gray-100 p-2 rounded">
                {conn.peer}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}