using System;
using System.Threading.Tasks;
using Docaut.Infrastructure.Commands;
using Docaut.Infrastructure.Commands.Templates;
using Docaut.Infrastructure.Services.Interfaces;

namespace Docaut.Infrastructure.Handlers.Users
{
    public class DeleteTemplateHandler : ICommandHandler<DeleteTemplate>
    {
        private readonly ITemplateService _templateService;

        public DeleteTemplateHandler(ITemplateService templateService)
        {
            _templateService = templateService;
        }

        public async Task HandleAsync(DeleteTemplate command)
        {
            var template = await _templateService.GetAsync(command.Id);
            if(template == null)
            {
                throw new Exception("Template does not exists.");
            }
            await _templateService.DeleteAsync(command.Id);
        }
    }
}