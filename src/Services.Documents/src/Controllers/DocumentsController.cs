using System;
using System.Threading.Tasks;
using Commands;
using Commands.Documents;
using Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    [Authorize]    
    [Route("api/[controller]")]
    public class DocumentsController : Controller
    {
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IDocumentService _documentService;
        
        public DocumentsController(ICommandDispatcher commandDispatcher, IDocumentService documentService)
        {
            _commandDispatcher = commandDispatcher;
            _documentService = documentService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateDocument command)
        {
            await _commandDispatcher.DispatchAsync(command);
            
            return Created($"documents/{command.Id}", null);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody]UpdateDocument command)
        {
            command.Id = id;
            
            await _commandDispatcher.DispatchAsync(command);
            
            return Created($"documents/{command.Id}", null);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var documents = await _documentService.GetAsync();
            if(documents == null)
            {
                return NotFound();
            }
            return Json(documents);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var document = await _documentService.GetAsync(id);
            if(document == null)
            {
                return NotFound();
            }
            return Json(document);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _commandDispatcher.DispatchAsync(new DeleteDocument() { Id = id });

            return NoContent();
        }
    }
}
