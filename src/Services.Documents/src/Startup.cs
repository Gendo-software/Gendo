using System;
using System.Collections.Generic;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Framework;
using IoC;
using Mongo;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using RabbitMq;
using Messages.Events;

namespace Documents.Api
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
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithOrigins("http://localhost",
                            "http://myapp.example:3000",
                            "http://myapp.example:3100");
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
                c.SwaggerDoc("v1", new Info { Title = "gendo-services-documents", Version = "v1"});
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
            builder.AddRabbitMq();      
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
            app.UseRabbitMq()
                .SubscribeEvent<TemplateCreated>()
                .SubscribeEvent<TemplateDeleted>();
            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("v1/swagger.json", "gendo-services-documents API v1");
            });
        }
    }
}
