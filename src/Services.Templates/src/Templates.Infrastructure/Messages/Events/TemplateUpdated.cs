using System;

namespace Templates.Infrastructure.Messages.Events
{
    public class TemplateUpdated : IEvent
    {
        public Guid Id { get; set; }
        public Guid CurrentVersionId { get; set; }

        public TemplateUpdated(Guid id, Guid currentVersionId)
        {
            Id = id;
            CurrentVersionId = currentVersionId;
        }
    }
}