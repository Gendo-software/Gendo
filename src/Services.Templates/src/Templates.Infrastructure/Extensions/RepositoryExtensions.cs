using System;
using System.Threading.Tasks;
using Templates.Core.Domain;
using Templates.Core.Repositories;
using Templates.Infrastructure.Services.Exceptions;

namespace Templates.Infrastructure.Extensions
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