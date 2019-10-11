using System.Threading.Tasks;

namespace Templates.Infrastructure.Messages
{
    public interface ICommandDispatcher
    {
        Task DispatchAsync<T>(T command) where T : ICommand;
    }
}