using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace Templates.Infrastructure.Commands.Templates
{
    public class UpdateTemplate : ICommand
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public JObject Content { get; set; }
    }
}