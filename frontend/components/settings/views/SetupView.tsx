import React, { useState } from 'react';
import { NodeJsTab } from './NodeJsTab';
import { ApiTab } from './ApiTab';

export const SetupView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nodejs' | 'api'>('nodejs');

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Setup Instructions</h2>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === 'nodejs' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
          onClick={() => setActiveTab('nodejs')}
        >
          Node.js
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === 'api' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
          onClick={() => setActiveTab('api')}
        >
          API
        </button>
      </div>
      {activeTab === 'nodejs' ? <NodeJsTab /> : <ApiTab />}
    </div>
  );
};