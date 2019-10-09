using System;
using System.Threading.Tasks;
using Commands;
using Commands.Documents;
using Services.Interfaces;

namespace Handlers.Documents
{
    public class UpdateDocumentHandler : ICommandHandler<UpdateDocument>
    {
        private readonly IDocumentService _documentService;

        public UpdateDocumentHandler(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        public async Task<int> HandleAsync(UpdateDocument command)
        {
            var newVersion = Guid.NewGuid();
            await _documentService.UpdateAsync(command.Id, newVersion, command.TemplateVersionId, command.Name, command.UserId, command.Content.ToString());
            return 0;
        }
    }
}