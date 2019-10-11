using System;

namespace Messages
{
    public class ICommandBased : ICommand
    {
        public Guid Id { get; set; }
        public Guid CurrentVersion { get; set; }
    }
}