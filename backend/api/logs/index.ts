import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { getLogsSchema } from '@backend/schemas/log';
import LogService from '@backend/services/LogService';
import OrganizationsService from '@backend/services/OrganizationsService';

export default createApiHandler({
  method: 'GET',
  schema: getLogsSchema,
  requiresAuth: false,
  handler: async (data, { user }) => {
    const { organization_id, tags: tagsString, user: filterUser, page } = data;
    const tags = tagsString?.split(',').filter((t) => t.length > 0) ?? [];

    if (user) {
      const hasAccess = await OrganizationsService.userOwnsOrganization(user.id, organization_id);
      if (!hasAccess) {
        throw new ApiError(403, 'User does not have access to this organization');
      }
    } else {
      const org = await OrganizationsService.getOrganizationById(organization_id);
      if (!org?.is_public) {
        throw new ApiError(403, 'User does not have access to this log');
      }
    }

    const paginatedLogs = await LogService.getLogs(
      organization_id,
      { tags, user: filterUser },
      page,
    );

    return paginatedLogs;
  },
});
