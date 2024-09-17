import { z } from 'zod';

export const createApiKeySchema = {
  input: z.object({
    name: z.string().nullable(),
  }),
  output: z.object({
    id: z.string(),
    organization_id: z.string(),
    name: z.string().nullable(),
    key: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
};