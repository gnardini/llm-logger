import { useQuery } from '@frontend/queries/useQuery';
import { createApiKeySchema } from '@backend/schemas/apiKey';

export function useCreateApiKeyQuery() {
  return useQuery('POST', '/api/apiKeys/create', createApiKeySchema);
}