using System;

namespace Docaut.Infrastructure.Commands.Users
{
    public class DeleteUser : ICommand
    {
        public Guid Id { get; set; }
    }
}