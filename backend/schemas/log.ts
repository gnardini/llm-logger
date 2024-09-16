import { z } from 'zod';

export const createLogSchema = {
  input: z.object({
    model: z.string(),
    input_tokens: z.number(),
    output_tokens: z.number(),
    stop_reason: z.string().nullable().optional(),
    input: z.string().nullable().optional(),
    output: z.string().nullable().optional(),
    tags: z.array(z.string()).optional(),
    error: z.string().nullable().optional(),
    user: z.string().nullable().optional(),
  }),
  output: z.object({
    log: z.object({
      id: z.string(),
      organization_id: z.string(),
      model: z.string(),
      stop_reason: z.string().nullable(),
      tags: z.array(z.string()),
      user: z.string().nullable(),
      error: z.string().nullable(),
      input_tokens: z.number(),
      output_tokens: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      input: z.string().nullable(),
      output: z.string().nullable(),
    }),
  }),
};

export const getLogsSchema = {
  input: z.object({
    organization_id: z.string().uuid(),
    tags: z.string().optional(),
    user: z.string().nullable().optional(),
    page: z.coerce.number().int().positive().optional().default(1),
  }),
  output: z.object({
    logs: z.array(
      z.object({
        id: z.string(),
        organization_id: z.string(),
        model: z.string(),
        stop_reason: z.string().nullable(),
        tags: z.array(z.string()),
        user: z.string().nullable(),
        error: z.string().nullable(),
        input_tokens: z.number(),
        output_tokens: z.number(),
        created_at: z.string(),
        updated_at: z.string(),
      }),
    ),
    page: z.number(),
    pageSize: z.number(),
  }),
};

export const getLogDetailsSchema = {
  input: z.object({
    id: z.string().uuid(),
  }),
  output: z.object({
    id: z.string(),
    organization_id: z.string(),
    model: z.string(),
    stop_reason: z.string().nullable(),
    tags: z.array(z.string()),
    user: z.string().nullable(),
    error: z.string().nullable(),
    input_tokens: z.number(),
    output_tokens: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    input: z.string().nullable(),
    output: z.string().nullable(),
  }),
};
