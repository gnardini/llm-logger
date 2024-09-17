import { createApiHandler } from '@backend/core/apiHandler';
import ApiKeyService from '@backend/services/ApiKeyService';
import { createApiKeySchema } from '@backend/schemas/apiKey';
import OrganizationsService from '@backend/services/OrganizationsService';

export default createApiHandler({
  method: 'POST',
  schema: createApiKeySchema,
  requiresAuth: true,
  handler: async (data, { user }) => {
    if (!(await OrganizationsService.userOwnsOrganization(user.id, data.organization_id))) {
      throw new Error('User does not belong to the organization');
    }

    const apiKey = await ApiKeyService.createApiKey(data.organization_id, data.name);
    return apiKey;
  },
});
