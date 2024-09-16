import { db, getDb } from '@backend/db/db';

const TABLE_NAME = 'logs';

const TagsService = {
  getOrganizationTags: async (organization_id: string): Promise<string[]> => {
    const result = await db(TABLE_NAME)
      .where({ organization_id })
      .select(getDb().raw('DISTINCT unnest(tags) as tag'))
      .orderBy('tag', 'asc');

    return result.map((row: { tag: string }) => row.tag);
  },
};

export default TagsService;
