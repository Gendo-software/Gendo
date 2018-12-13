using Autofac;
using Docaut.Core.Repositories;
using Docaut.Infrastructure.IoC.Modules;
using Docaut.Infrastructure.Mapper;
using Docaut.Infrastructure.Repositories;
using Docaut.Infrastructure.Services;
using Docaut.Infrastructure.Services.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Docaut.Infrastructure.IoC
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

            builder.RegisterModule<ServiceModule>();
            builder.RegisterModule<RepositoryModule>();
        }      
    }
}