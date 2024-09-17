// https://vike.dev/data
import { authenticateUser } from '@backend/core/auth';
import LogService from '@backend/services/LogService';
import OrganizationsService from '@backend/services/OrganizationsService';
import TagsService from '@backend/services/TagsService';
import { UsersService } from '@backend/services/UsersService';
import { PaginatedLogs } from '@type/log';
import { Organization } from '@type/organization';
import { MembershipType, User } from '@type/user';
import { redirect } from 'vike/abort';
import type { PageContextServer } from 'vike/types';

export type LogData = {
  user: User;
  organizations: Organization[];
  activeOrg: Organization;
  membershipType: MembershipType;
  logs: PaginatedLogs;
  tags: string[];
};

export default async function data(context: PageContextServer): Promise<LogData> {
  const user = await authenticateUser(context.headers?.cookie ?? '', (key, value) => {
    // console.log('Would like to set header ', key);
  });
  const orgId = context.urlParsed.search.org_id;
  const org = await OrganizationsService.getOrganizationById(orgId);

  if (!user) {
    if (org && org.is_public) {
      const [logs, tags] = await Promise.all([
        LogService.getLogs(org.id, {}, 1),
        TagsService.getOrganizationTags(org.id),
      ]);
      return {
        user: {
          id: 'guest',
          email: 'guest',
          last_access: null,
          active_org: null,
          created_at: '',
          updated_at: '',
        },
        organizations: [org],
        activeOrg: org,
        membershipType: 'guest',
        logs,
        tags,
      };
    } else {
      throw redirect('/');
    }
  }

  const { organizations, activeOrg, membershipType } = await UsersService.getOrganizationsAndActive(
    user,
    orgId,
  );
  if (organizations.length === 0) {
    throw redirect('/settings');
  }

  const [logs, tags] = await Promise.all([
    LogService.getLogs(activeOrg.id, {}, 1),
    TagsService.getOrganizationTags(activeOrg.id),
  ]);

  return { user, organizations, activeOrg, membershipType, logs, tags };
}
