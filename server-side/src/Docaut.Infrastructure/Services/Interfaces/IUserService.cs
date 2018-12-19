using System;
using System.Threading.Tasks;
using Docaut.Infrastructure.DTO;

namespace Docaut.Infrastructure.Services.Interfaces
{
    public interface IUserService
    {
        Task CreateAsync(Guid id, string email, string password, string name, string surname);
        Task<UserDto> GetAsync(string email);
        Task<UserDto> GetAsync(Guid id);
    }
}