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
    }
}