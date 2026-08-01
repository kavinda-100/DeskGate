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
    BETTER_AUTH_URL: z
      .url({ error: 'BETTER_AUTH_URL must be a valid URL' })
      .default('http://localhost:5000'),
    STRIPE_SECRET_KEY: z
      .string({ error: 'STRIPE_SECRET_KEY is required' })
      .min(10, { error: 'STRIPE_SECRET_KEY must be at least 10 characters long' }),
    STRIPE_WEBHOOK_SECRET: z
      .string({ error: 'STRIPE_WEBHOOK_SECRET is required' })
      .min(3, { error: 'STRIPE_WEBHOOK_SECRET must be at least 3 characters long' }),
    FREE_PLAN_PRICE_ID: z
      .string()
      .min(3, { error: 'FREE_PLAN_PRICE_ID must be at least 3 characters long' }),
    PRO_PLAN_PRICE_ID: z
      .string()
      .min(3, { error: 'PRO_PLAN_PRICE_ID must be at least 3 characters long' }),
    TEAM_PLAN_PRICE_ID: z
      .string()
      .min(3, { error: 'TEAM_PLAN_PRICE_ID must be at least 3 characters long' }),
  })
  .transform(({ NODE_ENV, LOG_LEVEL, ...env }) => ({
    ...env,
    NODE_ENV,
    LOG_LEVEL: LOG_LEVEL ?? (NODE_ENV === 'development' ? 'debug' : 'info'),
  }));
