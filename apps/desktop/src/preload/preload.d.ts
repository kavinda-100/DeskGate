import type { authClient } from './lib/auth-client';

export {};

declare global {
  type Bridges = typeof authClient.$Infer.Bridges;
  interface Window extends Bridges {
    deskgate: Record<string, never>;
  }
}
