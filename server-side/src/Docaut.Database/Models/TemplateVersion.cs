using System;
using System.Collections.Generic;

namespace Docaut.Database.Models
{
    public partial class TemplateVersion
    {
        public Guid Id { get; set; }
        public Guid TemplateId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }

        public virtual Template Template { get; set; }
    }
}
