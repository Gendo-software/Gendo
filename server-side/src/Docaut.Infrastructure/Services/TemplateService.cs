using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Docaut.Core.Domain;
using Docaut.Core.Repositories;
using Docaut.Infrastructure.DTO.Templates;
using Docaut.Infrastructure.Services.Interfaces;
using Newtonsoft.Json.Linq;

namespace Docaut.Infrastructure.Services
{
    public class TemplateService : ITemplateService, IService
    {
        private readonly ITemplateRepository _templateRepository;
        private readonly IMapper _mapper;

        public TemplateService(ITemplateRepository templateRepository, IMapper mapper)
        {
            _templateRepository = templateRepository;
            _mapper = mapper;
        }

        public async Task CreateAsync(Guid id, Guid currentVersion, Guid userId, string name, string content)
        {
            var template = new Template(id, currentVersion, userId, name, content);
            await _templateRepository.AddAsync(template);
        }

        public async Task UpdateAsync(Guid id, Guid currentVersion, Guid userId, string name, string content)
        {
            var template = new Template(id, currentVersion, userId, name, content);
            await _templateRepository.UpdateAsync(template);
        }

        public async Task<IEnumerable<TemplateDto>> GetAsync()
        {
            var templates = await _templateRepository.GetAsync();
            return _mapper.Map<IEnumerable<Template>,IEnumerable<TemplateDto>>(templates);
        }

        public async Task<TemplateDetailsDto> GetAsync(Guid id)
        {
            var template = await _templateRepository.GetAsync(id);
            return _mapper.Map<Template,TemplateDetailsDto>(template);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _templateRepository.DeleteAsync(id);
        }
    }
}