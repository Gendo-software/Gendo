using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;

namespace Repositories.Interfaces
{
    public interface IDocumentRepository
    {
        Task AddAsync(Document Document);
        Task UpdateAsync(Document Document);
        Task<IEnumerable<Document>> GetAsync(string userId);
        Task<Document> GetAsync(Guid id);
        Task DeleteAsync(Guid id);
    }
}