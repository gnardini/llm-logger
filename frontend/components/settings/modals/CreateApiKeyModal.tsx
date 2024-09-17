import { Button, ButtonType } from '@frontend/components/common/Button';
import { Input } from '@frontend/components/common/Input';
import { Modal } from '@frontend/components/common/Modal';
import { useState } from 'react';
import { useCreateApiKeyQuery } from '@frontend/queries/apiKeys/useCreateApiKeyQuery';
import { ApiKey } from '@type/apiKey';
import { useNotification } from '@frontend/context/NotificationContext';
import { FaCopy } from 'react-icons/fa';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (apiKey: ApiKey) => void;
  organizationId: string;
}

const redactApiKey = (key: string): string => {
  if (key.length <= 8) return key;
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
};

export function CreateApiKeyModal({ isOpen, onClose, onCreate, organizationId }: Props) {
  const [name, setName] = useState('');
  const [createdApiKey, setCreatedApiKey] = useState<ApiKey | null>(null);
  const createApiKey = useCreateApiKeyQuery();
  const { showNotification } = useNotification();

  const handleCreate = async () => {
    if (name.trim()) {
      try {
        const newApiKey = await createApiKey.execute({
          name: name.trim(),
          organization_id: organizationId,
        });
        setCreatedApiKey(newApiKey);
      } catch (error) {
        console.error('Failed to create API key:', error);
      }
    }
  };

  const handleClose = () => {
    if (createdApiKey) {
      onCreate({
        ...createdApiKey,
        key: redactApiKey(createdApiKey.key),
      });
    }
    setName('');
    setCreatedApiKey(null);
    onClose();
  };

  return (
    <Modal visible={isOpen} closeModal={handleClose}>
      <h2 className="text-2xl font-bold mb-4">Create New API Key</h2>
      {!createdApiKey ? (
        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="API Key Name (optional)"
          />
          <div className="flex justify-end space-x-2">
            <Button type={ButtonType.Secondary} onClick={handleClose}>
              Cancel
            </Button>
            <Button type={ButtonType.Primary} onClick={handleCreate} loading={createApiKey.loading}>
              Create
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Please copy your new API key. You won't be able to see it again, but you can always
            create new ones later.
          </p>
          <div
            className="flex items-center bg-secondary-background rounded cursor-pointer"
            onClick={() => {
              if (createdApiKey) {
                navigator.clipboard.writeText(createdApiKey.key);
                showNotification('API key copied to clipboard', 'success');
              }
            }}
          >
            <Input
              value={createdApiKey.key}
              readOnly
              className="flex-grow border-none"
              onClick={(e) => {
                e.stopPropagation();
                (e.target as HTMLInputElement).select();
              }}
            />
            <FaCopy className="w-5 h-5 mx-2 text-text-secondary hover:text-primary-accent" />
          </div>
          <div className="flex justify-end">
            <Button type={ButtonType.Primary} onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      )}
      {createApiKey.error && <p className="text-error mt-2">{createApiKey.error}</p>}
    </Modal>
  );
}
