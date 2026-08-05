import { createAuthClient } from 'better-auth/react';
import { stripeClient } from '@better-auth/stripe/client';
import { electronProxyClient } from '@better-auth/electron/proxy';

import { ELECTRON_SCHEME, ELECTRON_CLIENT_ID } from '@deskgate/config';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000',

  plugins: [
    stripeClient({
      subscription: true,
    }),
    electronProxyClient({
      clientID: ELECTRON_CLIENT_ID,
      protocol: {
        scheme: ELECTRON_SCHEME,
      },
      callbackPath: '/auth/callback',
    }),
  ],
});
