
import { Button } from '@frontend/components/common/Button';
import { Dropdown } from '@frontend/components/common/Dropdown';
import { useLogsData } from '@frontend/components/logs/data/useLogsData';
import { LogsRow } from '@frontend/components/logs/views/LogsRow';
import { Log } from '@type/log';
import { useState } from 'react';
import { ColumnVisibilityModal } from '../modals/ColumnVisibilityModal';
import { useColumnVisibility, ColumnName } from '../hooks/useColumnVisibility';

interface LogsTableProps {
  initialLogs: Log[];
  tags: string[];
}

const rowClassName = 'px-4 py-2 text-center';
const headerClassNames = `${rowClassName} text-xs uppercase font-semibold border-x border-text-secondary first:border-l-0 last:border-r-0`;

export function LogsTable({ initialLogs, tags }: LogsTableProps) {
  const { logs, loading, error, tagsFilter, setTagsFilter, loadMoreLogs, hasMoreLogs } =
    useLogsData(initialLogs);
  const [isColumnModalVisible, setIsColumnModalVisible] = useState(false);
  const { visibleColumns, toggleColumn } = useColumnVisibility();

  if (loading && logs.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const tagOptions = tags.map((tag) => ({ label: tag, value: tag }));

  const columnHeaders: Record<ColumnName, string> = {
    time: 'Time',
    model: 'Model',
    inputTokens: 'Input Tokens',
    outputTokens: 'Output Tokens',
    tags: 'Tags',
    user: 'User',
    error: 'Error',
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex-grow">
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
        <button
          onClick={() => setIsColumnModalVisible(true)}
          className="ml-4 p-2 rounded-full hover:bg-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="rounded-xl overflow-hidden border border-primary-accent">
          <table className="border-collapse w-full">
            <thead>
              <tr className="bg-primary-accent">
                {(Object.keys(columnHeaders) as ColumnName[]).map((column) => (
                  visibleColumns.includes(column) && (
                    <th key={column} className={`${headerClassNames}`}>{columnHeaders[column]}</th>
                  )
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <LogsRow key={log.id} log={log} visibleColumns={visibleColumns} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {hasMoreLogs && (
        <div className="mt-4 text-center">
          <Button onClick={loadMoreLogs} loading={loading}>
            Load more
          </Button>
        </div>
      )}
      <ColumnVisibilityModal
        visible={isColumnModalVisible}
        closeModal={() => setIsColumnModalVisible(false)}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
      />
    </div>
  );
}
