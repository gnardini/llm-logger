import { Button, ButtonType } from '@frontend/components/common/Button';
import { Container } from '@frontend/components/common/Container';
import { Loader } from '@frontend/components/common/Loader';
import { useAuth } from '@frontend/context/AuthContext';
import { ApiKey } from '@type/apiKey';
import { Tab } from '@type/tabs';
import { MembershipType } from '@type/user';
import { useState } from 'react';
import { ApiKeysView } from './ApiKeysView';
import { CreateOrgModal } from './modals/CreateOrgModal';
import { ManageTeamModal } from './modals/ManageTeamModal';
import { SetupView } from '@frontend/components/settings/views/SetupView';

interface Props {
  apiKeys: ApiKey[];
  membershipType: MembershipType;
}

export function SettingsScreen({ apiKeys, membershipType }: Props) {
  const [isCreateOrgModalOpen, setIsCreateOrgModalOpen] = useState(false);
  const [isManageTeamModalOpen, setIsManageTeamModalOpen] = useState(false);
  const { loadingOrg, activeOrg } = useAuth();

  return (
    <Container activeTab={Tab.Settings} showSideBar>
      <div className="max-w-[800px] mt-12 md:mt-6 mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <h1 className="text-3xl mb-4 md:mb-0">{activeOrg?.name} Settings</h1>
        </div>
        <div className="flex flex-col md:flex-row md:justify-start md:items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <Button
            type={ButtonType.Secondary}
            onClick={() => setIsCreateOrgModalOpen(true)}
            className="w-fit px-3 py-2"
          >
            Create New Organization
          </Button>
          <Button
            type={ButtonType.Secondary}
            onClick={() => setIsManageTeamModalOpen(true)}
            className="w-fit px-3 py-2"
          >
            Manage Members
          </Button>
        </div>
        <CreateOrgModal
          isOpen={isCreateOrgModalOpen}
          onClose={() => setIsCreateOrgModalOpen(false)}
        />
        {activeOrg && (
          <ManageTeamModal
            visible={isManageTeamModalOpen}
            closeModal={() => setIsManageTeamModalOpen(false)}
            organizationId={activeOrg.id}
            membershipType={membershipType}
          />
        )}

        {loadingOrg ? (
          <Loader />
        ) : (
          activeOrg && <ApiKeysView organization={activeOrg} apiKeys={apiKeys} />
        )}
        <SetupView isSettingsScreen={true} />
      </div>
    </Container>
  );
}
