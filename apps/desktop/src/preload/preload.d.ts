import type { ElectronClientOptions, ExposedBridges } from '@better-auth/electron/preload';

export {};

declare global {
  interface Window extends ExposedBridges<ElectronClientOptions> {
    deskgate: {
      registerDevice: () => Promise<unknown>;
      getBootstrap: () => Promise<unknown>;
      openBillingPortal: () => Promise<unknown>;
    };
  }
}
