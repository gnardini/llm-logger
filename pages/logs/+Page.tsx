import { LogsScreen } from '@frontend/components/logs/LogsScreen';
import { AuthProvider } from '@frontend/context/AuthContext';
import { NotificationProvider } from '@frontend/context/NotificationContext';
import { LogData } from 'pages/logs/+data';
import { useData } from 'vike-react/useData';

export default function Page() {
  const { organizations, activeOrg, membershipType, logs, tags, user } = useData<LogData>();

  return (
    <>
      <NotificationProvider>
        <AuthProvider user={user} organizations={organizations} activeOrg={activeOrg}>
          <LogsScreen
            logs={logs}
            tags={tags}
            activeOrg={activeOrg}
            membershipType={membershipType}
          />
        </AuthProvider>
      </NotificationProvider>
    </>
  );
}
