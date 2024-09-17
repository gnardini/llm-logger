import { MembershipType } from '@type/user';

export interface Organization {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface OrgUser {
  id: string;
  organization_id: string;
  user_id: string;
  email: string;
  membership_type: MembershipType;
  created_at: string;
  updated_at: string;
}
