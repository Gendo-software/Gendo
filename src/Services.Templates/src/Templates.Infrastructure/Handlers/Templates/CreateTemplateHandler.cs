using System;
using System.Threading.Tasks;
using Templates.Infrastructure.Messages;
using Templates.Infrastructure.Messages.Events;
using Templates.Infrastructure.Messages.Templates;
using Templates.Infrastructure.RabbitMq;
using Templates.Infrastructure.Services.Interfaces;

namespace Templates.Infrastructure.Handlers.Users
{
    public class CreateTemplateHandler : ICommandHandler<CreateTemplate>
    {
        private readonly IBusPublisher _busPublisher;
        private readonly ITemplateService _templateService;

        public CreateTemplateHandler(IBusPublisher busPublisher, ITemplateService templateService)
        {
            _busPublisher = busPublisher;
            _templateService = templateService;
        }

        public async Task<int> HandleAsync(CreateTemplate command)
        {
            int result = 0;
            if(command.Id == Guid.Empty)
            {
                command.Id = Guid.NewGuid();
                result = 1;
            }
            var newVersion = Guid.NewGuid();
            await _templateService.CreateAsync(command.Id, newVersion, command.UserId, command.Name, command.Content.ToString());
            await _busPublisher.PublishAsync(new TemplateCreated(command.Id, newVersion));
            return result;
        }
    }
}