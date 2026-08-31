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
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            OverlayServer.Start();
        }

        protected override void OnExit(ExitEventArgs e)
        {
            OverlayServer.Stop();
            base.OnExit(e);
        }
    }

}
