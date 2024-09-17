export interface ApiKey {
  id: string;
  organization_id: string;
  name: string | null;
  key: string;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
}
