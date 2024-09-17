import { z } from 'zod';

export const createApiKeySchema = {
  input: z.object({
    organization_id: z.string(),
    name: z.string().nullable(),
  }),
  output: z.object({
    id: z.string(),
    organization_id: z.string(),
    name: z.string().nullable(),
    key: z.string(),
    last_used_at: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
};

export const updateApiKeySchema = {
  input: z.object({
    api_key_id: z.string(),
    organization_id: z.string(),
    name: z.string(),
  }),
  output: z.object({
    id: z.string(),
    organization_id: z.string(),
    name: z.string().nullable(),
    key: z.string(),
    last_used_at: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
};

export const deleteApiKeySchema = {
  input: z.object({
    api_key_id: z.string(),
    organization_id: z.string(),
  }),
  output: z.object({
    success: z.boolean(),
  }),
};