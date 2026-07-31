import { z } from 'zod';

export const DatabaseEnvSchema = z.object({
  DATABASE_URL: z.url({ error: 'DATABASE_URL must be a valid URL' }),
});

export const ApiEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(5000),
});
