using System;

namespace Messages.Events
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