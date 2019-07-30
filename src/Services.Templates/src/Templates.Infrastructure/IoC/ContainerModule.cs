using Autofac;
using Templates.Core.Repositories;
using Templates.Infrastructure.IoC.Modules;
using Templates.Infrastructure.Mapper;
using Templates.Infrastructure.Repositories;
using Templates.Infrastructure.Services;
using Templates.Infrastructure.Services.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Templates.Infrastructure.IoC
{
    public class ContainerModule : Autofac.Module
    {
        private readonly IConfiguration _configuration;

        public ContainerModule(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterInstance(AutoMapperConfig.Initialize())
                .SingleInstance();

            builder.RegisterModule<MongoModule>();
            builder.RegisterModule<CommandModule>();
            builder.RegisterModule<ServiceModule>();
            builder.RegisterModule(new SettingsModule(_configuration));
        }      
    }
}