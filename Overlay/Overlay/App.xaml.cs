using Overlay.Connections;
using Overlay.Services;
using System.Configuration;
using System.Data;
using System.Windows;

namespace Overlay
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public static WebSocketConnection _webSocket { get; private set; } = new WebSocketConnection();

        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            _webSocket.Start();
            OverlayServer.Start();
        }

        protected override void OnExit(ExitEventArgs e)
        {
            OverlayServer.Stop();

            base.OnExit(e);
        }
    }

}
