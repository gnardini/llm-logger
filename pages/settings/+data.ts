// https://vike.dev/data
import { authenticateUser } from '@backend/core/auth';
import ApiKeyService from '@backend/services/ApiKeyService';
import { UsersService } from '@backend/services/UsersService';
import { ApiKey } from '@type/apiKey';
import { Organization } from '@type/organization';
import { MembershipType, User } from '@type/user';
import { redirect } from 'vike/abort';
import type { PageContextServer } from 'vike/types';

export type SettingsData = {
  user: User;
  organizations: Organization[];
  activeOrg: Organization;
  apiKeys: ApiKey[];
  membershipType: MembershipType;
};

export default async function data(context: PageContextServer): Promise<SettingsData> {
  const user = await authenticateUser(context.headers?.cookie ?? '', (key, value) => {
    // console.log('Would like to set header ', key);
  });
  if (!user) {
    throw redirect('/');
  }

  const orgId = context.urlParsed.search.org_id;
  const { organizations, activeOrg, membershipType } = await UsersService.getOrganizationsAndActive(
    user,
    orgId,
  );

  const apiKeys = await ApiKeyService.getApiKeysForOrganization(activeOrg.id);

  return { user, organizations, activeOrg, apiKeys, membershipType };
}
