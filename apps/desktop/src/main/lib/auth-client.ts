import { createAuthClient } from 'better-auth/client';
import type { BetterAuthClientPlugin } from 'better-auth/client';
import { electronClient } from '@better-auth/electron/client';
import { storage } from '@better-auth/electron/storage';
import { ELECTRON_CLIENT_ID, ELECTRON_SCHEME } from '@deskgate/config';

const DESKGATE_WEB_URL = process.env.DESKGATE_WEB_URL ?? 'http://localhost:3000';

const electronPlugin = electronClient({
  clientID: ELECTRON_CLIENT_ID,
  signInURL: `${DESKGATE_WEB_URL}/sign-in`,
  protocol: {
    scheme: ELECTRON_SCHEME,
  },
  callbackPath: '/auth/callback',
  storage: storage(),
  sanitizeUser(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
});

export const authClient = createAuthClient({
  baseURL: DESKGATE_WEB_URL,
  // @better-auth/electron's published getActions type is incompatible with
  // BetterAuthClientPlugin, although the plugin conforms at runtime.
  plugins: [electronPlugin as typeof electronPlugin & BetterAuthClientPlugin],
});
