/* eslint-disable prettier/prettier */
import { Casters } from '@common/caster.type';
import { Colours } from '@common/colours.type';
import { Match } from '@common/match.type';
import { ServerStatus } from '@common/servers.type';
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('stateAPI', {
  getState: () => ipcRenderer.invoke('get-state'),
  
  setMatch: (matchState: Match ) => ipcRenderer.invoke('set-match', matchState),
  setColour: (colourState: Colours ) => ipcRenderer.invoke('set-colour', colourState),
  setCaster: (casterState: Casters ) => ipcRenderer.invoke('set-caster', casterState),

  resetMatch: () => ipcRenderer.invoke('reset-match'),
  resetCasters: () => ipcRenderer.invoke('reset-casters'),
  resetColours: () => ipcRenderer.invoke('reset-colours'),

  syncServerStatus: (cb: (s: ServerStatus) => void): (() => void) => {
    const listener = (_e: Electron.IpcRendererEvent, s: ServerStatus): void => cb(s)
    ipcRenderer.on('server', listener)
    ipcRenderer.invoke('get-server-status').then(cb)
    return () => ipcRenderer.removeListener('server', listener)
  }
})

contextBridge.exposeInMainWorld('utils', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
});
