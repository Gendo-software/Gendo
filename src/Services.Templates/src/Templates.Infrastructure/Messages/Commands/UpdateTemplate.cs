using System;
using Newtonsoft.Json.Linq;

namespace Templates.Infrastructure.Messages.Templates
{
    public class UpdateTemplate : ICommand
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public JObject Content { get; set; }
    }
}