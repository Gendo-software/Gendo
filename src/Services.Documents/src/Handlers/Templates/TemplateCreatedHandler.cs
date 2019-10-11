using System.Threading.Tasks;
using Messages;
using Messages.Events;
using Models;
using Repositories.Interfaces;

namespace Handlers.Templates
{
    public class TemplateCreatedHandler : IEventHandler<TemplateCreated>
    {
        private readonly ITemplateRepository _templateRepository;
        public TemplateCreatedHandler(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        public async Task HandleAsync(TemplateCreated @event)
            => await _templateRepository.AddAsync(new Template() { Id = @event.Id });
    }
}