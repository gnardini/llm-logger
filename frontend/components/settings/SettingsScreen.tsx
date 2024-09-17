import { Button, ButtonType } from '@frontend/components/common/Button';
import { Container } from '@frontend/components/common/Container';
import { ApiKey } from '@type/apiKey';
import { Tab } from '@type/tabs';
import { useState } from 'react';
import { CreateOrgModal } from './modals/CreateOrgModal';

interface Props {
  apiKeys: ApiKey[];
}

export function SettingsScreen({ apiKeys }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container activeTab={Tab.Settings} showSideBar>
      <h1>Settings</h1>
      <Button type={ButtonType.Primary} onClick={() => setIsModalOpen(true)} className="mt-4 p-3">
        Create project
      </Button>
      <CreateOrgModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">API Keys</h2>
        {apiKeys.length > 0 ? (
          <ul className="space-y-2">
            {apiKeys.map((apiKey) => (
              <li key={apiKey.id} className="bg-secondary-background p-4 rounded-md">
                <p className="font-semibold">{apiKey.name || 'Unnamed Key'}</p>
                <p className="text-sm text-text-secondary">{apiKey.key}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No API keys found.</p>
        )}
      </div>
    </Container>
  );
}
