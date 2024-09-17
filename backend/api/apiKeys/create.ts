import { createApiHandler } from '@backend/core/apiHandler';
import ApiKeyService from '@backend/services/ApiKeyService';
import { createApiKeySchema } from '@backend/schemas/apiKey';

export default createApiHandler({
  method: 'POST',
  schema: createApiKeySchema,
  requiresAuth: true,
  handler: async (data, { user }) => {
    if (!user.organization_id) {
      throw new Error('User does not belong to an organization');
    }

    const apiKey = await ApiKeyService.createApiKey(user.organization_id, data.name);
    return apiKey;
  },
});