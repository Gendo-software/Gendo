using AutoMapper;
using Docaut.Core.Domain;
using Docaut.Infrastructure.DTO;
using Docaut.Infrastructure.DTO.Templates;
using Newtonsoft.Json.Linq;

namespace Docaut.Infrastructure.Mapper
{
    public static class AutoMapperConfig
    {
        public static IMapper Initialize()
        {
            return new MapperConfiguration(config => 
            {
                config.CreateMap<Template, Database.Models.Template>().ReverseMap();
                config.CreateMap<Template, Database.Models.TemplateVersion>().ReverseMap();

                config.CreateMap<Template, TemplateDetailsDto>()
                    .ForMember(x => x.Content, opts => opts.MapFrom(src => JObject.Parse(src.Content)));
            })
            .CreateMapper();
        } 
    }
}