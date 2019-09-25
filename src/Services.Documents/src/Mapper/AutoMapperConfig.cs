using AutoMapper;
using Domain;
using DTO;
using DTO.Documents;
using Newtonsoft.Json.Linq;

namespace Mapper
{
    public static class AutoMapperConfig
    {
        public static IMapper Initialize()
        {
            return new MapperConfiguration(config => 
            {
                config.CreateMap<Document, Models.Document>().ReverseMap();
                config.CreateMap<Document, Models.DocumentVersion>().ReverseMap();

                config.CreateMap<Document, DocumentDetailsDto>()
                    .ForMember(x => x.Content, opts => opts.MapFrom(src => JObject.Parse(src.Content)));
            })
            .CreateMapper();
        } 
    }
}