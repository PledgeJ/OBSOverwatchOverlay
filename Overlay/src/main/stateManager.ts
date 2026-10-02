/* eslint-disable prettier/prettier */
import { Match } from '@common/match';
import _Store from 'electron-store'
import { WebSocketServer } from 'ws';
import { startServers, sendPacket } from './server';
import path from 'path';

const Store = typeof _Store === 'function' ? _Store : (_Store as any).default;

const DEFAULT_STATE: Match = {
  team1: {
    name: 'Team1',
    score: 0,
    colour: '#e1e1e1',
    picture: ''
  },
  team2: {
    name: 'Team2',
    score: 0,
    colour: '#e1e1e1',
    picture: ''
  },
  ft: 2,
  title: 'UoN Draft League 2026 Grand Finals',
  matches: []
}

class StateManager {
    private state: Match = DEFAULT_STATE
    private store: Store = new Store();
    private wss: WebSocketServer | null = null;

    public init(): void {
        this.loadState();

        const distPath = path.join(__dirname, '../renderer');
        this.wss = startServers(distPath)

        this.wss.on('connection', () => {
            console.log('[WS] Client connected');
            this.syncState();
        });
    }

    private loadState(): void {
        const stored_match = this.store.get('match', null)
        if (stored_match) { this.state = stored_match as Match }
    }

    public saveState(): void {
        this.store.set('match', this.state)
    }

    public getState(): Match {
        return this.state;
    }

    public syncState(): void {
        if (!this.wss) return;

        sendPacket(this.wss, this.state, "STATE_UPDATE");
    }

    public stop(): void {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
  }
}

export const stateManager = new StateManager();
