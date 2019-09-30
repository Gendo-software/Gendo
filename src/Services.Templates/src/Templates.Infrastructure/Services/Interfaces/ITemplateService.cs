using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Templates.Infrastructure.DTO;
using Templates.Infrastructure.DTO.Templates;
using Newtonsoft.Json.Linq;

namespace Templates.Infrastructure.Services.Interfaces
{
    public interface ITemplateService
    {
        Task<int> CreateAsync(Guid id, Guid currentVersionId, string userId, string name, string content);
        Task<int> UpdateAsync(Guid id, Guid currentVersionId, string userId, string name, string content);
        Task<IEnumerable<TemplateDto>> GetAsync();
        Task<TemplateDetailsDto> GetAsync(Guid id);
        Task<int> DeleteAsync(Guid id);
    }
}