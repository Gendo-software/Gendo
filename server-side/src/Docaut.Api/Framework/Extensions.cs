using Microsoft.AspNetCore.Builder;

namespace Docaut.Api.Framework
{
    public static class Extensions
    {
        public static IApplicationBuilder UseExceptionHandlerMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware(typeof(ExceptionHandlerMiddleware));
        }
    }
}