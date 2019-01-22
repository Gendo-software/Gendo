using System;
using System.Threading.Tasks;
using Docaut.Core.Domain;
using Docaut.Core.Repositories;
using Docaut.Infrastructure.Services.Exceptions;

namespace Docaut.Infrastructure.Extensions
{
    public static class RepositoryExtensions
    {
        public static async Task<Template> GetOrFailAsync(this ITemplateRepository repository, Guid templateId)
        {
            var template = await repository.GetAsync(templateId);
            if(template == null)
            {
                throw new ServiceException(ErrorCodes.TemplateNotFound, 
                    $"Template with id: '{templateId}' was not found.");
            }
            return template;            
        }

        public static async Task<User> GetOrFailAsync(this IUserRepository repository, Guid userId)
        {
            var user = await repository.GetAsync(userId);
            if(user == null)
            {
                throw new ServiceException(ErrorCodes.UserNotFound, 
                    $"User with id: '{userId}' was not found.");
            }
            return user;            
        }
    }
}