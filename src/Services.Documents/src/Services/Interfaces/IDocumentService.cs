using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DTO.Documents;

namespace Services.Interfaces
{
    public interface IDocumentService
    {
        Task<int> CreateAsync(Guid id, Guid templateVersionId, Guid currentVersion, string name, string userId, string content);
        Task<int> UpdateAsync(Guid id, Guid currentVersion, string name, string userId, string content);
        Task<IEnumerable<DocumentDto>> GetAsync(string userId);
        Task<DocumentDetailsDto> GetAsync(Guid id);
        Task<int> DeleteAsync(Guid id);
    }
}