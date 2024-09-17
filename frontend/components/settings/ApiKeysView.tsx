import React, { useState } from 'react';
import { ApiKey } from '@type/apiKey';
import { Button, ButtonType } from '@frontend/components/common/Button';
import { Input } from '@frontend/components/common/Input';

interface Props {
  apiKeys: ApiKey[];
}

export function ApiKeysView({ apiKeys: initialApiKeys }: Props) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  // const updateApiKey = useUpdateApiKeyQuery();
  // const deleteApiKey = useDeleteApiKeyQuery();

  const handleEdit = (apiKey: ApiKey) => {
    setEditingId(apiKey.id);
    setEditName(apiKey.name || '');
  };

  const handleSave = async (apiKey: ApiKey) => {
    try {
      // await updateApiKey.execute({ id: apiKey.id, name: editName });
      setEditingId(null);
      // TODO: Call setApiKeys() to update 
    } catch (error) {
      console.error('Failed to update API key:', error);
    }
  };

  const handleDelete = async (apiKey: ApiKey) => {
    if (window.confirm('Are you sure you want to delete this API key?')) {
      try {
        // await deleteApiKey.execute({ id: apiKey.id });
        // TODO: Call setApiKeys() to delete 
      } catch (error) {
        console.error('Failed to delete API key:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      {apiKeys.map((apiKey) => (
        <div key={apiKey.id} className="bg-secondary-background p-4 rounded-md">
          {editingId === apiKey.id ? (
            <div className="flex items-center space-x-2">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="API Key Name"
              />
              <Button type={ButtonType.Primary} onClick={() => handleSave(apiKey)}>
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
                <Button type={ButtonType.Warning} onClick={() => handleDelete(apiKey)}>
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}