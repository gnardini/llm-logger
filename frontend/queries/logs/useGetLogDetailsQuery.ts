import { getLogDetailsSchema } from '@backend/schemas/log';
import { useQuery } from '@frontend/queries/useQuery';

export const useGetLogDetailsQuery = () => {
  return useQuery('GET', '/api/logs/details', getLogDetailsSchema);
};
