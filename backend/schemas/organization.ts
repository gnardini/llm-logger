import { z } from 'zod';

export const createOrganizationSchema = {
  input: z.object({
    name: z.string().min(1).max(255),
  }),
  output: z.object({
    organization: z.object({
      id: z.string(),
      name: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    }),
  }),
};
