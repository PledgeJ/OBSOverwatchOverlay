/* eslint-disable prettier/prettier */
import http from 'http';
import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { is } from '@electron-toolkit/utils';

import type { Match } from '@common/match.type';
import type { WS_Type } from '../types/enums';
import type { Colours } from '@common/colours.type';
import type { Casters } from '@common/caster.type';
import type { ServerStatus } from '@common/servers.type';

const HTTP_PORT = 3000;
const WS_PORT = 8080;

export function startServers(distPath: string, serverStatus: ServerStatus): {http: http.Server, wss: WebSocketServer, serverStatus: ServerStatus} {

  // Serve static pages for overlay
  const app = express();

  // ######################## REMOVE WHEN BUILDING ##########################################
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // In Dev Mode
    const viteUrl = process.env['ELECTRON_RENDERER_URL'];
    app.use((req, res) => {
      res.redirect(`${viteUrl}${req.originalUrl}`);
    });

  } else {
  // ########################################################################################
  
    // In build grab files from out/renderer
    app.use(express.static(distPath));

    // If a request isn't a static file, fallback to index.html
    app.use((_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const httpServer = http.createServer(app);
  httpServer.listen(HTTP_PORT, () => {
    console.log(`[HTTP] Server running on http://localhost:${HTTP_PORT}`);
  })

  // WebSocket server for sending the state
  const wss = new WebSocketServer({ port: WS_PORT });

  console.log(`[WS] WebSocket server running on ws://localhost:${WS_PORT}`);

  serverStatus.http.port = HTTP_PORT;
  serverStatus.ws.port = WS_PORT;

  return { http: httpServer, wss, serverStatus }
}

export function sendPacket(wss: WebSocketServer, state: Match | Colours | Casters, type: WS_Type): void {
  if (!wss) return;

  const payload = JSON.stringify({type: type, data: state})

  wss.clients.forEach((client) => {
    if (client.readyState == WebSocket.OPEN) {
      client.send(payload);
    }
  })
}
