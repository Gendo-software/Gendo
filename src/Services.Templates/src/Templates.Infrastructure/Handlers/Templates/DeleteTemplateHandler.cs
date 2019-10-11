using System.Threading.Tasks;
using Templates.Infrastructure.Messages;
using Templates.Infrastructure.Messages.Events;
using Templates.Infrastructure.Messages.Templates;
using Templates.Infrastructure.RabbitMq;
using Templates.Infrastructure.Services.Interfaces;

namespace Templates.Infrastructure.Handlers.Users
{
    public class DeleteTemplateHandler : ICommandHandler<DeleteTemplate>
    {
        private readonly IBusPublisher _busPublisher;
        private readonly ITemplateService _templateService;

        public DeleteTemplateHandler(IBusPublisher busPublisher, ITemplateService templateService)
        {
            _busPublisher = busPublisher;
            _templateService = templateService;
        }

        public async Task<int> HandleAsync(DeleteTemplate command)
        {
            await _templateService.DeleteAsync(command.Id);
            await _busPublisher.PublishAsync(new TemplateDeleted(command.Id));
            return 0;
        }
    }
}