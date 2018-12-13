using System;
using System.Threading.Tasks;
using AutoMapper;
using Docaut.Core.Domain;
using Docaut.Core.Repositories;
using Docaut.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Docaut.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository, IRepository
    {
        private Database.Models.DocautContext _context;
        private readonly IMapper _mapper;

        public UserRepository(Database.Models.DocautContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddAsync(User user)
        {
            var _user = _mapper.Map<User, Database.Models.User>(user);
            await _context.User.AddAsync(_user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetAsync(string email)
        {
            var _user = await _context.User.SingleOrDefaultAsync(x => x.UserEmail == email);
            return _mapper.Map<Database.Models.User, User>(_user);
        }

        public async Task<User> GetAsync(Guid id)
        {
            var _user = await _context.User.SingleOrDefaultAsync(x => x.UserId == id);
            return _mapper.Map<Database.Models.User, User>(_user);
        }

        public async Task DeleteAsync(Guid id)
        {
            var _user = await _context.User.SingleOrDefaultAsync(x => x.UserId == id);
            _context.User.Remove(_user);
            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateAsync(User user)
        {
            var _user = _mapper.Map<User, Database.Models.User>(user);
            _context.User.Update(_user);
            await _context.SaveChangesAsync();
        }
    }
}