import { getLogsSchema } from '@backend/schemas/log';
import { useQuery } from '@frontend/queries/useQuery';

export const useGetLogsQuery = () => {
  return useQuery('GET', '/api/logs', getLogsSchema);
};
