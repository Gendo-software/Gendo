using System;

namespace Messages.Events
{
    public class TemplateCreated : IEvent
    {
        public Guid Id { get; set; }
        public Guid CurrentVersionId { get; set; }

        public TemplateCreated(Guid id, Guid currentVersionId)
        {
            Id = id;
            CurrentVersionId = currentVersionId;
        }
    }
}