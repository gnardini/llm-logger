import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { updateApiKeySchema } from '@backend/schemas/apiKey';
import ApiKeyService from '@backend/services/ApiKeyService';
import OrganizationsService from '@backend/services/OrganizationsService';

export default createApiHandler({
  method: 'PUT',
  schema: updateApiKeySchema,
  requiresAuth: true,
  handler: async (data, { user }) => {
    if (!(await OrganizationsService.userOwnsOrganization(user.id, data.organization_id))) {
      throw new ApiError(403, 'User does not belong to the organization');
    }

    const updatedApiKey = await ApiKeyService.updateApiKey(
      data.api_key_id,
      data.organization_id,
      data.name,
    );

    if (!updatedApiKey) {
      throw new ApiError(404, 'API key not found or you do not have permission to update it');
    }

    return updatedApiKey;
  },
});
