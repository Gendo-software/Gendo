using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Models;

namespace Repositories.Interfaces
{
    public interface ITemplateRepository
    {
        Task AddAsync(Template template);
        Task DeleteAsync(Guid id);
    }
}