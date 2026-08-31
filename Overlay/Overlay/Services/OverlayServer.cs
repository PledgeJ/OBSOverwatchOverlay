using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Text;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.DependencyInjection;

namespace Overlay.Services
{
    public static class OverlayServer
    {
        private static WebApplication? _webApp;

        public static async void Start()
        {
            var builder = WebApplication.CreateBuilder();
            builder.Services.AddSignalR();

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

            // Serve an image file from elsewhere on the system
            _webApp.MapGet("/image", async (HttpContext context, string path) =>
            {
                if (!File.Exists(path))
                {
                    context.Response.StatusCode = 404;
                    return;
                }

                string contentType = path.ToLower() switch
                {
                    var p when p.EndsWith(".png") => "image/png",
                    var p when p.EndsWith(".webp") => "image/webp",
                    var p when p.EndsWith(".jpg") || p.EndsWith(".jpeg") => "image/jpeg",
                    var p when p.EndsWith(".gif") => "image/gif",
                    _ => "application/octet-stream"
                };

                context.Response.ContentType = contentType;
                await context.Response.SendFileAsync(path);
            });

            await _webApp.RunAsync("http://localhost:4589");
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
