import { Button } from '@frontend/components/common/Button';
import { Dropdown } from '@frontend/components/common/Dropdown';
import { useLogsData } from '@frontend/components/logs/data/useLogsData';
import { LogsRow } from '@frontend/components/logs/views/LogsRow';
import { Log } from '@type/log';

interface LogsTableProps {
  initialLogs: Log[];
  tags: string[];
}

const rowClassName = 'px-4 py-2 text-center';
const headerClassNames = `${rowClassName} text-xs uppercase font-semibold border-x border-text-secondary`;

export function LogsTable({ initialLogs, tags }: LogsTableProps) {
  const { logs, loading, error, tagsFilter, setTagsFilter, loadMoreLogs, hasMoreLogs } =
    useLogsData(initialLogs);

  if (loading && logs.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const tagOptions = tags.map((tag) => ({ label: tag, value: tag }));

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-text-primary">Filter by Tag</h2>
        <Dropdown
          options={tagOptions}
          selectedOption={tagOptions.find((option) => option.value === tagsFilter[0])}
          setSelectedOption={(option) => setTagsFilter(option ? [option.value] : [])}
          placeholder={'Pick a tag'}
          label={'Tags'}
          renderOption={(option) => <span>{option?.label}</span>}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="border-collapse w-full rounded border border-primary-accent">
          <thead>
            <tr className="bg-primary-accent">
              <th className={headerClassNames}>Time</th>
              <th className={headerClassNames}>Model</th>
              <th className={headerClassNames}>Input Tokens</th>
              <th className={headerClassNames}>Output Tokens</th>
              <th className={`${headerClassNames} w-[50px]`}>Error</th>
              <th className={headerClassNames}>Tags</th>
              <th className={headerClassNames}>User</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <LogsRow key={log.id} log={log} />
            ))}
          </tbody>
        </table>
      </div>
      {hasMoreLogs && (
        <div className="mt-4 text-center">
          <Button onClick={loadMoreLogs} loading={loading}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
