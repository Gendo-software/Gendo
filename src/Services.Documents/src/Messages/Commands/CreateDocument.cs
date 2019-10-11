using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace Messages.Commands
{
    public class CreateDocument : ICommand
    {
        public Guid Id { get; set; }
        public Guid TemplateId { get; set; }
        public Guid TemplateVersionId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public JObject Content { get; set; }
    }
}