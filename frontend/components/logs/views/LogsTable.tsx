import { Button } from '@frontend/components/common/Button';
import { Dropdown } from '@frontend/components/common/Dropdown';
import { useLogsData } from '@frontend/components/logs/data/useLogsData';
import { LogsRow } from '@frontend/components/logs/views/LogsRow';
import { Log } from '@type/log';
import { useState } from 'react';
import { ColumnVisibilityModal } from '../modals/ColumnVisibilityModal';
import { useColumnVisibility, ColumnName } from '../hooks/useColumnVisibility';
import { FaGear, FaArrowRight } from 'react-icons/fa6';
import { gray0 } from '@frontend/utils/colors';
import { Loader } from '@frontend/components/common/Loader';
import { Input } from '@frontend/components/common/Input';

interface LogsTableProps {
  initialLogs: Log[];
  tags: string[];
}

const rowClassName = 'px-4 py-2 text-center';
const headerClassNames = `${rowClassName} text-xs uppercase font-semibold border-x border-text-secondary first:border-l-0 last:border-r-0`;

export function LogsTable({ initialLogs, tags }: LogsTableProps) {
  const {
    logs,
    loading,
    error,
    tagsFilter,
    setTagsFilter,
    setUserFilter,
    loadMoreLogs,
    hasMoreLogs,
  } = useLogsData(initialLogs);
  const [isColumnModalVisible, setIsColumnModalVisible] = useState(false);
  const { visibleColumns, toggleColumn } = useColumnVisibility();
  const [userFilterInput, setUserFilterInput] = useState('');

  if (loading && logs.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const tagOptions = tags.map((tag) => ({ label: tag, value: tag }));

  const handleUserFilterSubmit = () => {
    setUserFilter(userFilterInput);
  };

  const handleClearFilters = () => {
    setTagsFilter([]);
    setUserFilter(null);
    setUserFilterInput('');
  };

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
      <div className="mb-4 flex flex-wrap justify-between items-center">
        <div className="flex-grow mr-4 mb-2 sm:mb-0 flex items-end gap-4">
          <Dropdown
            className="w-fit mt-2 sm:min-w-[200px]"
            options={tagOptions}
            selectedOption={tagOptions.find((option) => option.value === tagsFilter[0])}
            setSelectedOption={(option) => setTagsFilter(option ? [option.value] : [])}
            label="Filter by Tag"
            placeholder={'Pick a tag'}
            renderOption={(option) => <span>{option?.label}</span>}
            filterable
            toString={(option) => option!.label}
          />

          <div className="flex items-center mb-2 sm:mb-0">
            <Input
              value={userFilterInput}
              onChange={(e) => setUserFilterInput(e.target.value)}
              placeholder="Filter by User"
              className="mr-2 bg-secondary-background"
            />
            <Button
              onClick={handleUserFilterSubmit}
              disabled={!userFilterInput}
              className={`p-2 rounded-full ${
                userFilterInput ? 'bg-primary-accent hover:bg-secondary-accent' : 'bg-gray-700'
              }`}
            >
              <FaArrowRight color={gray0} />
            </Button>
          </div>
          {(tagsFilter.length > 0 || userFilter) && (
            <button
              onClick={handleClearFilters}
              className="mr-4 underline text-text-primary hover:text-secondary-accent"
            >
              Clear Filters
            </button>
          )}
        </div>
        <FaGear
          size={36}
          color={gray0}
          onClick={() => setIsColumnModalVisible(true)}
          className="p-2 rounded-full hover:bg-gray-700 cursor-pointer"
        />

      </div>
      {loading && <Loader className="mb-4" />}
      <div className="overflow-x-auto rounded-xl border border-primary-accent">
        <table className="border-collapse w-full min-w-max">
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
