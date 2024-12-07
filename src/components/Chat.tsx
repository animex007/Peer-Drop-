import { useState } from 'react';
import { usePeerStore } from '../store/peerStore';

export default function Chat() {
  const [message, setMessage] = useState('');
  const { messages, sendMessage } = usePeerStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 h-[600px] flex flex-col">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="p-2 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">{msg.sender}</p>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}