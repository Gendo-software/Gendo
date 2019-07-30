using AutoMapper;
using Templates.Core.Domain;
using Templates.Infrastructure.DTO;
using Templates.Infrastructure.DTO.Templates;
using Newtonsoft.Json.Linq;

namespace Templates.Infrastructure.Mapper
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