using System;
using System.Threading.Tasks;
using Templates.Infrastructure.Messages;
using Templates.Infrastructure.Messages.Events;
using Templates.Infrastructure.Messages.Templates;
using Templates.Infrastructure.RabbitMq;
using Templates.Infrastructure.Services.Interfaces;

namespace Templates.Infrastructure.Handlers.Users
{
    public class UpdateTemplateHandler : ICommandHandler<UpdateTemplate>
    {
        private readonly IBusPublisher _busPublisher;
        private readonly ITemplateService _templateService;

        public UpdateTemplateHandler(IBusPublisher busPublisher, ITemplateService templateService)
        {
            _busPublisher = busPublisher;
            _templateService = templateService;
        }

        public async Task<int> HandleAsync(UpdateTemplate command)
        {
            var newVersion = Guid.NewGuid();
            await _templateService.UpdateAsync(command.Id, newVersion, command.UserId, command.Name, command.Content.ToString());
            await _busPublisher.PublishAsync(new TemplateUpdated(command.Id, newVersion));
            return 0;
        }
    }
}