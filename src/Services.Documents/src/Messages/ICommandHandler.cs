using System.Threading.Tasks;
using System.Windows.Input;

namespace Messages
{
    public interface ICommandHandler<T> where T : ICommand 
    {
        Task<int> HandleAsync(T command); 
    }
}