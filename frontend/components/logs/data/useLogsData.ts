import { useAuth } from '@frontend/context/AuthContext';
import { useGetLogsQuery } from '@frontend/queries/logs/useGetLogsQuery';
import { Log } from '@type/log';
import { useEffect, useState } from 'react';

interface FilteredLogs {
  logs: Log[];
  lastPage: number;
}

export function useLogsData(initialLogs: Log[]) {
  const [logs, setLogs] = useState<Log[]>(initialLogs);
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);
  const [userFilter, setUserFilter] = useState<string | null>(null);
  const [filteredLogsCache, setFilteredLogsCache] = useState<Record<string, FilteredLogs>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreLogs, setHasMoreLogs] = useState(true);

  const { activeOrg } = useAuth();
  const { execute: fetchLogs, loading, error } = useGetLogsQuery();

  useEffect(() => {
    const cacheKey = `${tagsFilter.join(',')}-${userFilter || ''}`;

    // It's the first render
    if (tagsFilter.length === 0 && !userFilter && !filteredLogsCache[cacheKey]) {
      setFilteredLogsCache((prev) => ({
        ...prev,
        [cacheKey]: { logs: initialLogs, lastPage: 1 },
      }));
      return;
    }
    if (tagsFilter.length === 0 && !userFilter) {
      // Set initial logs in the cache
      setFilteredLogsCache((prev) => ({
        ...prev,
        [cacheKey]: { logs: initialLogs, lastPage: 1 },
      }));
      setLogs(initialLogs);
    } else {
      // Fetch data from the backend
      fetchFilteredLogs(1);
    }
  }, [tagsFilter, userFilter]);

  const fetchFilteredLogs = async (page: number) => {
    const cacheKey = `${tagsFilter.join(',')}-${userFilter || ''}`;
    try {
      const result = await fetchLogs({
        organization_id: activeOrg!.id,
        tags: tagsFilter.join(','),
        user: userFilter,
        page,
      });
      if (page === 1) {
        setLogs(result.logs);
        setFilteredLogsCache((prev) => ({
          ...prev,
          [cacheKey]: { logs: result.logs, lastPage: result.page },
        }));
      } else {
        setLogs((prevLogs) => [...prevLogs, ...result.logs]);
        setFilteredLogsCache((prev) => ({
          ...prev,
          [cacheKey]: {
            logs: [...(prev[cacheKey]?.logs || []), ...result.logs],
            lastPage: result.page,
          },
        }));
      }
      setCurrentPage(result.page);
      setHasMoreLogs(result.logs.length === result.pageSize);
    } catch (error) {
      console.error('Error fetching filtered logs:', error);
    }
  };

  const loadMoreLogs = () => {
    fetchFilteredLogs(currentPage + 1);
  };

  return {
    logs,
    loading,
    error,
    tagsFilter,
    setTagsFilter,
    setUserFilter,
    loadMoreLogs,
    hasMoreLogs,
  };
}
