using System;
using System.Threading.Tasks;
using Templates.Infrastructure.Commands;
using Templates.Infrastructure.Commands.Templates;
using Templates.Infrastructure.Services.Interfaces;

namespace Templates.Infrastructure.Handlers.Users
{
    public class UpdateTemplateHandler : ICommandHandler<UpdateTemplate>
    {
        private readonly ITemplateService _templateService;

        public UpdateTemplateHandler(ITemplateService templateService)
        {
            _templateService = templateService;
        }

        public async Task<int> HandleAsync(UpdateTemplate command)
        {
            var newVersion = Guid.NewGuid();
            await _templateService.UpdateAsync(command.Id, newVersion, command.UserId, command.Name, command.Content.ToString());
            return 0;
        }
    }
}