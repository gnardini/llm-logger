import { db } from '@backend/db/db';
import { parseNumber, toISOString } from '@backend/services/dbHelpers';
import { uuidv7 } from 'uuidv7';
import { CreateLogInput, FullLog, Log, PaginatedLogs } from '../../types/log';

const TABLE_NAME = 'logs';
const PAGE_SIZE = 100;

const transformLog = (entity: any): Log => ({
  id: entity.id,
  organization_id: entity.organization_id,
  model: entity.model,
  stop_reason: entity.stop_reason,
  tags: entity.tags,
  user: entity.user,
  error: entity.error,
  input_tokens: parseNumber(entity.input_tokens),
  output_tokens: parseNumber(entity.output_tokens),
  created_at: toISOString(entity.created_at),
  updated_at: toISOString(entity.updated_at),
});

const transformFullLog = (entity: any): FullLog => ({
  ...transformLog(entity),
  input: entity.input,
  output: entity.output,
});

const LogService = {
  createLog: async (data: CreateLogInput): Promise<Omit<FullLog, 'fine_tunes'>> => {
    const [entity] = await db(TABLE_NAME)
      .insert({
        id: uuidv7(),
        ...data,
      })
      .returning('*');

    return transformFullLog(entity);
  },

  getLogs: async (
    organization_id: string,
    filters: { tags?: string[]; user?: string | null },
    page: number = 1,
  ): Promise<PaginatedLogs> => {
    let query = db(TABLE_NAME)
      .where({ [`${TABLE_NAME}.organization_id`]: organization_id })
      .leftJoin('fine_tune_logs', `${TABLE_NAME}.id`, 'fine_tune_logs.log_id')
      .select(
        `${TABLE_NAME}.id`,
        `${TABLE_NAME}.model`,
        `${TABLE_NAME}.stop_reason`,
        `${TABLE_NAME}.input_tokens`,
        `${TABLE_NAME}.output_tokens`,
        `${TABLE_NAME}.error`,
        `${TABLE_NAME}.organization_id`,
        `${TABLE_NAME}.tags`,
        `${TABLE_NAME}.user`,
        `${TABLE_NAME}.created_at`,
        `${TABLE_NAME}.updated_at`,
      )
      .groupBy(`${TABLE_NAME}.id`);

    if (filters.tags?.length) {
      query = query.whereRaw(`? = ANY(${TABLE_NAME}.tags)`, filters.tags);
    }

    if (filters.user) {
      query = query.where({ [`${TABLE_NAME}.user`]: filters.user });
    }

    const offset = (page - 1) * PAGE_SIZE;
    const results = await query
      .orderBy(`${TABLE_NAME}.created_at`, 'desc')
      .limit(PAGE_SIZE)
      .offset(offset);

    const logs = results.map((e) => ({
      ...transformLog(e),
      fine_tunes: e.fine_tunes,
    }));

    return {
      logs,
      page,
      pageSize: PAGE_SIZE,
    };
  },

  getLogDetails: async (log_id: string): Promise<FullLog | null> => {
    const result = await db(TABLE_NAME)
      .where({ [`${TABLE_NAME}.id`]: log_id })
      .select(`${TABLE_NAME}.*`)
      .groupBy(`${TABLE_NAME}.id`)
      .first();

    if (!result) {
      return null;
    }

    return transformFullLog(result);
  },
};

export default LogService;
