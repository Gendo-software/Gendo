using System;
using System.Threading.Tasks;
using Docaut.Infrastructure.Commands;
using Docaut.Infrastructure.Commands.Templates;
using Docaut.Infrastructure.Services.Interfaces;

namespace Docaut.Infrastructure.Handlers.Users
{
    public class UpdateTemplateHandler : ICommandHandler<UpdateTemplate>
    {
        private readonly ITemplateService _templateService;

        public UpdateTemplateHandler(ITemplateService templateService)
        {
            _templateService = templateService;
        }

        public async Task HandleAsync(UpdateTemplate command)
        {
            await _templateService.UpdateAsync(command.Id, Guid.NewGuid(), command.UserId, command.Name, command.Content.ToString());
        }
    }
}