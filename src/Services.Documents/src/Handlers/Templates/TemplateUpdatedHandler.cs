using System.Threading.Tasks;
using Messages;
using Messages.Events;
using Models;
using Repositories.Interfaces;

namespace Handlers.Templates
{
    public class TemplateUpdatedHandler : IEventHandler<TemplateUpdated>
    {
        private readonly ITemplateRepository _templateRepository;
        public TemplateUpdatedHandler(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        public async Task HandleAsync(TemplateUpdated @event)
        {
            var template = new Template(@event.Id, @event.CurrentVersionId);
            await _templateRepository.UpdateAsync(template);
        }
    }
}