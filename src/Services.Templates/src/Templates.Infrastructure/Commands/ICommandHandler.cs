using System.Threading.Tasks;
using System.Windows.Input;

namespace Templates.Infrastructure.Commands
{
    public interface ICommandHandler<T> where T : ICommand 
    {
        Task HandleAsync(T command); 
    }
}