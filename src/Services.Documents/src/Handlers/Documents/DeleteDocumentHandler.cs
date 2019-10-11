using System;
using System.Threading.Tasks;
using Messages;
using Messages.Commands;
using Services.Interfaces;

namespace Handlers.Documents
{
    public class DeleteDocumentHandler : ICommandHandler<DeleteDocument>
    {
        private readonly IDocumentService _documentService;

        public DeleteDocumentHandler(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        public async Task<int> HandleAsync(DeleteDocument command)
        {
            await _documentService.DeleteAsync(command.Id);
            return 0;
        }
    }
}