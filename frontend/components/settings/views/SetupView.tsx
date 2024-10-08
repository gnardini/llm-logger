import React, { useState } from 'react';
import { NodeJsTab } from './NodeJsTab';
import { ApiTab } from './ApiTab';

interface SetupViewProps {
  isSettingsScreen: boolean;
}

export const SetupView: React.FC<SetupViewProps> = ({ isSettingsScreen }) => {
  const [activeTab, setActiveTab] = useState<'nodejs' | 'api'>('nodejs');

  return (
    <div className="bg-secondary-background p-6 mt-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Setup Instructions</h2>
      <p className="mb-4">
        To get started, you need to get an API key from{' '}
        {isSettingsScreen ? (
          'the "New API Key" button above'
        ) : (
          <a href="/settings" className="text-secondary-accent hover:underline">
            the Settings screen
          </a>
        )}
        .
      </p>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === 'nodejs' ? 'bg-blue-600' : 'bg-tertiary-background'
          }`}
          onClick={() => setActiveTab('nodejs')}
        >
          Node.js
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'api' ? 'bg-blue-600' : 'bg-tertiary-background'}`}
          onClick={() => setActiveTab('api')}
        >
          API
        </button>
      </div>
      {activeTab === 'nodejs' ? <NodeJsTab /> : <ApiTab />}
    </div>
  );
};
