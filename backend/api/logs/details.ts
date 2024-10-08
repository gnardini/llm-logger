import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { getLogDetailsSchema } from '@backend/schemas/log';
import LogService from '@backend/services/LogService';
import OrganizationsService from '@backend/services/OrganizationsService';

export default createApiHandler({
  method: 'GET',
  schema: getLogDetailsSchema,
  requiresAuth: false,
  handler: async (data, { user }) => {
    const logDetails = await LogService.getLogDetails(data.id);
    if (!logDetails) {
      throw new ApiError(404, 'Log not found');
    }

    if (!user) {
      const org = await OrganizationsService.getOrganizationById(logDetails.organization_id);
      if (!org?.is_public) {
        throw new ApiError(403, 'User does not have access to this log');
      }
      return logDetails;
    }

    const hasAccess = await OrganizationsService.userOwnsOrganization(
      user.id,
      logDetails.organization_id,
    );
    if (!hasAccess) {
      throw new ApiError(403, 'User does not have access to this log');
    }

    return logDetails;
  },
});
