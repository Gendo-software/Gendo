using System;
using System.Threading.Tasks;
using Messages;
using Messages.Commands;
using Repositories.Interfaces;
using Services.Exceptions;
using Services.Interfaces;

namespace Handlers.Documents
{
    public class CreateDocumentHandler : ICommandHandler<CreateDocument>
    {
        private readonly ITemplateRepository _templateRepository;
        private readonly IDocumentService _documentService;

        public CreateDocumentHandler(ITemplateRepository templateRepository, IDocumentService documentService)
        {
            _templateRepository = templateRepository;
            _documentService = documentService;
        }

        public async Task<int> HandleAsync(CreateDocument command)
        {
            int result = 0;
            var template = await _templateRepository.GetAsync(command.TemplateId);
            if(template == null)
            {
                throw new ServiceException(ErrorCodes.TemplateNotFound, 
                    $"Template with id: '{command.TemplateId}' was not found.");
            }
            if(template.CurrentVersionId != command.TemplateVersionId)
            {
                throw new ServiceException(ErrorCodes.TemplateOutOfDate, 
                    $"Template version: '{command.TemplateVersionId}' is out of date.");
            }
            if(command.Id == Guid.Empty)
            {
                command.Id = Guid.NewGuid();
                result = 1;
            }
            var newVersion = Guid.NewGuid();
            await _documentService.CreateAsync(command.Id, command.TemplateId, command.TemplateVersionId, newVersion, command.Name, command.UserId, command.Content.ToString());
            return result;
        }
    }
}