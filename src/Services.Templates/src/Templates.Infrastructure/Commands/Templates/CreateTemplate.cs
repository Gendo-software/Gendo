using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace Templates.Infrastructure.Commands.Templates
{
    public class CreateTemplate : ICommand
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public JObject Content { get; set; }
    }
}