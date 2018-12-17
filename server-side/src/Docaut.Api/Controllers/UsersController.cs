using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Docaut.Infrastructure.Commands;
using Docaut.Infrastructure.Commands.Users;
using Docaut.Infrastructure.DTO;
using Docaut.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Docaut.Api.Controllers
{
    public class UsersController : ApiControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService, ICommandDispatcher commandDispatcher)
            :base(commandDispatcher)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateUser command)
        {
            await CommandDispatcher.DispatchAsync(command);
            
            return Created($"users/{command.Email}", null);
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> Get(string email)
        {
            try
            {
                var user = await _userService.GetAsync(email);
                if(user == null)
                {
                    return NotFound($"User with email: {email} not found");
                }
                return Json(user);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await CommandDispatcher.DispatchAsync(new DeleteUser() { Id = id });

            return Ok();
        } 
    }
}
