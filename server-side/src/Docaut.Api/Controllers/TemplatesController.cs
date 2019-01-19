using System;
using System.Threading.Tasks;
using Docaut.Infrastructure.Commands;
using Docaut.Infrastructure.Commands.Templates;
using Docaut.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Docaut.Api.Controllers
{
    public class TemplatesController : ApiControllerBase
    {
        private readonly ITemplateService _templateService;
        
        public TemplatesController(ITemplateService templateService, ICommandDispatcher commandDispatcher)
            :base(commandDispatcher)
        {
            _templateService = templateService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateTemplate command)
        {
            await CommandDispatcher.DispatchAsync(command);
            
            return Created($"templates/{command.Id}", null);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody]UpdateTemplate command)
        {
            command.Id = id;
            
            await CommandDispatcher.DispatchAsync(command);
            
            return Created($"templates/{command.Id}", null);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var templates = await _templateService.GetAsync();
            if(templates == null)
            {
                return NotFound();
            }
            return Json(templates);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var template = await _templateService.GetAsync(id);
            if(template == null)
            {
                return NotFound();
            }
            return Json(template);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await CommandDispatcher.DispatchAsync(new DeleteTemplate() { Id = id });

            return NoContent();
        }
    }
}
