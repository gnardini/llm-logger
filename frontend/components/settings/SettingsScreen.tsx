import { Button, ButtonType } from '@frontend/components/common/Button';
import { Container } from '@frontend/components/common/Container';
import { Loader } from '@frontend/components/common/Loader';
import { useAuth } from '@frontend/context/AuthContext';
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
  const { loadingOrg, activeOrg } = useAuth();

  return (
    <Container activeTab={Tab.Settings} showSideBar>
      <div className="max-w-[800px] mt-12 md:mt-6 mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <h1 className="text-3xl mb-4 md:mb-0">{activeOrg?.name} Settings</h1>
          <Button
            type={ButtonType.Primary}
            onClick={() => setIsModalOpen(true)}
            className="w-fit px-3 py-2"
          >
            New Organization
          </Button>
        </div>
        <CreateOrgModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {loadingOrg ? (
          <Loader />
        ) : (
          activeOrg && <ApiKeysView organization={activeOrg} apiKeys={apiKeys} />
        )}
      </div>
    </Container>
  );
}
