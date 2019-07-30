using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Templates.Core.Domain;

namespace Templates.Core.Repositories
{
    public interface ITemplateRepository
    {
        Task AddAsync(Template template);
        Task UpdateAsync(Template template);
        Task<IEnumerable<Template>> GetAsync();
        Task<Template> GetAsync(Guid id);
        Task DeleteAsync(Guid id);
    }
}