import { Button, ButtonType } from '@frontend/components/common/Button';
import { Container } from '@frontend/components/common/Container';
import { ApiKey } from '@type/apiKey';
import { Tab } from '@type/tabs';
import { useState } from 'react';
import { ApiKeysView } from './ApiKeysView';
import { CreateOrgModal } from './modals/CreateOrgModal';
import { useAuth } from '@frontend/context/AuthContext';
import useIsTransitioning from '@frontend/hooks/useIsTransitioning';
import { Loader } from '@frontend/components/common/Loader';

interface Props {
  apiKeys: ApiKey[];
}

export function SettingsScreen({ apiKeys }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeOrg } = useAuth();

  const routeLoading = useIsTransitioning();

  return (
    <Container activeTab={Tab.Settings} showSideBar>
      <div className="max-w-[800px] mt-6 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl">{activeOrg?.name} Settings</h1>
          <Button type={ButtonType.Primary} onClick={() => setIsModalOpen(true)} className="p-3">
            New Organization
          </Button>
        </div>
        <CreateOrgModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {routeLoading && <Loader />}

        {activeOrg && <ApiKeysView organization={activeOrg} apiKeys={apiKeys} />}
      </div>
    </Container>
  );
}
