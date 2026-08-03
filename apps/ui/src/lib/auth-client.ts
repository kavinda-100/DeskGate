import { createAuthClient } from 'better-auth/react';
import { stripeClient } from '@better-auth/stripe/client';
import { tanstackStartCookies } from 'better-auth/tanstack-start/solid';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000',

  plugins: [
    tanstackStartCookies(),
    stripeClient({
      subscription: true,
    }),
  ],
});
