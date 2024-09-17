import { Container } from '@frontend/components/common/Container';
import { LogsTable } from '@frontend/components/logs/views/LogsTable';
import { PaginatedLogs } from '@type/log';
import { Organization } from '@type/organization';
import { Tab } from '@type/tabs';

interface LogsScreenProps {
  activeOrg: Organization;
  membershipType: 'owner' | 'admin' | 'member';
  logs: PaginatedLogs;
  tags: string[];
}

export function LogsScreen({ activeOrg, logs, tags }: LogsScreenProps) {
  return (
    <Container activeTab={Tab.Logs} showSideBar>
      <h1 className="text-3xl mt-12 md:mt-6">{activeOrg.name} Logs</h1>
      <LogsTable initialLogs={logs.logs} tags={tags} />
    </Container>
  );
}
