import { Container } from '@frontend/components/common/Container';
import { Loader } from '@frontend/components/common/Loader';
import { LogsTable } from '@frontend/components/logs/views/LogsTable';
import { SetupView } from '@frontend/components/settings/views/SetupView';
import { useAuth } from '@frontend/context/AuthContext';
import { PaginatedLogs } from '@type/log';
import { Organization } from '@type/organization';
import { Tab } from '@type/tabs';
import { MembershipType } from '@type/user';
import { LiveDemoBanner } from './views/LiveDemoBanner';
import { AuthModal } from '@frontend/components/auth/AuthModal';
import { useState } from 'react';

interface LogsScreenProps {
  activeOrg: Organization;
  membershipType: MembershipType;
  logs: PaginatedLogs;
  tags: string[];
}

export function LogsScreen({ activeOrg, logs, tags, membershipType }: LogsScreenProps) {
  const { loadingOrg } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <Container activeTab={Tab.Logs} showSideBar={membershipType !== 'guest'}>
      {membershipType === 'guest' && <LiveDemoBanner onRegisterClick={handleRegisterClick} />}
      <h1 className="text-3xl mt-12 md:mt-6">{activeOrg.name} Logs</h1>
      {loadingOrg ? (
        <Loader />
      ) : logs.logs.length > 0 ? (
        <LogsTable initialLogs={logs.logs} tags={tags} />
      ) : (
        <SetupView isSettingsScreen={false} />
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
    </Container>
  );
}