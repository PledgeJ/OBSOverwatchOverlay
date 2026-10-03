/* eslint-disable prettier/prettier */
import { Match } from '@common/match.type';

/* eslint-disable prettier/prettier */
export interface IElectronAPI {
  getState: () => Promise<Record<string, Match>>;
  updateState: (newState: Record<string, Match>) => Promise<{success: boolean}>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
