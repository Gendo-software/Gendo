using System.Threading.Tasks;
using Messages;
using Messages.Events;
using Repositories.Interfaces;

namespace Handlers.Templates
{
    public class TemplateDeletedHandler : IEventHandler<TemplateDeleted>
    {
        private readonly ITemplateRepository _templateRepository;
        public TemplateDeletedHandler(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        public async Task HandleAsync(TemplateDeleted @event)
            => await _templateRepository.DeleteAsync(@event.Id);
    }
}