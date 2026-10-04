/* eslint-disable prettier/prettier */
import type { Match } from '@common/match.type';
import { State_Type, WS_Type } from '../types/enums';
import type { Colours } from '@common/colours.type';
import type { Casters } from '@common/caster.type';

import _Store from 'electron-store'
import { WebSocketServer } from 'ws';
import { startServers, sendPacket } from './server';
import path from 'path';

import { ipcMain } from 'electron';

import { DEFAULT_CASTER_STATE, DEFAULT_COLOUR_STATE, DEFAULT_MATCH_STATE } from './defaults'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Store = typeof _Store === 'function' ? _Store : (_Store as any).default;

class StateManager {
  private matchState: Match = DEFAULT_MATCH_STATE;
  private colourState: Colours = DEFAULT_COLOUR_STATE;
  private casterState: Casters = DEFAULT_CASTER_STATE;

  private store: typeof Store = new Store();
  private wss: WebSocketServer | null = null;

  public init(): void {
    this.loadState();
    this.registerIPC();

    const distPath = path.join(__dirname, '../renderer');
    this.wss = startServers(distPath)

    this.wss.on('connection', () => {
      console.log('[WS] Client connected');
      this.syncState();
    });
  }

  private registerIPC(): void {
    ipcMain.handle('get-state', () => this.handleGetState());
    
    ipcMain.handle('set-match', (_event, data: Match) => this.handleSet(data, State_Type.MATCH));
    ipcMain.handle('set-colour', (_event, data: Colours) => this.handleSet(data, State_Type.COLOUR));
    ipcMain.handle('set-caster', (_event, data: Casters) => this.handleSet(data, State_Type.CASTER));
  
    ipcMain.handle('reset-match', () => this.resetMatch());
  }

  private async handleGetState(): Promise<{ match: Match; colours: Colours; casters: Casters }> {
    return { 
      match: this.matchState, 
      colours: this.colourState, 
      casters: this.casterState 
    };
  }

  private async handleSet(data: Match | Colours | Casters, type: State_Type.MATCH | State_Type.COLOUR | State_Type.CASTER): Promise<void> {
    let storeType: string = '';
    
    try {
      switch (type) {
        case State_Type.MATCH:
          this.matchState = data as Match;
          storeType = 'match';
          break;

        case State_Type.COLOUR:
          this.colourState = data as Colours;
          storeType = 'colours'
          break;

        case State_Type.CASTER:
          this.casterState = data as Casters;
          storeType = 'casters'
          break;
      }

      this.store.set(storeType, data);
      this.syncState();
      return;
    } catch (e) {
      console.error(`[Main] - Error setting, saving, or syncing: ${storeType} | `, e)
      return;
    }
  }

  private resetMatch(): void {
    this.matchState = DEFAULT_MATCH_STATE;
    this.store.delete('match');
    console.error('[Main] - Reset match')

    this.syncState();
  }

  private loadState(): void {
    const stored_match = this.store.get('match', null);
    const stored_casters = this.store.get('casters', null);
    const stored_colours = this.store.get('colours', null);

    if (stored_match) { this.matchState = stored_match as Match }
    if (stored_casters) { this.casterState = stored_casters as Casters }
    if (stored_colours) { this.colourState = stored_colours as Colours }
  }

  public getState(): { match: Match, colours: Colours, casters: Casters }  {
    return { match: this.matchState, colours: this.colourState, casters: this.casterState };
  }

  public syncState(): void {
    if (!this.wss) return;

    sendPacket(this.wss, this.matchState, WS_Type.STATE_UPDATE);
    sendPacket(this.wss, this.colourState, WS_Type.COLOUR_UPDATE);
    sendPacket(this.wss, this.casterState, WS_Type.CASTER_UPDATE);
  }

  public stop(): void {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
  }
}

export const stateManager = new StateManager();
