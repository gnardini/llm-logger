import { Button } from '@frontend/components/common/Button';
import { Dropdown } from '@frontend/components/common/Dropdown';
import { useLogsData } from '@frontend/components/logs/data/useLogsData';
import { LogsRow } from '@frontend/components/logs/views/LogsRow';
import { Log } from '@type/log';
import { useState } from 'react';
import { ColumnVisibilityModal } from '../modals/ColumnVisibilityModal';
import { useColumnVisibility, ColumnName } from '../hooks/useColumnVisibility';
import { FaGear } from 'react-icons/fa6';
import { gray0 } from '@frontend/utils/colors';

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
        <FaGear
          size={36}
          color={gray0}
          onClick={() => setIsColumnModalVisible(true)}
          className="ml-4 p-2 rounded-full hover:bg-gray-700 cursor-pointer"
        />
      </div>
      <div className="overflow-x-auto">
        <div className="rounded-xl overflow-hidden border border-primary-accent">
          <table className="border-collapse w-full">
            <thead>
              <tr className="bg-primary-accent">
                {(Object.keys(columnHeaders) as ColumnName[]).map(
                  (column) =>
                    visibleColumns.includes(column) && (
                      <th key={column} className={`${headerClassNames}`}>
                        {columnHeaders[column]}
                      </th>
                    ),
                )}
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
