using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Docaut.Core.Domain;

namespace Docaut.Core.Repositories
{
    public interface IUserRepository
    {
        Task AddAsync(User user);
        Task<User> GetAsync(string email);
        Task<User> GetAsync(Guid email);
        Task DeleteAsync(Guid id);
        Task UpdateAsync(User user);
    }
}