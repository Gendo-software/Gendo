using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Docaut.Core.Domain;
using Docaut.Core.Repositories;
using Docaut.Infrastructure.DTO.Templates;
using Docaut.Infrastructure.Extensions;
using Docaut.Infrastructure.Services.Exceptions;
using Docaut.Infrastructure.Services.Interfaces;
using Newtonsoft.Json.Linq;

namespace Docaut.Infrastructure.Services
{
    public class TemplateService : ITemplateService, IService
    {
        private readonly ITemplateRepository _templateRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public TemplateService(ITemplateRepository templateRepository, IUserRepository userRepository, IMapper mapper)
        {
            _templateRepository = templateRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task CreateAsync(Guid id, Guid currentVersion, Guid userId, string name, string content)
        {
            //var user = await _userRepository.GetOrFailAsync(userId);
            var template = new Template(id, currentVersion, userId, name, content);
            await _templateRepository.AddAsync(template);
        }

        public async Task UpdateAsync(Guid id, Guid currentVersion, Guid userId, string name, string content)
        {
            //var user = await _userRepository.GetOrFailAsync(userId);
            var template = await _templateRepository.GetOrFailAsync(id);

            var newTemplate = new Template(id, currentVersion, userId, name, content);
            await _templateRepository.UpdateAsync(newTemplate);
        }

        public async Task<IEnumerable<TemplateDto>> GetAsync()
        {
            var templates = await _templateRepository.GetAsync();
            return _mapper.Map<IEnumerable<Template>,IEnumerable<TemplateDto>>(templates);
        }

        public async Task<TemplateDetailsDto> GetAsync(Guid id)
        {
            var template = await _templateRepository.GetOrFailAsync(id);
            
            return _mapper.Map<Template,TemplateDetailsDto>(template);
        }

        public async Task DeleteAsync(Guid id)
        {
            var template = await _templateRepository.GetOrFailAsync(id);
            await _templateRepository.DeleteAsync(id);
        }
    }
}