import { useQuery } from '@frontend/queries/useQuery';
import { createApiKeySchema } from '@backend/schemas/apiKey';

export function useCreateApiKeyQuery() {
  return useQuery<
    typeof createApiKeySchema.input.shape,
    typeof createApiKeySchema.output.shape
  >('POST', '/api/apiKeys/create', createApiKeySchema);
}