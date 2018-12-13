using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Docaut.Infrastructure.DTO;
using Docaut.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Docaut.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserDto user)
        {
            try
            {
                await _userService.CreateAsync(user.Id, user.Email, user.Password, user.Name, user.Surname);
                return Created($"users/{user.Id}", null);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> Get(string email)
        {
            try
            {
                var user = await _userService.GetAsync(email);
                if(user == null)
                {
                    NotFound($"User with email: {email} not found");
                }
                return new ObjectResult(user);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] UserDto user)
        {
            try
            {
                var _user = await _userService.GetAsync(id);
                if(_user == null)
                {
                    return NotFound();
                }
                else
                {
                    await _userService.UpdateAsync(user);
                    return Ok();
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var user = await _userService.GetAsync(id);
                if(user == null)
                {
                    return NotFound();
                }
                else
                {
                    await _userService.DeleteAsync(id);
                    return Ok();
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        } 
    }
}
