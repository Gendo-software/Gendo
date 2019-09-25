using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace Commands.Documents
{
    public class UpdateDocument : ICommand
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public JObject Content { get; set; }
    }
}