using System;

namespace Templates.Infrastructure.Messages.Events
{
    public class TemplateCreated : IEvent
    {
        public Guid Id { get; set; }

        public TemplateCreated(Guid id)
        {
            Id = id;
        }
    }
}