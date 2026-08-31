using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Text;
using Microsoft.Extensions.FileProviders;

namespace Overlay.Services
{
    public static class OverlayServer
    {
        private static WebApplication? _webApp;

        public static async void Start()
        {
            var builder = WebApplication.CreateBuilder();
            _webApp = builder.Build();

            string wwwrootPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot");

            if (!Directory.Exists(wwwrootPath))
            {
                Directory.CreateDirectory(wwwrootPath);
            }

            _webApp.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(wwwrootPath),
                RequestPath = ""
            });

            await _webApp.RunAsync("http://localhost:5000");
        }

        public static async void Stop()
        {
            if (_webApp != null ) 
            {
                await _webApp.StopAsync();
                await _webApp.DisposeAsync();
            }
        }
    }
}
