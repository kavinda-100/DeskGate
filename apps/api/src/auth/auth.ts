import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { prisma } from '@deskgate/database';
import { env } from '../env';

export const auth = betterAuth({
  appName: 'DeskGate',

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  trustedOrigins: [env.WEB_URL ?? 'http://localhost:3000'],

  emailAndPassword: {
    enabled: true,
  },

});
