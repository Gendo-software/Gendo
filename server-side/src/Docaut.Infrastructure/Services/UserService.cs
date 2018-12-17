using System;
using System.Threading.Tasks;
using AutoMapper;
using Docaut.Core.Domain;
using Docaut.Core.Repositories;
using Docaut.Infrastructure.DTO;
using Docaut.Infrastructure.Services.Interfaces;

namespace Docaut.Infrastructure.Services
{
    public class UserService : IUserService, IService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task CreateAsync(Guid id, string email, string password, string name, string surname)
        {
            var _user = await _userRepository.GetAsync(email);
            if(_user != null)
            {
                throw new Exception($"The user with email '{email}' already exist in database");
            }
            var user = new User(id, email, password, name, surname);
            await _userRepository.AddAsync(user);
        }

        public async Task<UserDto> GetAsync(string email)
        {
            var _user = await _userRepository.GetAsync(email);
            return _mapper.Map<User, UserDto>(_user);
        }

        public async Task<UserDto> GetAsync(Guid id)
        {
            var _user = await _userRepository.GetAsync(id);
            return _mapper.Map<User, UserDto>(_user);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _userRepository.DeleteAsync(id);
        }
    }
}