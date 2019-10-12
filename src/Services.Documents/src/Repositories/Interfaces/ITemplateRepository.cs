using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Models;

namespace Repositories.Interfaces
{
    public interface ITemplateRepository
    {
        Task<Template> GetAsync(Guid id);
        Task AddAsync(Template template);
        Task UpdateAsync(Template template);
        Task DeleteAsync(Guid id);
    }
}