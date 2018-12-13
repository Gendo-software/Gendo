using System;

namespace Docaut.Core.Domain
{
    public class User
    {
        public Guid Id { get; protected set; }
        public string Email { get; protected set; }
        public string Password { get; protected set; }
        public string Name { get; protected set; }
        public string Surname { get; protected set; }

        public User()
        {
        }

        public User(Guid userId, string email, string password,  string name, string surname)
        {
            Id = userId;
            Email = email;
            Password = password;
            Name = name;
            Surname = surname;
        }
    }
}