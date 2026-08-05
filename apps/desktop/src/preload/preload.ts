import { contextBridge, ipcRenderer } from 'electron';
import { setupRenderer } from '@better-auth/electron/preload';

setupRenderer();

const deskgate = {
  registerDevice: () => ipcRenderer.invoke('desktop:register-device'),

  getBootstrap: () => ipcRenderer.invoke('desktop:get-bootstrap'),

  openBillingPortal: () => ipcRenderer.invoke('desktop:open-billing-portal'),
};

contextBridge.exposeInMainWorld('deskgate', deskgate);
