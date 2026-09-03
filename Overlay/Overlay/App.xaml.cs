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
        public static WebSocketService _webSocket { get; private set; } = new WebSocketService();

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
