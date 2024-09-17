import React, { useState } from 'react';
import { ApiKey } from '@type/apiKey';
import { Button, ButtonType } from '@frontend/components/common/Button';
import { Input } from '@frontend/components/common/Input';
import { useUpdateApiKeyQuery } from '@frontend/queries/apiKeys/useUpdateApiKeyQuery';
import { useDeleteApiKeyQuery } from '@frontend/queries/apiKeys/useDeleteApiKeyQuery';
import { useCreateApiKeyQuery } from '@frontend/queries/apiKeys/useCreateApiKeyQuery';

interface Props {
  apiKeys: ApiKey[];
}

export function ApiKeysView({ apiKeys: initialApiKeys }: Props) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [newKeyName, setNewKeyName] = useState('');

  const updateApiKey = useUpdateApiKeyQuery();
  const deleteApiKey = useDeleteApiKeyQuery();
  const createApiKey = useCreateApiKeyQuery();

  const handleEdit = (apiKey: ApiKey) => {
    setEditingId(apiKey.id);
    setEditName(apiKey.name || '');
  };

  const handleSave = async (apiKey: ApiKey) => {
    try {
      const updatedApiKey = await updateApiKey.execute({ id: apiKey.id, name: editName });
      setApiKeys(keys => keys.map(key => key.id === apiKey.id ? updatedApiKey : key));
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update API key:', error);
    }
  };

  const handleDelete = async (apiKey: ApiKey) => {
    if (window.confirm('Are you sure you want to delete this API key?')) {
      try {
        await deleteApiKey.execute({ id: apiKey.id });
        setApiKeys(keys => keys.filter(key => key.id !== apiKey.id));
      } catch (error) {
        console.error('Failed to delete API key:', error);
      }
    }
  };

  const handleCreate = async () => {
    try {
      const newApiKey = await createApiKey.execute({ name: newKeyName });
      setApiKeys(keys => [...keys, newApiKey]);
      setNewKeyName('');
    } catch (error) {
      console.error('Failed to create API key:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Input
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          placeholder="New API Key Name"
        />
        <Button 
          type={ButtonType.Primary} 
          onClick={handleCreate}
          disabled={createApiKey.loading || !newKeyName.trim()}
        >
          Create New Key
        </Button>
      </div>
      {apiKeys.map((apiKey) => (
        <div key={apiKey.id} className="bg-secondary-background p-4 rounded-md">
          {editingId === apiKey.id ? (
            <div className="flex items-center space-x-2">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="API Key Name"
              />
              <Button 
                type={ButtonType.Primary} 
                onClick={() => handleSave(apiKey)}
                disabled={updateApiKey.loading}
              >
                Save
              </Button>
              <Button type={ButtonType.Secondary} onClick={() => setEditingId(null)}>
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{apiKey.name || 'Unnamed Key'}</p>
                <p className="text-sm text-text-secondary">{apiKey.key}</p>
                <p className="text-xs text-text-tertiary">
                  Last used: {apiKey.last_used_at || 'Never'}
                </p>
              </div>
              <div className="space-x-2">
                <Button type={ButtonType.Secondary} onClick={() => handleEdit(apiKey)}>
                  Edit
                </Button>
                <Button 
                  type={ButtonType.Warning} 
                  onClick={() => handleDelete(apiKey)}
                  disabled={deleteApiKey.loading}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
      {(updateApiKey.error || deleteApiKey.error || createApiKey.error) && (
        <p className="text-error mt-2">
          {updateApiKey.error || deleteApiKey.error || createApiKey.error}
        </p>
      )}
    </div>
  );
}