using System;

namespace Templates.Infrastructure.Messages.Templates
{
    public class DeleteTemplate : ICommand
    {
        public Guid Id { get; set; }
    }
}