using System.Linq;
using Microsoft.Extensions.Configuration;

namespace Extensions
{
    public static class Extensions
    {
        public static string Underscore(this string value)
            => string.Concat(value.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString()));
            
        public static T GetSettings<T>(this IConfiguration configuration,string section) where T : new()
        {
            var configurationValue = new T();
            configuration.GetSection(section).Bind(configurationValue);

            return configurationValue;
        }
    }
}