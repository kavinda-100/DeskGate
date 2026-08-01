import { z } from 'zod';

export const DatabaseEnvSchema = z.object({
  DATABASE_URL: z.url({ error: 'DATABASE_URL must be a valid URL' }),
});

export const ApiEnvSchema = z
  .object({
    PORT: z.coerce.number().int().positive().default(5000),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).optional(),
    WEB_URL: z.url({ error: 'WEB_URL must be a valid URL' }).default('http://localhost:3000'),
    STRIPE_SECRET_KEY: z.string({ error: 'STRIPE_SECRET_KEY is required' }),
    STRIPE_WEBHOOK_SECRET: z.string({ error: 'STRIPE_WEBHOOK_SECRET is required' }),
  })
  .transform(({ NODE_ENV, LOG_LEVEL, ...env }) => ({
    ...env,
    NODE_ENV,
    LOG_LEVEL: LOG_LEVEL ?? (NODE_ENV === 'development' ? 'debug' : 'info'),
  }));
