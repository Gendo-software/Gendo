using System.Threading.Tasks;
using Templates.Infrastructure.RabbitMq;

namespace Templates.Infrastructure.Messages
{
    public interface IEventHandler<in TEvent> where TEvent : IEvent
    {
        Task HandleAsync(TEvent @event);
    }
}