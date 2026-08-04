import { contextBridge } from 'electron';

const deskgate = {};

contextBridge.exposeInMainWorld('deskgate', deskgate);
