using System;

namespace Docaut.Infrastructure.Commands
{
    public class ICommandBased : ICommand
    {
        public Guid Id { get; set; }
        public Guid CurrentVersion { get; set; }
    }
}