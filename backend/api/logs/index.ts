import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { getLogsSchema } from '@backend/schemas/log';
import LogService from '@backend/services/LogService';
import OrganizationsService from '@backend/services/OrganizationsService';

export default createApiHandler({
  method: 'GET',
  schema: getLogsSchema,
  requiresAuth: true,
  handler: async (data, { user }) => {
    const { organization_id, tags: tagsString, user: filterUser, page } = data;
    const tags = tagsString?.split(',').filter((t) => t.length > 0) ?? [];

    const hasAccess = await OrganizationsService.userOwnsOrganization(user.id, organization_id);
    if (!hasAccess) {
      throw new ApiError(403, 'User does not have access to this organization');
    }

    const paginatedLogs = await LogService.getLogs(
      organization_id,
      { tags, user: filterUser },
      page,
    );

    return paginatedLogs;
  },
});
