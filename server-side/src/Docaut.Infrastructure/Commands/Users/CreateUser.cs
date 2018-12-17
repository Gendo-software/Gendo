namespace Docaut.Infrastructure.Commands.Users
{
    public class CreateUser : ICommand
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }    
        public string Surname { get; set; }    
        
    }
}