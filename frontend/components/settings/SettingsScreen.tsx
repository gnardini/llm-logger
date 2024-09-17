import { Button, ButtonType } from '@frontend/components/common/Button';
import { Container } from '@frontend/components/common/Container';
import { useGetApiKeysQuery } from '@frontend/queries/apiKeys/useGetApiKeysQuery';
import { ApiKey } from '@type/apiKey';
import { Tab } from '@type/tabs';
import { useState } from 'react';
import { ApiKeysView } from './ApiKeysView';
import { CreateOrgModal } from './modals/CreateOrgModal';

interface Props {
  apiKeys: ApiKey[];
}

export function SettingsScreen({ apiKeys }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getApiKeys = useGetApiKeysQuery();

  return (
    <Container activeTab={Tab.Settings} showSideBar>
      <h1>Settings</h1>
      <Button type={ButtonType.Primary} onClick={() => setIsModalOpen(true)} className="mt-4 p-3">
        Create project
      </Button>
      <CreateOrgModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">API Keys</h2>
        <ApiKeysView apiKeys={apiKeys} />
      </div>
    </Container>
  );
}
