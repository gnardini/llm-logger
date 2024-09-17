import { useQuery } from '@frontend/queries/useQuery';
import { updateApiKeySchema } from '@backend/schemas/apiKey';

export const useUpdateApiKeyQuery = () => {
  return useQuery('PUT', '/api/apiKeys/update', updateApiKeySchema);
};