import React, { useState } from 'react';
import { ApiKey } from '@type/apiKey';
import { Organization } from '@type/organization';
import { Button, ButtonType } from '@frontend/components/common/Button';
import { useCreateApiKeyQuery } from '@frontend/queries/apiKeys/useCreateApiKeyQuery';
import { CreateApiKeyModal } from './modals/CreateApiKeyModal';
import { ApiKeyView } from './views/ApiKeyView';

interface Props {
  apiKeys: ApiKey[];
  organization: Organization;
}

export function ApiKeysView({ apiKeys: initialApiKeys, organization }: Props) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createApiKey = useCreateApiKeyQuery();

  const handleCreate = (newApiKey: ApiKey) => {
    setApiKeys(keys => [...keys, newApiKey]);
    setIsModalOpen(false);
  };

  const handleUpdate = (updatedApiKey: ApiKey) => {
    setApiKeys(keys => keys.map(key => key.id === updatedApiKey.id ? updatedApiKey : key));
  };

  const handleDelete = (apiKeyId: string) => {
    setApiKeys(keys => keys.filter(key => key.id !== apiKeyId));
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">API Keys</h2>
        <Button 
          type={ButtonType.Primary} 
          onClick={() => setIsModalOpen(true)}
        >
          New API Key
        </Button>
      </div>
      <CreateApiKeyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreate}
        organizationId={organization.id}
      />
      {apiKeys.map((apiKey) => (
        <ApiKeyView
          key={apiKey.id}
          apiKey={apiKey}
          organizationId={organization.id}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
      {createApiKey.error && (
        <p className="text-error mt-2">{createApiKey.error}</p>
      )}
    </div>
  );
}