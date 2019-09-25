using System.Threading.Tasks;
using System.Windows.Input;

namespace Commands
{
    public interface ICommandHandler<T> where T : ICommand 
    {
        Task<int> HandleAsync(T command); 
    }
}