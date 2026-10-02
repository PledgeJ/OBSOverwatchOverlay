/* eslint-disable prettier/prettier */
import { Match } from '@common/match';
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getState: () => ipcRenderer.invoke('get-state'),
  updateState: (newState: Record<string, Match>) => ipcRenderer.invoke('update-state', newState)
})
