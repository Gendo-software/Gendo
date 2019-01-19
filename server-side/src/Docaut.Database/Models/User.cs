using System;
using System.Collections.Generic;

namespace Docaut.Database.Models
{
    public partial class User
    {
        public User()
        {
            Template = new HashSet<Template>();
        }

        public Guid UserId { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }

        public virtual ICollection<Template> Template { get; set; }
    }
}
