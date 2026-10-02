/* eslint-disable prettier/prettier */
import http from 'http';
import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { is } from '@electron-toolkit/utils';

const HTTP_PORT = 3000;
const WS_PORT = 8080;

export function startServers(distPath: string): { httpServer: http.Server, wss: WebSocketServer} {

  // Serve static pages for overlay
  const app = express();

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // In Dev Mode
    const viteUrl = process.env['ELECTRON_RENDERER_URL'];
    app.use((req, res) => {
      res.redirect(`${viteUrl}${req.originalUrl}`);
    });

  } else {
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
  wss.on('connection', (ws) => {
    console.log('[WS] Client connected');

    ws.on('message', (data) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data.toString());
        }
      });
    });
  });

  console.log(`[WS] WebSocket server running on ws://localhost:${WS_PORT}`);

  return { httpServer, wss }
}
