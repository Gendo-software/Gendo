using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace Commands.Documents
{
    public class DeleteDocument : ICommand
    {
        public Guid Id { get; set; }
    }
}