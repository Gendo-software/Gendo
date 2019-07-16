using System;
using System.Threading.Tasks;
using Templates.Infrastructure.Commands;
using Templates.Infrastructure.Commands.Templates;
using Templates.Infrastructure.Services.Interfaces;

namespace Templates.Infrastructure.Handlers.Users
{
    public class CreateTemplateHandler : ICommandHandler<CreateTemplate>
    {
        private readonly ITemplateService _templateService;

        public CreateTemplateHandler(ITemplateService templateService)
        {
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
            return result;
        }
    }
}