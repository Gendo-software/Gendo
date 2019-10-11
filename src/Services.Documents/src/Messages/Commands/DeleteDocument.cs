using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace Messages.Commands
{
    public class DeleteDocument : ICommand
    {
        public Guid Id { get; set; }
    }
}