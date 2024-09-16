import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { createLogSchema } from '@backend/schemas/log';
import ApiKeyService from '@backend/services/ApiKeyService';
import LogService from '@backend/services/LogService';

export default createApiHandler({
  method: 'POST',
  schema: createLogSchema,
  handler: async (data, { req }) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Missing or invalid Authorization header');
    }
    const apiKey = authHeader.substring(7);
    const organization = await ApiKeyService.getOrganizationByApiKey(apiKey);
    if (!organization) {
      throw new ApiError(401, 'Invalid API key');
    }
    const log = await LogService.createLog({
      ...data,
      organization_id: organization.id,
      stop_reason: data.stop_reason ?? null,
      input: data.input ?? null,
      output: data.output ?? null,
      tags: data.tags ?? [],
      error: data.error ?? null,
      user: data.user ?? null,
    });
    return { log };
  },
});
