using System;

namespace Templates.Infrastructure.Messages.Events
{
    public class TemplateDeleted : IEvent
    {
        public Guid Id { get; set; }

        public TemplateDeleted(Guid id)
        {
            Id = id;
        }
    }
}