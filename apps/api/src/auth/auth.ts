import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { stripe } from '@better-auth/stripe';
import Stripe from 'stripe';

import { prisma } from '@deskgate/database';
import { plans } from '@deskgate/config';
import { env } from '../env';

const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-07-29.dahlia',
});

export const auth = betterAuth({
  appName: 'DeskGate',
  baseURL: env.BETTER_AUTH_URL,

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  advanced: {
    database: {
      generateId: 'uuid', // use uuid for database IDs instead of auto-incrementing integers
    },
  },

  trustedOrigins: [env.WEB_URL ?? 'http://localhost:3000'],

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  session: {
    storeSessionInDatabase: true,
    preserveSessionInDatabase: false, // if true, the session will be preserved in the database even after it expires
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds (5 minutes)
    },
  },

  account: {
    storeStateStrategy: 'cookie',
    storeAccountCookie: true, // Store provider account data after OAuth flow in an encrypted cookie
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github'],
    },
  },

  rateLimit: {
    enabled: true,
    storage: 'database',
    modelName: 'rateLimit', // database model name for storing rate limit data
    window: 60, // time window in seconds
    max: 100, // max requests in the window
    customRules: {
      '/sign-in': {
        window: 10,
        max: 3,
      },
      '/sign-up': {
        window: 10,
        max: 3,
      },
      '/get-session': false, // disable rate limiting for this endpoint
    },
  },

  plugins: [
    stripe({
      stripeClient,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: plans,
      },
    }),
  ],
});
