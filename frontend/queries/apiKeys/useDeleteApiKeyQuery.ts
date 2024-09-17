import { useQuery } from '@frontend/queries/useQuery';
import { deleteApiKeySchema } from '@backend/schemas/apiKey';

export const useDeleteApiKeyQuery = () => {
  return useQuery('DELETE', '/api/apiKeys/delete', deleteApiKeySchema);
};