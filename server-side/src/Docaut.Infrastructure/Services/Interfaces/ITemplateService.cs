using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Docaut.Infrastructure.DTO;
using Docaut.Infrastructure.DTO.Templates;
using Newtonsoft.Json.Linq;

namespace Docaut.Infrastructure.Services.Interfaces
{
    public interface ITemplateService
    {
        Task CreateAsync(Guid id, Guid currentVersion, Guid userId, string name, string content);
        Task UpdateAsync(Guid id, Guid currentVersion, Guid userId, string name, string content);
        Task<IEnumerable<TemplateDto>> GetAsync();
        Task<TemplateDetailsDto> GetAsync(Guid id);
        Task DeleteAsync(Guid id);
    }
}