using System;
using System.Collections.Generic;

namespace Docaut.Database.Models
{
    public partial class Template
    {
        public Template()
        {
            TemplateVersion = new HashSet<TemplateVersion>();
        }

        public Guid Id { get; set; }
        public Guid CurrentVersion { get; set; }
        public Guid UserId { get; set; }
        public bool Deleted { get; set; }
        public bool DuringEditing { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<TemplateVersion> TemplateVersion { get; set; }
    }
}
