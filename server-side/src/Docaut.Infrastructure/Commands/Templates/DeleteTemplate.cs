using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace Docaut.Infrastructure.Commands.Templates
{
    public class DeleteTemplate : ICommand
    {
        public Guid Id { get; set; }
    }
}