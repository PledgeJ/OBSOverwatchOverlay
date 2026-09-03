using System;
using System.Collections.Generic;
using System.Text;

using Fleck;
using System.Text.Json;
using System.Windows;

namespace Overlay.Connections
{
    public class WebSocketService
    {
        private WebSocketServer _server = new WebSocketServer("ws://127.0.0.1:4590");
        private List<IWebSocketConnection> _sockets = new List<IWebSocketConnection>();

        public event EventHandler<IWebSocketConnection>? OnSocketConnected;

        public void Start()
        {
            _server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    _sockets.Add(socket);
                    OnSocketConnected?.Invoke(this, socket);
                };      

                socket.OnClose = () => _sockets.Remove(socket);
            });
        }
        public void SendTo(IWebSocketConnection socket, string target, string value)
        {
            var payload = JsonSerializer.Serialize(new { target, value });
            socket.Send(payload);
        }

        public void Update(string target, string value)
        {
            var payload = JsonSerializer.Serialize(new { target, value });
            foreach (var socket in _sockets)
                socket.Send(payload);   
        }
    }
}
