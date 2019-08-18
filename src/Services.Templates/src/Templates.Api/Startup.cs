using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Templates.Api.Framework;
using Templates.Core.Repositories;
using Templates.Database.Models;
using Templates.Infrastructure.IoC;
using Templates.Infrastructure.Mongo;
using Templates.Infrastructure.Repositories;
using Templates.Infrastructure.Services;
using Templates.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace Templates.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IContainer ApplicationContainer { get; private set; }
        readonly string AllowOrigins = "_allowOrigins";
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            this.Configuration = builder.Build();
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {            
            services.AddCors(options => 
            {
                options.AddPolicy(AllowOrigins,
                corsBuilder => 
                {
                    corsBuilder
                        .AllowAnyHeader()
                        .WithOrigins("http://localhost",
                            "http://myapp.example:3000");
                });
            });

            services.AddMvc();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = Configuration["jwt:issuer"];
                options.Audience = Configuration["jwt:audience"];
                options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true
                    };
            });

            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new Info { Title = "gendo", Version = "v1"});
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });
                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    { "Bearer", new string[] { } }
                });
            });
            services.AddMvcCore()
                .AddMetricsCore();
            var builder = new ContainerBuilder();
            builder.Populate(services);          
            builder.RegisterModule(new ContainerModule(Configuration));
            this.ApplicationContainer = builder.Build();
            return new AutofacServiceProvider(this.ApplicationContainer);
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory,
            IApplicationLifetime appLifetime)
        {
            MongoConfigurator.Initialize();
            app.UseCors(AllowOrigins);
            app.UseAuthentication();
            app.UseExceptionHandlerMiddleware();
            app.UseMvc();       
            
            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("v1/swagger.json", "gendo API v1");
            });
        }
    }
}
