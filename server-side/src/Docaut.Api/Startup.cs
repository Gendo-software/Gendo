﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Docaut.Api.Framework;
using Docaut.Core.Repositories;
using Docaut.Database.Models;
using Docaut.Infrastructure.IoC;
using Docaut.Infrastructure.Mongo;
using Docaut.Infrastructure.Repositories;
using Docaut.Infrastructure.Services;
using Docaut.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

namespace Docaut.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IContainer ApplicationContainer { get; private set; }

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
            services.AddMvc();
            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "gendo", Version = "v1"});
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
            app.UseExceptionHandlerMiddleware();
            app.UseMvc();       
                 
            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("v1/swagger.json", "gendo API v1");
            });
        }
    }
}
