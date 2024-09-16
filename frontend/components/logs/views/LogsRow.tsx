import { Loader } from '@frontend/components/common/Loader';
import { LogView } from '@frontend/components/logs/views/LogView';
import { useGetLogDetailsQuery } from '@frontend/queries/logs/useGetLogDetailsQuery';
import { FullLog, Log } from '@type/log';
import { useState } from 'react';

interface LogsRowProps {
  log: Log;
}

const rowClassName = 'px-4 py-2 text-center';

export function LogsRow({ log }: LogsRowProps) {
  const [expanded, setExpanded] = useState(false);
  const { execute, loading, error } = useGetLogDetailsQuery();
  const [logDetails, setLogDetails] = useState<FullLog | null>(null);

  const handleRowClick = async () => {
    setExpanded(!expanded);
    if (!logDetails && !expanded) {
      const result = await execute({ id: log.id });
      if (result) {
        setLogDetails(result);
      }
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return {
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString(),
    };
  };

  const { date, time } = formatDate(log.created_at);

  return (
    <>
      <tr
        key={log.id}
        className="border-t border-gray-300 cursor-pointer hover:bg-gray-700"
        onClick={handleRowClick}
      >
        <td className={`${rowClassName} align-middle`}>
          <div className="flex flex-col items-center min-w-[70px]">
            <span className="text-sm">{date}</span>
            <span className="text-xs text-gray-400">{time}</span>
          </div>
        </td>
        <td className={rowClassName}>{log.model}</td>
        <td className={rowClassName}>{log.input_tokens}</td>
        <td className={rowClassName}>{log.output_tokens}</td>
        <td className={rowClassName}>
          {log.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {log.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 rounded-full bg-primary-accent">
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            '-'
          )}
        </td>
        <td className={rowClassName}>{log.user || '-'}</td>
        <td className={`${rowClassName} w-[50px] max-w-[50px] overflow-x-auto whitespace-nowrap`}>
          {log.error || '-'}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={8} className="px-4 py-2">
            {loading && <Loader />}
            {error && <div>There was an error loading the log details: {error}</div>}
            {logDetails && <LogView logDetails={logDetails} />}
          </td>
        </tr>
      )}
    </>
  );
}
