using Templates.Api.Metrics;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Templates.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseAppMetrics();
    }
}
