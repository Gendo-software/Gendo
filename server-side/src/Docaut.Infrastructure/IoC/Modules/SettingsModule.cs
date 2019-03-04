using Autofac;
using Microsoft.Extensions.Configuration;
using Docaut.Infrastructure.Extensions;
using Docaut.Infrastructure.Mongo;

namespace Docaut.Infrastructure.IoC.Modules
{
    public class SettingsModule : Autofac.Module
    {
        private readonly IConfiguration _configuration;

        public SettingsModule(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {
			builder.RegisterInstance(_configuration.GetSettings<MongoSettings>())
	               .SingleInstance();
		}  
    }
}