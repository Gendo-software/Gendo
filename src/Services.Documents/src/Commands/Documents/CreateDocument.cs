using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace Commands.Documents
{
    public class CreateDocument : ICommand
    {
        public Guid Id { get; set; }
        public Guid TemplateVersionId { get; set; }
        public string UserId { get; set; }
        public JObject Content { get; set; }
    }
}