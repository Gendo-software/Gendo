using System;
using System.Collections.Generic;

namespace Docaut.Database.Models
{
    public partial class User
    {
        public Guid UserId { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
    }
}
