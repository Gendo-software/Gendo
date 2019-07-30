using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Templates.Core.Domain;
using Templates.Core.Repositories;
using Templates.Infrastructure.DTO.Templates;
using Templates.Infrastructure.Services.Exceptions;
using Templates.Infrastructure.Services.Interfaces;

namespace Templates.Infrastructure.Services
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

        public async Task<int> CreateAsync(Guid id, Guid currentVersion, Guid userId, string name, string content)
        {
            var template = new Template(id, currentVersion, userId, name, content);
            await _templateRepository.AddAsync(template);
            return 0;
        }

        public async Task<int> UpdateAsync(Guid id, Guid currentVersion, Guid userId, string name, string content)
        {
            var template = await GetOrFailAsync(id);

            var newTemplate = new Template(id, currentVersion, userId, name, content);
            await _templateRepository.UpdateAsync(newTemplate);
            return 0;
        }

        public async Task<IEnumerable<TemplateDto>> GetAsync()
        {
            var templates = await _templateRepository.GetAsync();
            return _mapper.Map<IEnumerable<Template>,IEnumerable<TemplateDto>>(templates);
        }

        public async Task<TemplateDetailsDto> GetAsync(Guid id)
        {
            var template = await GetOrFailAsync(id);
            
            return _mapper.Map<Template,TemplateDetailsDto>(template);
        }

        public async Task DeleteAsync(Guid id)
        {
            var template = await GetOrFailAsync(id);
            await _templateRepository.DeleteAsync(id);
        }

        private async Task<Template> GetOrFailAsync(Guid templateId)
        {
            var template = await _templateRepository.GetAsync(templateId);
            if(template == null)
            {
                throw new ServiceException(ErrorCodes.TemplateNotFound, 
                    $"Template with id: '{templateId}' was not found.");
            }
            return template;            
        }
    }
}