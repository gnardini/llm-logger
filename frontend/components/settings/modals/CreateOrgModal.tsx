import { Button, ButtonType } from '@frontend/components/common/Button';
import { Input } from '@frontend/components/common/Input';
import { Modal } from '@frontend/components/common/Modal';
import { useAuth } from '@frontend/context/AuthContext';
import { useCreateOrgQuery } from '@frontend/queries/organizations/useCreateOrgQuery';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateOrgModal({ isOpen, onClose }: Props) {
  const [orgName, setOrgName] = useState('');
  const { execute, loading, error } = useCreateOrgQuery();
  const { addOrganization } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await execute({ name: orgName });
    addOrganization(result.organization);
    // TODO: Handle the result
  };

  return (
    <Modal visible={isOpen} closeModal={onClose}>
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="orgName" className="block mb-2">
            Project Name
          </label>
          <Input
            id="orgName"
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-error mb-4">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button type={ButtonType.Secondary} onClick={onClose}>
            Cancel
          </Button>
          <Button type={ButtonType.Primary} loading={loading}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
