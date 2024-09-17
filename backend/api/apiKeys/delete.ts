import { createApiHandler, ApiError } from '@backend/core/apiHandler';
import ApiKeyService from '@backend/services/ApiKeyService';
import { deleteApiKeySchema } from '@backend/schemas/apiKey';
import OrganizationsService from '@backend/services/OrganizationsService';

export default createApiHandler({
  method: 'DELETE',
  schema: deleteApiKeySchema,
  requiresAuth: true,
  handler: async (data, { user }) => {
    if (!(await OrganizationsService.userOwnsOrganization(user.id, data.organization_id))) {
      throw new ApiError(403, 'User does not belong to the organization');
    }

    const success = await ApiKeyService.deleteApiKey(data.api_key_id, data.organization_id);

    if (!success) {
      throw new ApiError(404, 'API key not found or you do not have permission to delete it');
    }

    return { success: true };
  },
});
