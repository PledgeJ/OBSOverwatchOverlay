/* eslint-disable prettier/prettier */
import OBSWebSocket from 'obs-websocket-js';
type StatusListener = (connected: boolean) => void;

class OBSConn {
  private obs = new OBSWebSocket();
  private connecting: Promise<boolean> | null = null;
  private connected = false;

  public errorMsg: string = ''

  private listeners = new Set<StatusListener>();

  public constructor() {
    this.obs.on('ConnectionClosed', () => { 
      this.setConnected(false);
    });
  }

  public onStatus(cb: StatusListener): () => void {
    this.listeners.add(cb);
    cb(this.connected);
    return () => { this.listeners.delete(cb); };
  }

  private setConnected(value: boolean): void {
    if (this.connected === value) return; // avoid full re-render

    this.connected = value;
    this.listeners.forEach((cb) => cb(value));
  }

  public async connect(password: string): Promise<void> {
    if (this.connected) return;
    if (this.connecting) return;

    try {
      await this.obs.connect('ws://127.0.0.1:4455', password);
      this.setConnected(true);
    } catch (e) {
      console.error(e);
      this.setConnected(false);
    }

    return
  }

  public async disconnect(): Promise<void> {
    await this.obs.disconnect().catch(() => {});
    this.setConnected(false);
  }
}

export const obsConn = new OBSConn();

// Open OBS and go to Tools → WebSocket Server Settings.
// Tick Enable WebSocket server if it isn’t already.
// Make sure Server Port is 4455 (the default).
// Tick Enable Authentication.
// Set a Server Password, or click Generate Password to have OBS create one.
// Click Show Connect Info if you want to see the port and password together.
// Click Apply, then OK.