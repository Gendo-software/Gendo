using System;
using System.Threading.Tasks;
using Messages;
using Messages.Commands;
using Services.Interfaces;

namespace Handlers.Documents
{
    public class CreateDocumentHandler : ICommandHandler<CreateDocument>
    {
        private readonly IDocumentService _documentService;

        public CreateDocumentHandler(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        public async Task<int> HandleAsync(CreateDocument command)
        {
            int result = 0;
            //if(command.TemplateVersionId) //check if exists
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