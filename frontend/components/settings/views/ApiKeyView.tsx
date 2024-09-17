import React, { useState } from 'react';
import { ApiKey } from '@type/apiKey';
import { Button, ButtonType } from '@frontend/components/common/Button';
import { Input } from '@frontend/components/common/Input';
import { useUpdateApiKeyQuery } from '@frontend/queries/apiKeys/useUpdateApiKeyQuery';
import { useDeleteApiKeyQuery } from '@frontend/queries/apiKeys/useDeleteApiKeyQuery';

interface Props {
  apiKey: ApiKey;
  organizationId: string;
  onUpdate: (updatedApiKey: ApiKey) => void;
  onDelete: (apiKeyId: string) => void;
}

export function ApiKeyView({ apiKey, organizationId, onUpdate, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(apiKey.name || '');

  const updateApiKey = useUpdateApiKeyQuery();
  const deleteApiKey = useDeleteApiKeyQuery();

  const handleEdit = () => {
    setIsEditing(true);
    setEditName(apiKey.name || '');
  };

  const handleSave = async () => {
    try {
      const updatedApiKey = await updateApiKey.execute({ 
        api_key_id: apiKey.id, 
        organization_id: organizationId, 
        name: editName 
      });
      onUpdate(updatedApiKey);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update API key:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this API key?')) {
      try {
        await deleteApiKey.execute({ 
          api_key_id: apiKey.id, 
          organization_id: organizationId 
        });
        onDelete(apiKey.id);
      } catch (error) {
        console.error('Failed to delete API key:', error);
      }
    }
  };

  return (
    <div className="bg-secondary-background p-4 rounded-md">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="API Key Name"
          />
          <Button 
            type={ButtonType.Primary} 
            onClick={handleSave}
            loading={updateApiKey.loading}
          >
            Save
          </Button>
          <Button type={ButtonType.Secondary} onClick={() => setIsEditing(false)}>
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
            <Button type={ButtonType.Secondary} onClick={handleEdit}>
              Edit
            </Button>
            <Button 
              type={ButtonType.Warning} 
              onClick={handleDelete}
              loading={deleteApiKey.loading}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      {(updateApiKey.error || deleteApiKey.error) && (
        <p className="text-error mt-2">
          {updateApiKey.error || deleteApiKey.error}
        </p>
      )}
    </div>
  );
}