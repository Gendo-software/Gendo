using System;

namespace Commands
{
    public class ICommandBased : ICommand
    {
        public Guid Id { get; set; }
        public Guid CurrentVersion { get; set; }
    }
}