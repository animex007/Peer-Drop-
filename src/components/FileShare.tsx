import { useState, useRef } from 'react';
import { usePeerStore } from '../store/peerStore';

export default function FileShare() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sendMessage = usePeerStore((state) => state.sendMessage);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const shareFile = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        sendMessage(JSON.stringify({
          name: selectedFile.name,
          type: selectedFile.type,
          data: base64
        }), 'FILE');
      };
      reader.readAsDataURL(selectedFile);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Share Files</h2>
      
      <div className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        
        {selectedFile && (
          <div>
            <p className="text-sm text-gray-600">Selected file:</p>
            <p className="font-medium">{selectedFile.name}</p>
            <button
              onClick={shareFile}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Share File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}