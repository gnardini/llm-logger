import { db, getDb } from '@backend/db/db';
import { toISOString } from '@backend/services/dbHelpers';
import { ApiKey } from '@type/apiKey';
import { Organization } from '@type/organization';
import crypto from 'crypto';
import OrganizationsService from './OrganizationsService';

const transformApiKey = (apiKey: any): ApiKey => ({
  id: apiKey.id,
  organization_id: apiKey.organization_id,
  name: apiKey.name,
  key: apiKey.key,
  last_used_at: apiKey.last_used_at ? toISOString(apiKey.last_used_at) : null,
  created_at: toISOString(apiKey.created_at),
  updated_at: toISOString(apiKey.updated_at),
});

const generateApiKey = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

const ApiKeyService = {
  createApiKey: async (organizationId: string, name: string | null): Promise<ApiKey> => {
    const [apiKey] = await db('api_keys')
      .insert({
        organization_id: organizationId,
        name,
        key: generateApiKey(),
      })
      .returning('*');

    return transformApiKey(apiKey);
  },

  getOrganizationByApiKey: async (apiKey: string): Promise<Organization | null> => {
    const key = await db('api_keys').where('key', apiKey).first();

    if (!key) {
      return null;
    }

    db('api_keys').where('id', key.id).update({ last_used_at: getDb().fn.now() });

    return OrganizationsService.getOrganizationById(key.organization_id);
  },

  getApiKeysForOrganization: async (organizationId: string): Promise<ApiKey[]> => {
    const apiKeys = await db('api_keys').where('organization_id', organizationId).select('*');
    return apiKeys.map(transformApiKey);
  },

  updateApiKey: async (
    apiKeyId: string,
    organizationId: string,
    name: string,
  ): Promise<ApiKey | null> => {
    try {
      const [updatedApiKey] = await db('api_keys')
        .where({
          id: apiKeyId,
          organization_id: organizationId,
        })
        .update({
          name,
          updated_at: getDb().fn.now(),
        })
        .returning('*');

      return updatedApiKey ? transformApiKey(updatedApiKey) : null;
    } catch (error) {
      console.error('Error updating API key:', error);
      return null;
    }
  },

  deleteApiKey: async (apiKeyId: string, organizationId: string): Promise<boolean> => {
    try {
      const deletedCount = await db('api_keys')
        .where({
          id: apiKeyId,
          organization_id: organizationId,
        })
        .del();

      return deletedCount > 0;
    } catch (error) {
      console.error('Error deleting API key:', error);
      return false;
    }
  },
};

export default ApiKeyService;
