using System;
using System.Threading.Tasks;
using Templates.Infrastructure.Commands;
using Templates.Infrastructure.Commands.Templates;
using Templates.Infrastructure.Services.Exceptions;
using Templates.Infrastructure.Services.Interfaces;

namespace Templates.Infrastructure.Handlers.Users
{
    public class DeleteTemplateHandler : ICommandHandler<DeleteTemplate>
    {
        private readonly ITemplateService _templateService;

        public DeleteTemplateHandler(ITemplateService templateService)
        {
            _templateService = templateService;
        }

        public async Task<int> HandleAsync(DeleteTemplate command)
        {
            await _templateService.DeleteAsync(command.Id);
            return 0;
        }
    }
}