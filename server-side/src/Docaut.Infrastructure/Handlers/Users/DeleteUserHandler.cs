using System;
using System.Threading.Tasks;
using Docaut.Infrastructure.Commands;
using Docaut.Infrastructure.Commands.Users;
using Docaut.Infrastructure.Services.Interfaces;

namespace Docaut.Infrastructure.Handlers.Users
{
    public class DeleteUserHandler : ICommandHandler<DeleteUser>
    {
        private readonly IUserService _userService;

        public DeleteUserHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task HandleAsync(DeleteUser command)
        {
            var _user = _userService.GetAsync(command.Id);
            if(_user == null)
            {
                throw new Exception($"User with id {command.Id} does not exist");
            }
            await _userService.DeleteAsync(command.Id);
        }
    }
}